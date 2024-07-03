"use client"

import React from 'react'
import { useGlobalState } from '../context/globalProvider'
import Task from '../components/Tasks/Task'

const page = () => {
  const {importantTask}=useGlobalState()
  return (
    <Task title="Important Task" tasks={importantTask}/>
  )
}

export default page
