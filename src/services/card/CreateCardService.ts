import { object, string, size} from "superstruct";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

const CreditCard = object({
  nome: size(string(), 4, 50),
  numCartao: size(string(), 16, 16),
  dataExp: size(string(), 7, 7),
  cvv: size(string(), 3, 3),
});

interface CardRequest {
  nome: string;
  numCartao: string;
  dataExp: string;
  cvv: string;
}

class CreateCardService {
  async execute({
    nome,
    numCartao,
    dataExp,
    cvv,
  }: CardRequest) {
    if (!CreditCard.is({ nome, numCartao, dataExp, cvv })) {
      throw new Error("Dados inválidos.");
    }
    if (!numCartao) {
      throw new Error("Cartão não enviado.");
    }
    if (!cvv) {
      throw new Error("Código de segurança não enviado.");
    }

    const CardExists = await prismaClient.card.findFirst({
      where: {
        numCartao: numCartao,
      },
    });

    if (CardExists) {
      throw new Error("Cartão já cadastrado!");
    }

    const cvvHash = await hash(cvv, 3);

    const Card = await prismaClient.card.create({
      data: {
        nome: nome,
        numCartao: numCartao,
        dataExp: dataExp,
        cvv: cvvHash,
      },
      select: {
        id: true,
        nome: true,
        numCartao: true,
        dataExp: true,
      },
    });

    return Card;
  }
}

export { CreateCardService };
