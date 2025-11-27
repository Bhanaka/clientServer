/* eslint-disable prettier/prettier */
import { Grid } from '@mui/system';
import MainCard from '../../components/MainCard';
import { Typography } from '@mui/material';

import AddProductButton from './AddProductButton';
import ProductTable from './ProductTable';
import AddProductForm from './AddProductForm';
import { useState } from 'react';


export default function ProductManagementDefault() {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [mode, setMode] = useState("add");

    // open model for add
    const handleAdd = () => {
        console.log('Add clicked');
        setSelectedProduct(null);
        setMode('add');
        setModalOpen(true);
    };
    // open model for edit
    const handleEdit = (product) => {
        console.log('edit clicked');
        setSelectedProduct(product);
        setMode('edit');
        setModalOpen(true);
    };
    // open modal for view
    const handleView = (product) => {
        console.log('view clicked');
        setSelectedProduct(product);
        setMode('view');
        setModalOpen(true);
    };
    const handleClose = () => setModalOpen(false);

    const handleSubmit = (data) => {
        console.log("SUBMIT DATA:", data);
        setModalOpen(false);
    };
    return (
        <Grid container spacing={3}>

            {/* add section */}

            <Grid size={{ xs: 12 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid>
                        <Typography variant="h5">Add Product Item</Typography>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <AddProductButton onAdd={handleAdd} />
                </MainCard>
            </Grid>

            {/* table */}

            <Grid size={{ xs: 12 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid>
                        <Typography variant="h5">List of Product</Typography>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <ProductTable
                        onEdit={handleEdit}
                        onView={handleView}
                    />
                </MainCard>
            </Grid>

            {/* shared modal form */}

            <AddProductForm
                open={modalOpen}
                mode={mode}
                initialData={selectedProduct}
                onClose={handleClose}
                onSubmit={handleSubmit} />

        </Grid>
    )
}