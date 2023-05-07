import { Router } from "express";
import { CreateCardController } from "./controllers/card/CreateCardController";
import { AuthCardController } from "./controllers/card/AuthCardController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ValidatePayCreditCardController } from "./controllers/card/ValidateCardController";

const router = Router();

// ------- Rotas ------- //
router.post("/card", new CreateCardController().handle);
router.post("/session", new AuthCardController().handle);
router.get( "/pagamento", isAuthenticated, new ValidatePayCreditCardController().handle
);

export { router };
