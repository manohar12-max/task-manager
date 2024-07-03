"use client";

import { useUser } from "@clerk/nextjs";
import CreateContent from "./components/Modals/CreateContent";
import Task from "./components/Tasks/Task";
import { useGlobalState } from "./context/globalProvider";
import { redirect } from "next/dist/server/api-utils";
import { SignIn } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import Button from "./components/Button/Button";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const { tasks } = useGlobalState();
  if (!user ) {
    return (
      <div className="absolute w-full h-full top-[0] left-[0]   flex justify-center items-center z-10  ">
        <div className="flex flex-col space-y-4">
          <h1 className="text-5xl">Welcome To "MY TASKS"</h1>
          <p className="text-center">Sign In to start creating your task</p>
          <button
            onClick={() => {
              router.push("/sign-in");
            }}
            className="bg-white rounded-lg text-black"
          >
            Sign IN
          </button>
        </div>
      </div>
    );
  }
  return <Task title={"All Tasks"} tasks={tasks} />;
}
