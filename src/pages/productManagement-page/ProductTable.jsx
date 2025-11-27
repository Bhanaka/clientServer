/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Box, Typography, Stack, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import productApi from '../../api/productItemApi';

//  Table header configuration
const headCells = [
    { id: 'productNo', align: 'left', disablePadding: false, label: 'No' },
    { id: 'productCode', align: 'left', disablePadding: false, label: 'Code' },
    { id: 'productName', align: 'left', disablePadding: false, label: 'Name' },
    { id: 'productPrice', align: 'left', disablePadding: false, label: 'Price' },
    { id: 'productDiscount', align: 'left', disablePadding: false, label: 'Discount' },
    { id: 'productAction', align: 'left', disablePadding: false, label: 'Action' }

];

// Table head component
function ProductHeadCell({ order, orderBy }) {
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
                        <Typography variant="subtitle2" fontWeight="bold">
                            {headCell.label}
                        </Typography>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

ProductHeadCell.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};

// Main table component
export default function ProductTable({ onEdit, onView }) {
    const order = 'asc';
    const orderBy = 'productNo';
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productApi.getAll();
                // console.log(response.data);
                const data = response.data;
                setProducts(data);
                console.log('products :', products);
            } catch (error) {
                console.error('Error fetching brands:', error);
                setError('Failed to load brand data');
            } finally {
                setLoading(false);

            }

        };
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // useEffect(() => {
    // }, [products]);
    // const handleDelete = (product) => {
    //     alert('button click');
    //     console.log('alert ', product);
    // }
    // const handleEdit = (product) => {
    //     alert('edit button');
    // }
    const handleEditClick = (row) => {
        console.log("Edit Click Row:", row);
        onEdit(row); // send full product to parent
    };

    const handleViewClick = (row) => {
        console.log('view click row', row);
        onView(row);
    }
    const handleDeleteClick = () => {
        console.log(" delete click");
    };
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
                    <ProductHeadCell order={order} orderBy={orderBy} />

                    {/*  Table Body with dummy data */}
                    <TableBody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <TableRow hover key={product.productNo || index}>
                                    <TableCell align="left">{product.productNo}</TableCell>
                                    <TableCell align="left">{product.productCode}</TableCell>
                                    <TableCell align="left">{product.productName}</TableCell>
                                    <TableCell align="left">${product.productSellingPrice}</TableCell>
                                    <TableCell align="left">{product.productDiscount}</TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={1} justifyContent="center">
                                            <Button
                                                variant='outlined'
                                                color='success'
                                                size='small'
                                                onClick={() => handleViewClick(product)}
                                            >
                                                View
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                onClick={() => handleEditClick(product)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDeleteClick(product)}
                                            >
                                                Delete
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No products found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
