import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import Loader from './../../components/Loader';
import APIClient from './../../api';


export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    APIClient.getBornYearsChart().then(response => {
      if (response.code === 200) {
        this.setState({ data: response.data.data });
      }
    });
  }

  render() {
    return <div className="content">
      <Chart
        width={'100%'}
        height={300}
        chartType="Line"
        loader={<Loader />}
        data={[
          [
            'Año',
            'Número de clientes nacidos',
          ],
          ...Object.keys(this.state.data).map(data => {
            return [data, this.state.data[data]];
          })
        ]}
        options={{
          chart: {
            title: '',
            subtitle: '',
          },
        }}
      />
    </div>
  }
}