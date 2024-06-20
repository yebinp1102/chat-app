import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider  from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '@/app/libs/prismadb';

// authOption을 export 하는 이유 : 서버 세션을 만들기 위해서 
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({  // 소셜 로그인 말고 일반 로그인에 필요한 데이터 정의
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      // authorize: 로그인을 하기 위해 사용자가 입력한 값들을 검증하는 함수. 검증된 유저의 정보만 반환
      async authorize (credentials) {
        if(!credentials?.email || !credentials?.password){
          throw new Error('Invalid Credentials');
        }

        // 사용자가 입력한 이메일에 해당하는 유저가 있는지 검색
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        // 유저 검색이 불가능하거나, 소셜 로그인 계정인 경우 로그인 불가 
        // 유저가 구글이나 깃헙을 통해 회원가입한 경우 해쉬화된 비밀번호가 없음
        if(!user || !user?.hashedPassword){
          throw new Error('Invalid credentials');
        }

        // 사용자가 입력한 비밀번호와 DB에 저장된 비밀번호 비교 검증
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // 비밀번호가 틀린 경우 에러 던짐
        if(!isCorrectPassword){
          throw new Error('Invalid credentials');
        }

        return user;        
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export {handler as Get, handler as POST}; 