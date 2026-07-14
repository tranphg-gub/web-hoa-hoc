#!/usr/bin/env python3
"""
MR-AR: công cụ crawl nhỏ hỗ trợ tìm & tải đáp án đề thi từ các trang tổng hợp đề
(tuyensinh247, vietjack, vndoc, loigiaihay, thuvienhoclieu...).

QUAN TRỌNG — công cụ này chỉ tự động hoá 2 bước tốn công nhất trước đây phải làm
thủ công (fetch HTML + tìm/tải ảnh "đáp án"), KHÔNG tự động hoá bước đọc/kiểm
chứng nội dung — bước đó vẫn cần con người (hoặc Claude bằng thị giác) đọc lại
ảnh/text tải về rồi tự đối chiếu với hóa học trước khi tin, vì:
  - OCR tiếng Việt cho công thức hóa học/số liệu không đủ tin cậy để dùng thẳng.
  - Nhiều đề có nhiều "mã đề" khác nhau (phương án bị xáo) — phải xác định đúng
    mã đề khớp bản đang dùng trước khi map đáp án (xem ví dụ đề Long An trong
    PROJECT_STATUS.md — đã có lần suýt dùng nhầm mã đề, và 1 lần phát hiện đáp án
    mạng sai kiến thức cơ bản ở phần Đúng/Sai).
  - Vẫn phải tự giải độc lập vài câu khó nhất để xác nhận trước khi tin cả bảng.

Cách dùng:
  python scripts/crawl_answer_key.py <url1> [url2] [url3] ... --out <thư_mục_lưu>

Kết quả: tải mọi ảnh có vẻ là "đáp án" về thư mục chỉ định, in danh sách file đã
tải kèm URL nguồn để tiện đọc lại bằng Read tool (thị giác) ngay sau đó.
"""

import argparse
import os
import re
import sys
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

# Console Windows mặc định dùng cp1252, không in được tiếng Việt có dấu -> ép UTF-8.
if sys.stdout.encoding is None or sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
}

ANSWER_KEYWORDS = [
    "dap-an", "dapan", "đáp án", "dap_an", "answer", "loi-giai", "lời giải",
    "huong-dan-cham", "hướng dẫn chấm", "key", "solution",
]


def looks_like_answer_image(tag, base_url):
    """Đoán 1 thẻ <img> có phải ảnh đáp án không, dựa trên src/alt/title/class."""
    haystack = " ".join(
        [
            tag.get("src", ""),
            tag.get("data-src", ""),
            tag.get("alt", ""),
            tag.get("title", ""),
            " ".join(tag.get("class", [])) if tag.get("class") else "",
        ]
    ).lower()
    return any(kw in haystack for kw in ANSWER_KEYWORDS)


def looks_like_answer_text_block(tag):
    text = tag.get_text(" ", strip=True).lower()
    return any(kw in text for kw in ["đáp án", "hướng dẫn chấm", "answer key"]) and len(text) < 4000


def sanitize_filename(url, index):
    name = os.path.basename(urlparse(url).path) or f"image_{index}.jpg"
    name = re.sub(r"[^\w\.\-]", "_", name)
    return f"{index:02d}_{name}"


def crawl_one(url, out_dir, session):
    print(f"\n=== Đang quét: {url} ===")
    try:
        resp = session.get(url, headers=HEADERS, timeout=20)
        resp.raise_for_status()
    except requests.RequestException as e:
        print(f"  LỖI khi tải trang: {e}")
        return []

    soup = BeautifulSoup(resp.text, "html.parser")
    saved = []

    # 1) Ảnh có vẻ là đáp án
    imgs = soup.find_all("img")
    candidate_imgs = [img for img in imgs if looks_like_answer_image(img, url)]
    if not candidate_imgs:
        print(f"  Không tìm thấy ảnh nào có tên/alt gợi ý 'đáp án' (tổng {len(imgs)} ảnh trên trang).")
    for i, img in enumerate(candidate_imgs, 1):
        src = img.get("src") or img.get("data-src")
        if not src:
            continue
        img_url = urljoin(url, src)
        try:
            img_resp = session.get(img_url, headers=HEADERS, timeout=20)
            img_resp.raise_for_status()
        except requests.RequestException as e:
            print(f"  LỖI tải ảnh {img_url}: {e}")
            continue
        filename = sanitize_filename(img_url, i)
        filepath = os.path.join(out_dir, filename)
        with open(filepath, "wb") as f:
            f.write(img_resp.content)
        print(f"  Đã lưu ảnh đáp án: {filepath}  (nguồn: {img_url})")
        saved.append(filepath)

    # 2) Khối text/table có vẻ chứa đáp án dạng chữ (không phải ảnh)
    text_blocks = []
    for tag in soup.find_all(["table", "div", "p"]):
        if looks_like_answer_text_block(tag):
            text_blocks.append(tag.get_text("\n", strip=True))
    if text_blocks:
        text_path = os.path.join(out_dir, "text_blocks.txt")
        with open(text_path, "a", encoding="utf-8") as f:
            f.write(f"\n\n===== {url} =====\n")
            for block in text_blocks:
                f.write(block + "\n---\n")
        print(f"  Đã ghi {len(text_blocks)} khối text có vẻ liên quan đáp án vào: {text_path}")

    if not candidate_imgs and not text_blocks:
        print("  -> Không tìm thấy đáp án lộ ra trên trang này (có thể yêu cầu đăng nhập/trả phí,"
              " hoặc đáp án nằm trong file PDF/DOCX tải riêng — cần kiểm tra thủ công).")

    return saved


def main():
    parser = argparse.ArgumentParser(description="Crawl và tải ảnh/text đáp án đề thi từ các trang tổng hợp đề.")
    parser.add_argument("urls", nargs="+", help="1 hoặc nhiều URL trang có khả năng chứa đáp án")
    parser.add_argument("--out", default="answer_key_downloads", help="Thư mục lưu kết quả")
    args = parser.parse_args()

    os.makedirs(args.out, exist_ok=True)
    session = requests.Session()

    all_saved = []
    for url in args.urls:
        all_saved.extend(crawl_one(url, args.out, session))

    print(f"\n=== Tổng kết: đã tải {len(all_saved)} ảnh vào '{args.out}' ===")
    print("Bước tiếp theo (BẮT BUỘC, không bỏ qua): đọc lại từng ảnh bằng Read tool (thị giác),")
    print("xác định đúng mã đề khớp bản đang nhập, và tự giải vài câu khó nhất để đối chiếu")
    print("trước khi tin cả bảng đáp án — xem quy trình đã áp dụng trong PROJECT_STATUS.md.")


if __name__ == "__main__":
    main()
