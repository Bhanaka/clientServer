/* eslint-disable prettier/prettier */
import { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Snackbar,
    Alert,
    Grid,
    Stack,
    OutlinedInput,
    FormHelperText,
    FormControlLabel,
    Switch,
    Button,
    InputLabel
} from '@mui/material';

import { Formik } from 'formik';
import * as Yup from 'yup';

import AnimateButton from 'components/@extended/AnimateButton';

export default function AddProductForm({ open,
    mode,
    initialData,
    onClose,
    onSubmit }) {


    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    const isViewMode = mode === "view";

    const initialValues = {
        productCode: initialData?.productCode || '',
        productName: initialData?.productName || '',
        productDesc: initialData?.productDesc || '',
        productBuyPrice: initialData?.productBuyPrice || '',
        productSellingPrice: initialData?.productSellingPrice || '',
        productDiscount: initialData?.productDiscount || '',
        productIsActive: initialData?.productIsActive || true,
        productBrandId: initialData?.productBrandId || ''
    }
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 450,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4
                }}
            >
                <Typography variant="h6" gutterBottom>
                    {mode === "add" ? "Add Product" : mode === "edit" ? "Update Product" : "View Product"}
                </Typography>

                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={Yup.object().shape({
                        productCode: Yup.string().required('Product Code is required'),
                        productName: Yup.string().required('Product Name is required'),
                        productDesc: Yup.string(),
                        productBuyPrice: Yup.number().required('Buy Price is required'),
                        productSellingPrice: Yup.number().required('Selling Price is required'),
                        productDiscount: Yup.number().required('Discount is required'),
                        productBrandId: Yup.number().required('Brand ID is required')
                    })}

                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                            const productDto = {
                                productCode: values.productCode,
                                productName: values.productName,
                                productDesc: values.productDesc,
                                productBuyPrice: Number(values.productBuyPrice),
                                productSellingPrice: Number(values.productSellingPrice),
                                productDiscount: Number(values.productDiscount),
                                productIsActive: values.productIsActive,
                                productBrandId: Number(values.productBrandId)
                            };
                            if (mode == 'add') {
                                console.log("need to call create api");
                            } else if (mode == 'edit') {
                                console.log("need to call edit api");

                            } else if (mode == 'view') {
                                console.log("need to call view api");

                            }

                            // const response = await productItemApi.create(productDto);
                            // console.log("Product Created:", response);

                            setAlertMessage("Product created successfully!");
                            setAlertSeverity("success");
                            setAlertOpen(true);

                            onClose();
                            resetForm();
                        } catch (error) {
                            console.error("Error creating product:", error);
                            setAlertMessage("Failed to create product");
                            setAlertSeverity("error");
                            setAlertOpen(true);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={3}>

                                {/* PRODUCT CODE */}
                                <Grid item xs={12} md={6}>
                                    <Stack sx={{ gap: 1 }}>
                                        <InputLabel>Product Code*</InputLabel>
                                        <OutlinedInput
                                            name="productCode"
                                            value={values.productCode}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="product Code"
                                            fullWidth
                                            error={Boolean(touched.productCode && errors.productCode)}
                                        />
                                        {touched.productCode && errors.productCode && (
                                            <FormHelperText error>{errors.productCode}</FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                {/* PRODUCT NAME */}
                                <Grid item xs={12} md={6}>
                                    <Stack sx={{ gap: 1 }}>
                                        <InputLabel>Product Name*</InputLabel>
                                        <OutlinedInput
                                            name="productName"
                                            value={values.productName}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Product Name"
                                            fullWidth
                                            error={Boolean(touched.productName && errors.productName)}
                                        />
                                        {touched.productName && errors.productName && (
                                            <FormHelperText error>{errors.productName}</FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                {/* DESCRIPTION */}
                                <Grid item xs={12}>
                                    <Stack sx={{ gap: 1 }}>
                                        <InputLabel>Description</InputLabel>
                                        <OutlinedInput
                                            name="productDesc"
                                            value={values.productDesc}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Product Description"
                                            fullWidth
                                            error={Boolean(touched.productDesc && errors.productDesc)}
                                        />
                                        {touched.productDesc && errors.productDesc && (
                                            <FormHelperText error>{errors.productDesc}</FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                {/* BUY PRICE */}
                                <Grid item xs={12} md={6}>
                                    <Stack sx={{ gap: 1 }}>
                                        <InputLabel>Buy Price*</InputLabel>
                                        <OutlinedInput
                                            name="productBuyPrice"
                                            value={values.productBuyPrice}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Product Buying Price"
                                            fullWidth
                                            error={Boolean(touched.productBuyPrice && errors.productBuyPrice)}
                                        />
                                        {touched.productBuyPrice && errors.productBuyPrice && (
                                            <FormHelperText error>{errors.productBuyPrice}</FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                {/* SELLING PRICE */}
                                <Grid item xs={12} md={6}>
                                    <Stack sx={{ gap: 1 }}>
                                        <InputLabel>Selling Price*</InputLabel>
                                        <OutlinedInput
                                            name="productSellingPrice"
                                            value={values.productSellingPrice}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Product Seling Price"
                                            fullWidth
                                            error={Boolean(touched.productSellingPrice && errors.productSellingPrice)}
                                        />
                                        {touched.productSellingPrice && errors.productSellingPrice && (
                                            <FormHelperText error>{errors.productSellingPrice}</FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                {/* DISCOUNT */}
                                <Grid item xs={12} md={6}>
                                    <Stack sx={{ gap: 1 }}>
                                        <InputLabel>Discount (%) *</InputLabel>
                                        <OutlinedInput
                                            name="productDiscount"
                                            value={values.productDiscount}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Product Discount"
                                            fullWidth
                                            error={Boolean(touched.productDiscount && errors.productDiscount)}
                                        />
                                        {touched.productDiscount && errors.productDiscount && (
                                            <FormHelperText error>{errors.productDiscount}</FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                {/* BRAND ID */}
                                <Grid item xs={12} md={6}>
                                    <Stack sx={{ gap: 1 }}>
                                        <InputLabel>Brand ID*</InputLabel>
                                        <OutlinedInput
                                            name="productBrandId"
                                            value={values.productBrandId}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Product Brand Id"
                                            fullWidth
                                            error={Boolean(touched.productBrandId && errors.productBrandId)}
                                        />
                                        {touched.productBrandId && errors.productBrandId && (
                                            <FormHelperText error>{errors.productBrandId}</FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                {/* ACTIVE SWITCH */}
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={values.productIsActive}
                                                onChange={(e) => setFieldValue('productIsActive', e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label="Is Active"
                                    />
                                </Grid>

                                {/* SUBMIT BUTTON */}
                                <Grid item xs={12}>
                                    <AnimateButton>
                                        <Button type="submit" fullWidth size="large" variant="contained" color="primary" disabled={isViewMode}>
                                            {mode === "add" ? "Add Product" : mode === "edit" ? "Update Product" : "View Product"}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                            </Grid>
                        </form>
                    )}
                </Formik>

                {/* Alerts */}
                <Snackbar
                    open={alertOpen}
                    autoHideDuration={3000}
                    onClose={() => setAlertOpen(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert severity={alertSeverity} variant="filled" sx={{ width: '100%' }}>
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Modal >
    );
}
