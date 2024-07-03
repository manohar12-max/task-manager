"use client"
import { useGlobalState } from '../context/globalProvider'
import Task from '../components/Tasks/Task'

const page = () => {
  const {completedTask}=useGlobalState()
  return (
    <Task title="Completed Task" tasks={completedTask}/>
  )
}

export default page
