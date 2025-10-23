/* eslint-disable prettier/prettier */
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import AddBrandForm from './AddBrandForm';

// parent component
export default function AddBrandButton({ onSuccess }) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const handleRegisterSubmit = (data) => {
        console.log('Form Data:', data);
        setModalOpen(false);
        if (onSuccess) onSuccess(); // notify parent
    };
    return (
        <Box sx={{ padding: 2 }}>
            <Button
                variant="contained"
                onClick={handleModalOpen}>
                Add
            </Button>
            <AddBrandForm
                open={modalOpen}
                onClose={handleModalClose}
                onSubmit={handleRegisterSubmit} />
        </Box>
    );
}
