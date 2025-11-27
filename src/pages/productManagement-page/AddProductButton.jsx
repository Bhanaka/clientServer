/* eslint-disable prettier/prettier */
import { useState } from 'react';
import AddProductForm from './AddProductForm';
import { Box, Button } from '@mui/material';

export default function AddProductBottun({ onAdd }) {

    return (
        <Box sx={{ padding: 2 }}>
            <Button
                variant="contained"
                onClick={onAdd}
            >Add</Button>
        </Box>
    );
}
