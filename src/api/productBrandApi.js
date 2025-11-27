/* eslint-disable prettier/prettier */
import { data } from 'react-router';
import axiosClient from './axiosClient.js';
const brandApi = {
    // get all brands
    getAll: () => axiosClient.get('/product/brand/getAllBrands'),
    //get by id
    getById: () => axiosClient.get(),
    // create brand
    create: (data) => axiosClient.post('/product/brand/create', data),
    // update brand
    update: (data) => axiosClient.put(),
    // delete brand
    delete: () => axiosClient.put()

};
export default brandApi;
