-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "location" TEXT,
    "date" DATE,
    "hour" TIMETZ(6),
    "author" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "user" (
    "firstname" TEXT,
    "lastname" TEXT,
    "email" TEXT,
    "password" TEXT,
    "added_datetime" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fk_user_id" ON "event"("author");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_author_fkey" FOREIGN KEY ("author") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
