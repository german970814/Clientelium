
const SERVER_HOST = 'http://45.33.79.73';  // 'http://localhost:8000';
const _client = window.fetch.bind(window);

function queryString(obj) {
  return Object.keys(obj).reduce(function (a, k) { a.push(k + '=' + encodeURIComponent(obj[k])); return a }, []).join('&');
}

export default {
  async createCustomer(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await _client(`${SERVER_HOST}/json/customers`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers
    }).then(response => {
      return response.json();
    });
  },

  async updateCustomer(data, id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await _client(`${SERVER_HOST}/json/customers/${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers
    }).then(response => {
      return response.json();
    });
  },

  async getCustomers(data={}) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await _client(`${SERVER_HOST}/json/customers?${queryString(data)}`, {
      method: 'GET',
      headers: headers
    }).then(response => {
      return response.json();
    });
  },

  async getCustomer(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await _client(`${SERVER_HOST}/json/customers/${id}`, {
      method: 'GET',
      headers: headers
    }).then(response => {
      return response.json();
    }); 
  },

  async deleteCustomer(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await _client(`${SERVER_HOST}/json/customers/${id}/delete`, {
      method: 'POST',
      headers: headers
    }).then(response => {
      return response.json();
    }); 
  },

  async getActiveCustomersChart() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await _client(`${SERVER_HOST}/json/charts/active-users`, {
      method: 'GET',
      headers: headers
    }).then(response => {
      return response.json();
    });
  },

  async getBornYearsChart() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await _client(`${SERVER_HOST}/json/charts/born-years`, {
      method: 'GET',
      headers: headers
    }).then(response => {
      return response.json();
    });
  },

  async getIdentificationTypeChart() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await _client(`${SERVER_HOST}/json/charts/identification-type`, {
      method: 'GET',
      headers: headers
    }).then(response => {
      return response.json();
    });
  },
}
