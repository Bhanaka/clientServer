/* eslint-disable prettier/prettier */
// project import
import { Grid } from '@mui/system';
import MainCard from '../../components/MainCard';
import { Typography } from '@mui/material';
import BrandTable from './brandTable';

import AddBrandButton from './AddBrandButton';
import AddBrandForm from './AddBrandForm';
import { useState } from 'react';


export default function BrandManagementDefault() {
    const [modalOpen, setModalOpen] = useState(false);
    const [seletedBrand, setSelectedBrand] = useState(null);
    const [mode, setMode] = useState("add");
    // open modal for add 
    const handleAdd = () => {
        console.log('create clicked');
        setModalOpen(true);
        setMode("add");
    };
    // open modal for view
    const handleView = (brand) => {
        console.log('view clicked');
        setModalOpen(true);
        setMode("view");
    };
    // open modal for update
    const handleEdit = () => {
        console.log("update clicked");
        setModalOpen(true);
        setMode(true);
    };
    // close modal form
    const handleClose = () => setModalOpen(false);

    const handleSubmit = (data) => {
        console.log("SUBMIT DATA:", data);
        setModalOpen(false);
    };
    return (
        // 🧩 Step 1: Create a container grid
        <Grid container spacing={3}>
            {/* add brand sector */}
            <Grid size={{ xs: 12 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid>
                        <Typography variant="h5">Add New Brand</Typography>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    {/* <AddBrand /> */}
                    <AddBrandButton onAdd={handleAdd} />
                </MainCard>

            </Grid>
            {/* list of brand table  */}
            <Grid size={{ xs: 12 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid>
                        <Typography variant="h5">List of Brand</Typography>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <BrandTable
                        onView={handleView}
                        onEdit={handleEdit}
                    />
                </MainCard>
            </Grid>
            {/* shared modal form  */}
            <AddBrandForm
                open={modalOpen}
                mode={mode}
                initialData={seletedBrand}
                onClose={handleClose}
                onSubmit={handleSubmit}
            />


        </Grid>
    );
}
