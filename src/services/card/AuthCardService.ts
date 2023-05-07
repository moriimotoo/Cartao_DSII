import { Infer, object, size, string } from "superstruct";
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const CardAuthRequest = object({
  numCartao: size(string(), 16, 16),
  cvv: size(string(), 3, 3),
});

type AuthRequest = Infer<typeof CardAuthRequest>;

class AuthCardService {
  async execute({ numCartao, cvv }: AuthRequest) {
    const card = await prismaClient.card.findFirst({
      where: {
        numCartao: numCartao,
      },
    });

    if (!card) {
      throw new Error("Cartão não cadastrado!");
    }

    const cvvMatch = await compare(
      cvv,
      card.cvv
    );

    if (!cvvMatch) {
      throw new Error("Código de segurança incorreto.");
    }

    const token = sign(
      {
        nomeDono: card.nome,
        numeroCartao: card.numCartao,
      },
      process.env.JWT_SECRET,
      {
        subject: card.id,
        expiresIn: "59s",
      }
    );
    return {
      id: card.id,
      nomeDono: card.nome,
      numeroCartao: card.numCartao,
      token: token,
    };
  }
}

export { AuthCardService };
