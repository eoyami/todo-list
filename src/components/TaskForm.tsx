import { useState, ChangeEvent, FormEvent } from "react"
import { ITask } from "../interfaces/ITask"


type Props = {
    btnText: string
    taskList: ITask[]
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
}

const TaskForm = ({btnText, taskList, setTaskList}: Props) => {
    const [title, setTitle] = useState<string>("")
    const [difficulty, setDifficulty] = useState<number>(1)
  

    const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    
        const id = Math.floor(taskList.length)
    
        const newTask: ITask = {id, title, difficulty}

        setTaskList!([...taskList, newTask])

        setTitle("")
        setDifficulty(1)

        console.log(taskList)
      }
    
      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "title"){
          setTitle(e.target.value)
        } else if(e.target.name === "difficulty"){
          setDifficulty(parseInt(e.target.value))
        } else {
          throw new Error()
        }
      }
  return (
    <form onSubmit={addTaskHandler} className="w-full">
        <div className="flex flex-col">
            <label className="text-xl" htmlFor="title">Título</label>
            <input className="p-1 border-2 border-blue-400/100" id="title" name="title" type="text" required placeholder="Coloque um título aqui!" onChange={handleChange} value={title} />
        </div>
        <div className="flex flex-col">
            <label className="text-xl" htmlFor="difficulty">Dificuldade:</label>
            <input className="p-1 border-2 border-blue-400/100" id="difficulty" name="difficulty" type="number" required placeholder="Coloque uma dificuldade aqui!" min="1" max="10" onChange={handleChange} value={difficulty} />
        </div>
        <button type="submit" className=" w-full mt-6 p-1 border-2 border-blue-400/100">{btnText}</button>
    </form>
  )
}

export default TaskForm