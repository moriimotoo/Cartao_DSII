-- CreateTable
CREATE TABLE "card" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "numCartao" VARCHAR(16) NOT NULL,
    "dataExp" VARCHAR(7) NOT NULL,
    "cvv" TEXT NOT NULL,
    "cadastrado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "card_numCartao_key" ON "card"("numCartao");
