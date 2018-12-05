import React, { Component } from 'react';
import loader from './loader.svg';

export default class extends Component {
  render() {
    return <div className="loader">
      <img width={90} height={90} src={loader} />
    </div>
  }
}
