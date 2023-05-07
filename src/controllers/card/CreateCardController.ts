import { Request, response, Response } from "express";
import { CreateCardService } from "../../services/card/CreateCardService";

class CreateCardController {
  async handle(req: Request, res: Response) {
    const { nome, numCartao, dataExp, cvv } = req.body;
    const createCardService = new CreateCardService();
    const Card = await createCardService.execute({
      nome,
      numCartao,
      dataExp,
      cvv,
    });

    return res.json(Card);
  }
}

export { CreateCardController };
