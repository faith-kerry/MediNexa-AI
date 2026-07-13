-- CreateTable
CREATE TABLE "DoctorNote" (
    "id" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DoctorNote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DoctorNote" ADD CONSTRAINT "DoctorNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
