import { React } from "react";

import './style.css'
import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div className="navbar-header">
            <div><h3>Task-Management</h3></div>
            <div>
            <Link to='/' className="link">Home</Link>
            
                <Link to='/create' className="link">Create</Link>
               
            </div>
            <div><h5><Link to='/register' className="link">Register/Login</Link></h5></div>
        </div>
    )
}
export default Navbar