-- AlterTable
ALTER TABLE "Google" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'google';

-- AlterTable
ALTER TABLE "Linkedin" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'linkedin';

-- AlterTable
ALTER TABLE "Youtube" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'youtube';
