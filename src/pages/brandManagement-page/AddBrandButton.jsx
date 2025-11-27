/* eslint-disable prettier/prettier */
import { Box, Button } from '@mui/material';

// parent component
export default function AddBrandButton({ onAdd }) {

    return (
        <Box sx={{ padding: 2 }}>
            <Button
                variant="contained"
                onClick={onAdd}>
                Add
            </Button>
        </Box>
    );
}
