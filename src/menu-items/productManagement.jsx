/* eslint-disable prettier/prettier */
import { AppstoreOutlined } from '@ant-design/icons';

const icons = {
    AppstoreOutlined
};

const productManagement = {
    id: 'group-productManagement',
    title: 'Product Managament',
    type: 'group',
    children: [
        {
            id: 'productManagement',
            title: 'Product Managament',
            type: 'item',
            url: '/productManagement',
            icon: icons.AppstoreOutlined,
            breadcrumbs: false
        }
    ]

}
export default productManagement;