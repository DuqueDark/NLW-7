import prismaClient from "../prisma";

export class GetLast3MessageService{
    async execute(){
        const message = await prismaClient.message.findMany({
            take: 3,
            orderBy:{
                created_at: "desc"
            },
            include:{
                user: true
            }
        });

        //console.log(message)

        return message;
    }
}