import { CUSTOMERS, CUSTOMER_BY_ID } from './Paths';
import { mainAxios } from './configs';
import { Customer } from '../Models/Customer';

export const customerApiService = {
  async sendRequest(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    payload?: any,
  ): Promise<any> {
    return await mainAxios.request({
      method: method,
      url: path,
      responseType: 'json',
      data: payload,
    });
  },
  getCustomerByIdPath(id: string) {
    return CUSTOMER_BY_ID.replace(':id', id);
  },
  async getCustomers() {
    let { data } = await this.sendRequest('GET', CUSTOMERS);
    return data;
  },
  async addCustomer(data: Customer) {
    await this.sendRequest('POST', CUSTOMERS, data);
  },
  async getCustomerById(id: string) {
    let { data } = await this.sendRequest('GET', this.getCustomerByIdPath(id));
    return data;
  },
  async deleteCustomerById(id: string) {
    await this.sendRequest('DELETE', this.getCustomerByIdPath(id));
  },
  async editCustomerById(data: Customer) {
    await this.sendRequest('PUT', `${CUSTOMERS}/${data.id}`, data);
  },
};
