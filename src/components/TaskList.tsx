import { ITask } from "../interfaces/ITask"
import { BsPencilSquare } from "react-icons/bs";
import { BsTrash2 } from "react-icons/bs";

interface Props {
    taskList: ITask[]
    handleDelete(id: number): void
    handleEdit(task: ITask): void
}

function TaskList({taskList, handleDelete, handleEdit}: Props) {
  return (
    <>
        {taskList.length > 0 ?
        (taskList.map((task) => (
            <div className="flex justify-between border-b-2 border-slate-200 p-1" key={task.id}>
            <div className="flex flex-col justify-center">
                <h4 className="font-bold">{task.title}</h4>
                <h4>Dificuldade: {task.difficulty}</h4>
            </div>

            <div className="flex flex-col  items-center justify-center text-2xl gap-1">
            <div className="p-1 bg-gray-300 hover:bg-blue-300 duration-300" onClick={() => {handleEdit(task)}}>
            <BsPencilSquare />
            </div>
            <div onClick={() => {handleDelete(task.id)}} className="p-1 bg-gray-300 hover:bg-blue-300 duration-300">
                <BsTrash2 />
            </div>
            </div>
            </div>
            ))
        )
        : (<p>Não tem tarefas</p>)}
    </>
  )
}

export default TaskList;