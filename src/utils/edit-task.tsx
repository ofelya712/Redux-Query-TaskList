import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { ITasks } from '../features/taskList/types';
import style from '../features/taskList/style.module.css';
import { updateTask } from '../features/taskList/task.Slice'; // Assuming you have an action to update tasks

export const EditTask = () => {
  const { id } = useParams<string>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  
  const task = useAppSelector(state => 
    state.list.find(elm=>elm.id===id)
  )

  const [formData, setFormData] = useState<ITasks | null>(null);

  
  useEffect(() => {
    if (task) {
      setFormData({ ...task });
    }else{
        navigate('/')
    }
  }, [])

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      dispatch(updateTask(formData))
      navigate('/')
    }
  }

  return (
    formData &&
    <div className={style.addTask}>
      <h3 style={{ color: 'gray', fontFamily: 'sans-serif', fontSize: 25, textAlign: 'center' }}>
        Edit Task
      </h3>

      <form className={style.addTaskForm} onSubmit={handleSubmit}>
        <input
          name="text"
          type="text"
          placeholder="Please enter your text"
          value={formData.text}
          onChange={e=>setFormData({...formData,text:e.target.value})}
        />
        <select
          name="status"
          value={formData.status}
          onChange={e=>setFormData({...formData,status:e.target.value})}
        >
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <input
          name="date"
          type="text"
          placeholder="Select a date"
          value={formData.date}
          onChange={e=>setFormData({...formData,date:e.target.value})}        />
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};
