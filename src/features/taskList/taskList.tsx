import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteTask, getAllTasks } from './task.Slice';
import style from './style.module.css';
import { useNavigate } from 'react-router-dom';

export const TasList = () => {
  const list = useAppSelector(state => state.list);
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<'all' | 'pending' | 'inProgress' | 'completed'>('all');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  const filteredTasks = filter === 'all' 
    ? list 
    : list.filter(task => task.status === filter);

  const totalTasks = filteredTasks.length;
  const pendingTasks = filteredTasks.filter(task => task.status === 'pending').length;
  const inProgressTasks = filteredTasks.filter(task => task.status === 'inProgress').length;
  const completedTasks = filteredTasks.filter(task => task.status === 'completed').length;

  return (
    <>
      <div className={style.statistics}>
        <h3>Statistics</h3>
        <p>Pending: {pendingTasks}/{totalTasks}</p>
        <p>In Progress: {inProgressTasks}/{totalTasks}</p>
        <p>Completed: {completedTasks}/{totalTasks}</p>
        <h4 style={{ cursor: 'pointer', fontFamily: "revert-layer", textAlign: "center" }} onClick={() => navigate("/add")}>
          Add New Task
        </h4>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <select value={filter} onChange={(e) => setFilter(e.target.value as 'all' | 'pending' | 'inProgress' | 'completed')}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <h3 style={{ color: "gray", fontFamily: "sans-serif", fontSize: 25, textAlign: "center" }}>
          Task List
        </h3>
      </div>
      <div className={style.listContainer}>
        {filteredTasks.map((task) => (
          <div className={style.taskBox} key={task.id}>
            <p>Text:</p>
            <p>{task.text}</p>
            <p>Status:</p>
            <p>{task.status}</p>
            <p>Date:</p>
            <p>{task.date}</p>
            <div style={{ display: "flex" }}>
              <button onClick={() => navigate(`/edit/${task.id}`)} style={{ background: "rgb(145, 149, 158)", borderRadius: 4, padding: 10, border: "none", cursor: "pointer", width: 100 }}>Edit Task</button>
              <button onClick={() => dispatch(deleteTask(task.id))} className={style.deleteBtn}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
