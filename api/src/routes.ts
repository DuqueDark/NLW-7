import { Router } from "express";
import { AuthenticateUserController } from "./controllers/authenticate_user_controller";
import { CreateMessageController } from "./controllers/create_message_controller";
import { GetLast3MessageController } from "./controllers/get_3last_message_controller";
import { ProfileUserController } from "./controllers/profile_user_controller";
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

router.get("/github", (request, response)=>{
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

router.get("/signin/callback",(request, response)=>{
    const { code } = request.query;
    
    return response.json(code);
});

export { router };