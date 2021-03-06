import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class extends Component {
  isActive(url) {
    return window.location.pathname.indexOf(url) + 1;
  }

  render() {
    return <div className="sidebar" data-background-color="white" data-active-color="danger">
      <div className="sidebar-wrapper">
        <div className="logo">
          <Link to="/" className="simple-text">
            CLIENTELIUM
          </Link>
        </div>

        <ul className="nav">
          <li className={`${this.isActive('/customers') ? 'active' : ''}`}>
            <Link to={{ pathname: '/customers' }}>
              <i className="ti-user"></i>
              <p>Clientes</p>
            </Link>
          </li>
          <li className={`${this.isActive('/charts') ? 'active' : ''}`}>
            <Link to={{ pathname: '/charts' }}>
              <i className="ti-pie-chart"></i>
              <p>Gráficos</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  }
}
