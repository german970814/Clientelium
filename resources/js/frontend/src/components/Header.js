import React, { Component } from 'react';


export default class extends Component {
  render() {
    return <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar bar1"></span>
            <span className="icon-bar bar2"></span>
            <span className="icon-bar bar3"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="https://github.com/german970814/Clientelium">
                <i className="ti-github"></i>
                <p>Repositorio</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  }
}