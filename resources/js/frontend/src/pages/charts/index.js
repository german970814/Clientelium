import React, { Component } from 'react';
import ColumnChart from './ColumnChart';
import LineChart from './LineChart';
import PieChart from './PieChart';

export default class extends Component {
  render() {
    return <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="col-md-6 col-xs-12">
              <div className="card">
                <div className="header">
                  <h4 className="title">Porcentaje de clientes activos/inactivos</h4>
                </div>
                <div className="content">
                  <PieChart />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xs-12">
              <div className="card">
                <div className="header">
                  <h4 className="title">Número de clientes nacidos por año</h4>
                </div>
                <div className="content">
                  <LineChart />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xs-12">
              <div className="card">
                <div className="header">
                  <h4 className="title">Número de clientes por tipo de identificación</h4>
                </div>
                <div className="content">
                  <ColumnChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}