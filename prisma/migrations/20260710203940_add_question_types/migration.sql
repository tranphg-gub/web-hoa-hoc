-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('SINGLE_CHOICE', 'TRUE_FALSE_GROUP', 'SHORT_ANSWER');

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "shortAnswer" TEXT,
ADD COLUMN     "statements" TEXT,
ADD COLUMN     "type" "QuestionType" NOT NULL DEFAULT 'SINGLE_CHOICE',
ALTER COLUMN "choices" DROP NOT NULL,
ALTER COLUMN "correctIndex" DROP NOT NULL;
