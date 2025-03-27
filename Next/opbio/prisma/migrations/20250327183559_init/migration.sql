-- CreateTable
CREATE TABLE "Invites" (
    "code" TEXT NOT NULL,
    "user" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Invites_code_key" ON "Invites"("code");
