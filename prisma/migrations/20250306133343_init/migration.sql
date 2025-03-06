-- CreateTable
CREATE TABLE "Results" (
    "id" SERIAL NOT NULL,
    "query" TEXT NOT NULL,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Linkedin" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "image" TEXT,
    "snippet" TEXT,
    "resultsId" INTEGER NOT NULL,

    CONSTRAINT "Linkedin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Youtube" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "videoId" TEXT,
    "link" TEXT NOT NULL,
    "image" TEXT,
    "snippet" TEXT,
    "resultsId" INTEGER NOT NULL,

    CONSTRAINT "Youtube_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Google" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "snippet" TEXT,
    "resultsId" INTEGER NOT NULL,

    CONSTRAINT "Google_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Linkedin" ADD CONSTRAINT "Linkedin_resultsId_fkey" FOREIGN KEY ("resultsId") REFERENCES "Results"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Youtube" ADD CONSTRAINT "Youtube_resultsId_fkey" FOREIGN KEY ("resultsId") REFERENCES "Results"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Google" ADD CONSTRAINT "Google_resultsId_fkey" FOREIGN KEY ("resultsId") REFERENCES "Results"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
