import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2/dist/sweetalert2.js';
import APIClient from './../../api';


export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.search !== this.state.search) &&
      this.state.search.toString().trim() &&
      this.state.search.length >= 2
    ) {
      this.props.filterCustomers && this.props.filterCustomers(this.state.search);
    } else if ((prevState.search !== this.state.search) && !this.state.search) {
      this.props.filterCustomers && this.props.filterCustomers('');
    }
  }

  newCustomer() {
    this.props.onUserClickNewCustomerButton && this.props.onUserClickNewCustomerButton();
  }

  onChange(event) {
    this.setState({
      search: event.target.value
    })
  }

  onUserClickDeleteCustomer(customer) {
    swal({
      title: 'Atención',
      text: '¿Seguro que quieres eliminar este cliente?',
      type: 'error',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        APIClient.deleteCustomer(customer.id).then(response => {
          if (response.code === 200) {
            window.$.notify({
              message: 'Se ha eliminado el cliente'
            }, {
                type: 'warning',
                timer: 4000
              }
            );
            this.props.onDeleted && this.props.onDeleted();
          } else {
            window.$.notify({
              message: 'Ha ocurrido un error al intentar eliminar el cliente'
            }, {
                type: 'danger',
                timer: 4000
              }
            );
          }
        });
      }
    });
  }

  render() {
    return <div className="card">
      <div className="header">
        <h4 className="title">Clientes</h4>
      </div>
      <ol className="breadcrumb">
        <li><button onClick={this.newCustomer.bind(this)} className="btn btn-sm">Nuevo cliente</button></li>
      </ol>
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <input onChange={this.onChange.bind(this)} name="q" type="text" className="form-control border-input" placeholder="Buscar" value={this.state.search} />
            </div>
          </div>
        </div>
        <ul className="list-unstyled team-members">
          {!Boolean(this.props.customers.length) && <li>
            <div className="row">
              <div className="col-xs-12 text-left">
                No hay clientes para mostrar
              </div>
            </div>
          </li>}
          {Boolean(this.props.customers.length) && this.props.customers.map((customer, indx) => {
            return <li key={indx}>
              <div className="row">
                <div className="col-xs-5 text-left">
                  { `${customer.name} ${customer.last_name}` }
                </div>

                <div className="col-xs-7 text-right">
                  <Link to={`/customers/${customer.id}/edit/page=${this.props.paginator.currentPage}`} className="btn btn-sm btn-success btn-icon"><i className="fa fa-pencil"></i></Link>
                  <button onClick={() => {this.onUserClickDeleteCustomer(customer)}} className="btn btn-sm btn-danger btn-icon"><i className="fa fa-trash"></i></button>
                </div>
              </div>
            </li>
          })}
        </ul>
        {this.props.paginator && <div className="row">
          <div className="col-xs-12 text-center">
            <div className="paginator">
              {this.props.paginator.showPrevButton && <button onClick={this.props.onPrevButtonPress} className="btn btn-info btn-sm btn-icon"><i className="ti-arrow-left" /></button>}
              {this.props.paginator.showNextButton && <button onClick={this.props.onNextButtonPress} className="btn btn-info btn-sm btn-icon"><i className="ti-arrow-right" /></button>}
            </div>
          </div>
        </div>}
      </div>
    </div>   
  }
}
