/* eslint-disable prettier/prettier */
//assets
import { AppstoreOutlined } from '@ant-design/icons';

//icons
const icons = {
    AppstoreOutlined
};

const brandManagement = {
    id: 'group-brandManagement',
    title: 'Brand Managament',
    type: 'group',
    children: [
        {
            id: 'brandManagement',
            title: 'Brand Managament',
            type: 'item',
            url: '/brandManagement',
            icon: icons.AppstoreOutlined,
            breadcrumbs: false
        }
    ]
};
export default brandManagement;
