import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;
    console.log(body);

    if (!email || !name || !password) {
      return new NextResponse("누락된 정보가 있습니다. ", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
    
  } catch (error) {
    console.error(error, "회원가입 에러가 발생했습니다.");
    return new NextResponse('회원가입 에러', {status: 500})
  }
}
