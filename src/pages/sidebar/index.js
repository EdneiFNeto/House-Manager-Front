import React from 'react';
import  { Link } from 'react-router-dom';

export default function SideBar() {
  return (
    <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
      
    <div className="logo">
      <Link to="#" className="simple-text logo-normal">
        Contas da Casa
      </Link>
    </div>
    
    <div className="sidebar-wrapper">
      <ul className="nav">
        <li className="nav-item active  ">
          <Link className="nav-link" to="/painel">
               <i className="material-icons">dashboard</i>
              <p>Dashboard</p>
          </Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link" to="/users">
            <i className="material-icons">person</i>
            <p>User Profile</p>
          </Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link" to="/counts">
            <i className="material-icons">paid</i>
            <p>Counts</p>
          </Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link" to="#">
            <i className="material-icons">library_books</i>
            <p>History</p>
          </Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link" to="#">
            <i className="material-icons">notifications</i>
            <p>Notifications</p>
          </Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link" to="#">
            <i className="material-icons">language</i>
            <p>Support</p>
          </Link>
        </li>
      </ul>
    </div>
  </div>
  )
}