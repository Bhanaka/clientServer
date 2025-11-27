/* eslint-disable prettier/prettier */
// material-ui

import { useState } from 'react';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AnimateButton from 'components/@extended/AnimateButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


import * as Yup from 'yup';
import { Formik } from 'formik';
import brandApi from '../../api/productBrandApi';

// import FirebaseRegister from 'sections/auth/AuthRegister';

export default function AddBrandForm({ open,
    mode,
    initialData,
    onClose,
    onSubmit }) {


    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success'); // 'success' | 'error'

    const initialValues = {
        brandCode: initialData.brandCode || '',
        brandName: initialData.brandName || '',
        brandDesc: initialData.brandDesc || '',
        isActive: initialData.isActive || true,
        submit: null

    }

    return (
        <Modal open={open} onClose={onClose}>
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
                }}>
                <Typography variant="h6" gutterBottom>
                    {mode === "add" ? "Add Brand" : mode === "edit" ? "Update Brand" : "View Brand"}
                </Typography>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={Yup.object().shape({
                        brandCode: Yup.string().max(10).required('Brand Code is required'),
                        brandName: Yup.string().max(100).required('Brand Name is required')
                    })}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {

                            const brandDto = {
                                productBrandName: values.brandName,
                                productBrandCode: values.brandCode,
                                productIsActive: values.isActive
                            };

                            // 👇 Call your API here
                            const response = await brandApi.create(brandDto);
                            console.log('Brand Created:', response);

                            // Show success alert
                            setAlertMessage('Brand added successfully!');
                            setAlertSeverity('success');
                            setAlertOpen(true);

                            onClose();
                            resetForm();
                        } catch (error) {
                            console.error('Error creating brand:', error);
                            setAlertMessage('Failed to add brand');
                            setAlertSeverity('error');
                            setAlertOpen(true);
                        } finally {
                            setSubmitting(false);
                        }
                    }}>
                    {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                {/* Brand Code */}
                                <Grid item xs={12} md={6}>
                                    <Stack sx={{ gap: 1 }}>
                                        <InputLabel htmlFor="brand-code">Brand Code*</InputLabel>
                                        <OutlinedInput
                                            id="brand-code"
                                            type="text"
                                            value={values.brandCode}
                                            name="brandCode"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter brand code"
                                            fullWidth
                                            error={Boolean(touched.brandCode && errors.brandCode)}
                                        />
                                    </Stack>
                                    {touched.brandCode && errors.brandCode && (
                                        <FormHelperText error id="helper-text-brand-code">
                                            {errors.brandCode}
                                        </FormHelperText>
                                    )}
                                </Grid>

                                {/* Brand Name */}
                                <Grid item xs={12} md={6}>
                                    <Stack sx={{ gap: 1 }}>
                                        <InputLabel htmlFor="brand-name">Brand Name*</InputLabel>
                                        <OutlinedInput
                                            id="brand-name"
                                            type="text"
                                            value={values.brandName}
                                            name="brandName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter brand name"
                                            fullWidth
                                            error={Boolean(touched.brandName && errors.brandName)}
                                        />
                                    </Stack>
                                    {touched.brandName && errors.brandName && (
                                        <FormHelperText error id="helper-text-brand-name">
                                            {errors.brandName}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                {/* Brand Description */}
                                <Grid item xs={12} md={6}>
                                    <Stack sx={{ gap: 1 }}>
                                        <InputLabel htmlFor="brand-desc">Brand Description</InputLabel>
                                        <OutlinedInput
                                            id="brand-desc"
                                            type="text"
                                            value={values.brandDesc}
                                            name="brandDesc"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter brand Description"
                                            fullWidth
                                            error={Boolean(touched.brandDesc && errors.brandDesc)}
                                        />
                                    </Stack>
                                    {touched.brandDesc && errors.brandDesc && (
                                        <FormHelperText error id="helper-text-brand-name">
                                            {errors.brandDesc}
                                        </FormHelperText>
                                    )}
                                </Grid>

                                {/* Is Active */}
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={values.isActive}
                                                onChange={(e) => setFieldValue('isActive', e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label={
                                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                Is Active
                                            </Typography>
                                        }
                                    />
                                </Grid>

                                {/* Submit */}
                                <Grid item xs={12}>
                                    <AnimateButton>
                                        <Button type="submit" fullWidth size="large" variant="contained" color="primary">
                                            {mode === "add" ? "Add Brand" : mode === "edit" ? "Update Brand" : "View Brand"}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
                <Snackbar
                    open={alertOpen}
                    autoHideDuration={3000}
                    onClose={() => setAlertOpen(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        onClose={() => setAlertOpen(false)}
                        severity={alertSeverity}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Modal>
    );
}
