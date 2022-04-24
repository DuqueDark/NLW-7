import { Request, Response } from "express";
import { GetLast3MessageService } from "../services/get_3last_message_service";

export class GetLast3MessageController{
    async handle (request: Request, response: Response){
        const service = new GetLast3MessageService(); 
        const result = await service.execute();
        //console.log(result)
        return response.json(result)
    }
}