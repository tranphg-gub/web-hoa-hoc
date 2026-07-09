import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const studentPassword = await bcrypt.hash("hocsinh123", 10);

  await prisma.user.upsert({
    where: { username: "giaovien" },
    update: {},
    create: {
      username: "giaovien",
      password: adminPassword,
      name: "Cô Lan",
      role: "ADMIN",
    },
  });

  const students = [
    { username: "hs_an", name: "Nguyễn Văn An", grade: 8 },
    { username: "hs_binh", name: "Trần Thị Bình", grade: 10 },
    { username: "hs_chi", name: "Lê Thị Chi", grade: 12 },
  ];

  for (const s of students) {
    await prisma.user.upsert({
      where: { username: s.username },
      update: {},
      create: {
        username: s.username,
        password: studentPassword,
        name: s.name,
        role: "STUDENT",
        grade: s.grade,
      },
    });
  }

  console.log("Seed tài khoản hoàn tất.");
  console.log("Đăng nhập giáo viên: giaovien / admin123");
  console.log("Đăng nhập học sinh: hs_an, hs_binh, hs_chi / hocsinh123");
  console.log("Chạy thêm: npm run db:seed:thcs / db:seed:lop10 / db:seed:thpt để có nội dung học tập.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
