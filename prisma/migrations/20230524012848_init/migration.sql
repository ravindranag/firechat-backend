-- CreateTable
CREATE TABLE "PublicRoom" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "PublicRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicChat" (
    "id" STRING NOT NULL,
    "content" STRING NOT NULL,
    "from" STRING NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roomId" STRING NOT NULL,

    CONSTRAINT "PublicChat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PublicChat" ADD CONSTRAINT "PublicChat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "PublicRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
