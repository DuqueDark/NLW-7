import { Router } from "express";
import { AuthenticateUserController } from "./controllers/authenticate_user_controller";
import { CreateMessageController } from "./controllers/create_message_controller";
import { GetLast3MessageController } from "./controllers/get_3last_message_controller";
import { ProfileUserController } from "./controllers/profile_user_contorller";
import { ensureAuthenticated } from "./middleware/ensure_authenticated";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.post(
    "/create-message", 
    ensureAuthenticated, 
    new CreateMessageController().handle
);

router.get("/message/last3", new GetLast3MessageController().handle);

router.get("/profile", ensureAuthenticated,new ProfileUserController().handle)

export { router };