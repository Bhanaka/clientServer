/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Box,
    Stack,
    Typography,
    Button
} from '@mui/material';
import Dot from 'components/@extended/Dot';
import { useEffect, useState } from 'react';

import brandApi from '../../api/productBrandApi';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'brandNo', align: 'left', disablePadding: false, label: 'No' },
    { id: 'brandCode', align: 'left', disablePadding: false, label: 'Code No.' },
    { id: 'brandName', align: 'left', disablePadding: false, label: 'Name' },
    { id: 'brandIsActive', align: 'left', disablePadding: false, label: 'isActive' },
    { id: 'brandAction', align: 'left', disablePadding: false, label: 'Action' }
];

function BrandTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function OrderStatus({ status }) {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'warning';
            title = 'Pending';
            break;
        case 1:
            color = 'success';
            title = 'Approved';
            break;
        case 2:
            color = 'error';
            title = 'Rejected';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    return (
        <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
}

export default function BrandTable({ onView, onEdit }) {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const order = 'asc';
    const orderBy = 'brandNo';

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const data = await brandApi.getAll();
                setBrands(data);
                console.log('brands :', brands)
            } catch (err) {
                console.error('Error fetching brands:', err);
                setError('Failed to load brand data');
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    const handleViewClick = (row) => {
        console.log(' view click row : ', row);
        // sent full item to parent
        onView(row);
    };
    const handleEditClick = (row) => {
        console.log('edit click row : ', row);
        //sent full item to parent
        onEdit(row);
    };
    const handleDeleteClick = (row) => {
        console.log('delete click row :', row);
    }
    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table aria-labelledby="tableTitle">
                    <BrandTableHead order={order} orderBy={orderBy} />
                    <TableBody>
                        {brands.length > 0 ? (
                            brands.map((brand, index) => (
                                <TableRow key={brand.id || index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{brand.productName}</TableCell>
                                    <TableCell>{brand.productCode}</TableCell>
                                    <TableCell align="left">{brand.productIsActive === true ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={1} justifyContent="center">
                                            <Button
                                                variant='outlined'
                                                color='success'
                                                size='small'
                                                onClick={() => handleViewClick(brand)}
                                            >
                                                View
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                onClick={() => handleEditClick(brand)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDeleteClick(brand)}
                                            >
                                                Delete
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No brand data found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

BrandTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };
OrderStatus.propTypes = { status: PropTypes.number };
