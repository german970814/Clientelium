import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import Create from './Create';
import List from './List';

import APIClient from './../../api';

class CrudCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {},
      customers: [],
      errors: [],
      customer: {
        name: '',
        phone: '',
        status: '',
        address: '',
        cellphone: '',
        last_name: '',
        birthday_date: '',
        identification_type: '',
        identification_number: '',
      },
    }
  }

  componentDidMount() {
    const page = this.props.match.params.page ? this.props.match.params.page : 1;
    if (this.props.match.params.id) {
      this.getCustomer();
    }
    this.fetchCustomers('', page);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.match.params.id && this.getCustomer();
    }
    if (prevProps.match.params.page !== this.props.match.params.page) {
      this.fetchCustomers('', this.props.match.params.page);
    }
  }

  getCustomer() {
    APIClient.getCustomer(this.props.match.params.id).then(response => {
      if (response.code === 200) {
        this.setState({ customer: response.data });
      } else if (response.code === 404) {

      }
    });
  }

  fetchCustomers(value='', page=1) {
    let query = value ? { q: value, page } : { page };
    APIClient.getCustomers(query).then(response => {
      if (response.code === 200) {
        this.setState({
          customers: response.data.data,
          pagination: Object.assign({}, response.data, { data: null })
        });
      }
    });
  }

  resetCustomer() {
    this.setState({
      errors: [],
      customer: {
        name: '',
        phone: '',
        status: '',
        address: '',
        cellphone: '',
        last_name: '',
        birthday_date: '',
        identification_type: '',
        identification_number: '',
      }
    });
  }

  onUserClickNewCustomerButton() {
    this.resetCustomer();

    if (this.props.match.params.id) {
      this.props.history.push({ pathname: '/customers/' })
    }
  }

  onChangeField(event) {
    this.setState({
      customer: Object.assign({}, this.state.customer, {
        [event.target.name]: event.target.value
      })
    });
  }

  validateCustomer() {
    Object.keys(this.state.customer).forEach(key => {
      if (this.state.customer[key] && !this.state.customer[key].toString().trim()) {

      }
    });
  }

  onDeleted() {
    this.fetchCustomers();
  }

  filterCustomers(value) {
    this.fetchCustomers(value);
  }

  onNextButtonPress() {
    if (this.state.pagination.next_page_url) {
      const newPage = this.state.pagination.current_page + 1;
      if (this.props.match.params.page) {
        this.props.history.push({
          pathname: this.props.location.pathname.replace(/page=\d+/g, `page=${newPage}`)
        });
      } else {
        this.props.history.push({ pathname: `${this.props.location.pathname}/page=${newPage}` });
      }
    }
  }

  onPrevButtonPress() {
    if (this.state.pagination.prev_page_url) {
      const newPage = this.state.pagination.current_page - 1;
      if (this.props.match.params.page) {
        this.props.history.push({
          pathname: this.props.location.pathname.replace(/page=\d+/g, `page=${newPage}`)
        });
      } else {
        this.props.history.push({ pathname: `${this.props.location.pathname}/page=${newPage}` });
      }
    }
  }

  onSubmit() {
    const errors = this.validateCustomer();

    if (!errors) {
      let _method = this.state.customer.id ? 'updateCustomer' : 'createCustomer';

      APIClient[_method](this.state.customer, this.props.match.params.id).then(response => {
        console.log(response);
        if (response.code === 400) {
          this.setState({ errors: response.data.errors });
          window.$.notify({
            message: "Hay un error en el formulario"
          }, {
              type: 'danger',
              timer: 4000
            }
          );
        } else if (response.code === 200) {
          window.$.notify({
            message: this.state.customer.id ? 'Cliente actualizado exitosamente' : 'Cliente creado exitosamente'
          }, {
              type: 'success',
              timer: 4000
            }
          );
          if (!this.state.customer.id) {
            this.resetCustomer();
          }
          this.fetchCustomers();
        }
      });
    }
  }

  render() {
    return <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="col-md-5 col-xs-12">
              <List
                customers={this.state.customers}
                onDeleted={this.onDeleted.bind(this)}
                filterCustomers={this.filterCustomers.bind(this)}
                onNextButtonPress={this.onNextButtonPress.bind(this)}
                onPrevButtonPress={this.onPrevButtonPress.bind(this)}
                paginator={{
                  showPrevButton: this.state.pagination && this.state.pagination.prev_page_url,
                  showNextButton: this.state.pagination && this.state.pagination.next_page_url,
                  currentPage: this.state.pagination ? this.state.pagination.current_page : 1
                }}
                onUserClickNewCustomerButton={this.onUserClickNewCustomerButton.bind(this)} />
            </div>
            <div className="col-md-7 col-xs-12">
              <Create
                customer={this.state.customer}
                errors={this.state.errors}
                onSubmit={this.onSubmit.bind(this)}
                onChangeField={this.onChangeField.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default withRouter(CrudCustomer);
