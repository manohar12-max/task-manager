import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { error } from "console";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const { id } = params;

    if (!userId) {
      return NextResponse.json({
        error: "Unauthorized",
        status: 401,
      });
    }
    const res = await prisma.task.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      message: "Task deleted successfully",
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      error: "Error deleting task",
      status: 500,
    });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const { id } = params;

    if (!userId) {
      return NextResponse.json({
        error: "Unauthorized",
        status: 401,
      });
    }
    const task = await prisma.task.findFirst({
      where: {
        id,
      },
    });
    return NextResponse.json(task);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      error: "Error ",
      status: 500,
    });
  }
}
