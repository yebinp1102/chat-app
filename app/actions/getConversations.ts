import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
  const currentUser = await getCurrentUser();
  if(!currentUser?.id){
    return []
  }

  try{
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc', // 마지막에 전송된 메세지를 기준으로 최신순으로 정렬
      },
      where: {
        userIds: {
          has: currentUser.id
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true
          }
        }
      }
    });

    return conversations;
  }catch(error: any){
    return [];
  }
}

export default getConversations;