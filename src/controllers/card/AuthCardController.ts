import { Request, Response } from "express";
import { AuthCardService } from "../../services/card/AuthCardService";

class AuthCardController {
  async handle(req: Request, res: Response) {
    const { numCartao, cvv } = req.body;
    const authCardService = new AuthCardService();
    const auth = await authCardService.execute({
      numCartao,
      cvv,
    });
    return res.json(auth);
  }
}

export { AuthCardController };
