/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { Button, Modal, Box, Snackbar, Alert, Typography } from '@mui/material';
import FirebaseRegister from 'sections/auth/AuthRegister';

// =======================
// CHILD COMPONENT
// =======================
function RegisterButton({ onSuccess }) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const handleRegisterSubmit = (data) => {
        console.log('Form Data:', data);
        setModalOpen(false); // close modal
        onSuccess(); // notify parent
    };

    return (
        <>
            <Button variant="contained" onClick={handleModalOpen}>
                Add
            </Button>

            <Modal open={modalOpen} onClose={handleModalClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Register
                    </Typography>
                    <FirebaseRegister onSubmit={handleRegisterSubmit} />
                </Box>
            </Modal>
        </>
    );
}

// =======================
// PARENT COMPONENT
// =======================
export default function AddBrand() {
    const [open, setOpen] = useState(false);

    // called by child when form submission succeeds
    const handleSuccess = () => setOpen(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <Box sx={{ padding: 2 }}>
            {/* Register form button & modal */}
            <RegisterButton onSuccess={handleSuccess} />

            {/* Snackbar alert */}
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity="success" variant="filled">
                    Registered successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}
