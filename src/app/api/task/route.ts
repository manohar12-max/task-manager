import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({
        status: 401,
        error: "Unauthorized",
      });
    }
    const body = await request.json();
    const { title, description, date, completed, important } = body;
    if (!title || !description || !date) {
      return NextResponse.json({
        status: 400,
        error: "Missing required parameters",
      });
    }
    if (title.length < 3) {
      return NextResponse.json({
        status: 400,
        error: "Title must be at least 3 characters",
      });
    }
    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });
    return NextResponse.json(task);
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: 500,
      error: "Error while creating task",
    });
  }
}

export async function GET(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({
        status: 401,
        error: "Unauthorized",
      });
    }
    const res = await prisma.task.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        date: "asc",
      },
    });
    return NextResponse.json(res);
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: 500,
      error: "Error while getting task",
    });
  }
}

export async function PUT(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({
        status: 401,
        error: "Unauthorized",
      });
    }
    const { isCompleted, id } = await request.json();
    console.log(isCompleted, id);
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });
    return NextResponse.json(task);
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: 500,
      error: "Error while updating task",
    });
  }
}
