import { Request, Response } from "express";

class ValidatePayCreditCardController {
  async handle(req: Request, res: Response) {
    return res.json({ status: "Autorizado" });
  }
}

export { ValidatePayCreditCardController };
