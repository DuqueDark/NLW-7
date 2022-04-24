import { Request, Response,  NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
    sub: string
}

export function ensureAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction){
   const oauthToken = request.headers.authorization;

   if(!oauthToken){
       return response.status(401).json({
           errorCode: "Token.invalid"
       });
   }

   const [, token ] = oauthToken.split(" ")

   try{

       const { sub } =  verify(token, `${process.env.JWT_SECRET}`) as IPayload;

       request.user_id = sub;

       return next()
   }catch(err){
       return response.status(401).json({
           errorCode: "Token.expired"
       })
   }

}