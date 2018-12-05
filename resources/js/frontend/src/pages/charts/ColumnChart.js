import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import Loader from './../../components/Loader';
import APIClient from './../../api';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
  }

  componentDidMount() {
    APIClient.getIdentificationTypeChart().then(response => {
      console.log(response)
      if (response.code === 200) {
        this.setState({ data: response.data.data });
      }
    });
  }

  render() {
    return <div className="content">
      <Chart
        width={'100%'}
        height={'300px'}
        chartType="Bar"
        loader={<Loader />}
        data={[
          ['Tipo de identificación', 'Número de clientes'],
          ...Object.keys(this.state.data).map(data => {
            return [data, this.state.data[data]];
          })
        ]}
        options={{
          // Material design options
          chart: {
            title: '',
            subtitle: '',
          },
        }}
      />
    </div>
  }
}