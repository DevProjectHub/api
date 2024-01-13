-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isEmailConfirmed" BOOLEAN,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "photo" TEXT,
    "description" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "userId" TEXT NOT NULL,
    "projectsId" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectProfile" (
    "id" TEXT NOT NULL,
    "role" TEXT,
    "founder" TEXT,
    "projectId" TEXT NOT NULL,
    "profileId" TEXT,

    CONSTRAINT "ProjectProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobOpening" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "projectsId" TEXT,

    CONSTRAINT "JobOpening_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectProfile" ADD CONSTRAINT "ProjectProfile_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectProfile" ADD CONSTRAINT "ProjectProfile_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobOpening" ADD CONSTRAINT "JobOpening_projectsId_fkey" FOREIGN KEY ("projectsId") REFERENCES "Projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
