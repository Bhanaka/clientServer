/* eslint-disable prettier/prettier */
import axiosClient from './axiosClient';

const productItems = {
    // get all products
    getAll: () => axiosClient.get('/product/item/all'),
    // get by id
    getById: () => axiosClient.get(),
    // create item
    create: () => axiosClient.post(),
    // edit item
    edit: () => axiosClient.put(),
    // delete item
    delete: () => axiosClient.delete()
};
export default productItems;
