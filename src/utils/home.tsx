import { NavLink } from "react-router-dom"
import { Outlet } from "react-router-dom"

export const Home = () => {


    return <div>
        <nav >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/add">Add Task</NavLink>
         
        </nav>
     
        <Outlet />
    </div>
}