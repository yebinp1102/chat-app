import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
  const session = await getSession();

  // session이 있는지 확인
  if(!session?.user?.email){
    return []
  }

  try{
    // user 리스트 출력
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc', // 최신순으로 배치
      },
      // 이메일이 현재 유저(current)가 아닌 모든 유저 출력 
      where: {
        NOT: {
          email: session.user.email
        }
      }
    });

    return users;
  }catch(error: any){
    return [];
  }
};

export default getUsers;