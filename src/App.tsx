import { useState } from 'react'
// components

import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Modal from './components/Modal'

// interface
import { ITask } from './interfaces/ITask'

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask = (id:number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      }))
  }

  const hideOrShowModal = (display: boolean):void => {
      const modal = document.querySelector("#modal")
    if(display) {
      modal!.classList.remove('hidden')
    } else {
      modal!.classList.add('hidden')
    }
  }

  const EditTask = (task: ITask):void => {
    hideOrShowModal(true)
    setTaskToUpdate(task)
  }

  const updateTask = (id: number, title: string, difficulty: number) => {
    
    const updatedTask: ITask = {id, title, difficulty}

    const updatedListTask = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task 
    })

    setTaskList(updatedListTask)
    hideOrShowModal(false)

  }


  return (
    <>
      <Modal children={<TaskForm taskList={taskList} task={taskToUpdate} handleUpdate={updateTask} btnText="Editar"/>}/>
      <div className="flex flex-col justify-center items-center">
        <header className="flex p-12 bg-blue-400 w-full justify-center items-center">
          <h1 className="flex  text-3xl text-black">React + TS: TodoList</h1>
        </header>
        <div id="main" className="flex flex-col min-h-[76vh]">
          <div className="flex flex-col w-[500px] justify-center items-center border-2 p-6 mt-6">
            <h3 className="text-2xl p-6">O que você vai fazer?</h3>
            <TaskForm btnText={"Cadastrar"} taskList={taskList} setTaskList={setTaskList}/>
          </div>

          <div className="flex flex-col w-[500px] justify-center items-center border-2 p-6 mt-6">
            <h3 className="text-2xl p-6">Suas tarefas:</h3>
            <div className='w-full'>
              <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={EditTask}/>
            </div>
          </div>
        </div>
        <footer className="flex p-9 bg-blue-400 w-full justify-center items-center">
          <h3 className="text-xl">React + TS @ 2024 Todo List</h3>
        </footer>
      </div>
    </>
  )
}

export default App
