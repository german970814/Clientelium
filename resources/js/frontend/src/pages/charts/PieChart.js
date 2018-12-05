import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import Loader from './../../components/Loader';
import APIClient from './../../api';

export default class extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      activeCustomers: 0,
      deletedCustomers: 0
    }
  }
  componentDidMount() {
    APIClient.getActiveCustomersChart().then(response => {
      console.log(response);
      if (response.code === 200) {
        this.setState({
          activeCustomers: response.data.active,
          deletedCustomers: response.data.deleted,
        });
      }
    });
  }
  render() {
    return <div className="content">
      <Chart
        width={'100%'}
        height={300}
        chartType="PieChart"
        loader={<Loader />}
        data={[
          ['Clientes Activos', 'Popularity'],
          ['Activos', this.state.activeCustomers],
          ['Inactivos', this.state.deletedCustomers],
        ]}
        options={{
          title: '',
          sliceVisibilityThreshold: 0.2, // 20%
        }}
      />
    </div>
  }
}