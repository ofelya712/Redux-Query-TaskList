import { SubmitHandler, useForm } from 'react-hook-form'
import style from '../features/taskList/style.module.css'
import { useAppDispatch } from '../app/hooks'
import { addTask } from '../features/taskList/task.Slice'
import { InputTask } from '../features/taskList/types'
import { useNavigate } from 'react-router-dom'

export const AddTask = () => {
    const { register, handleSubmit, reset } = useForm<InputTask>()
    const dispatch = useAppDispatch()
    const navigate=useNavigate()

    const handleAdd:SubmitHandler<InputTask> = (date) => {
        dispatch(addTask(date))
        navigate("/")
        reset()
    }



    return <div className={style.addTask}>
        <h3 style={{ color: "gray", fontFamily: "sans-serif", fontSize: 25, textAlign: "center" }}>
            Add Task
        </h3>

        <form className={style.addTaskForm} onSubmit={handleSubmit(handleAdd)}>
            <input
                type="text"
                placeholder='please enter your text'
                {...register("text", { required: true })}
            />
            <select  {...register("status", { required: true })}>
                <option value="pending">Pending</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>

            </select>
            <input
                type="text"
                placeholder='Select a date'
                {...register("date", { required: true })}
            />
            <button>Add</button>
        </form>
    </div>
}