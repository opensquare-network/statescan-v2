-- CreateTable
CREATE TABLE "Block" (
    "height" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "validator" TEXT,
    "extrinsicsCount" INTEGER NOT NULL,
    "eventsCount" INTEGER NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("height")
);

-- CreateTable
CREATE TABLE "Extrinsic" (
    "height" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "isSigned" BOOLEAN NOT NULL,
    "signer" TEXT,
    "section" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "args" JSONB NOT NULL,
    "isSuccess" BOOLEAN NOT NULL,
    "eventsCount" INTEGER NOT NULL,

    CONSTRAINT "Extrinsic_pkey" PRIMARY KEY ("height","index")
);

-- CreateTable
CREATE TABLE "Event" (
    "height" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "extrinsicIndex" INTEGER,
    "isByExtrinsic" BOOLEAN NOT NULL,
    "section" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "args" JSONB NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("height","index")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Status_name_key" ON "Status"("name");
