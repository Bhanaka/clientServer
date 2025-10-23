/* eslint-disable prettier/prettier */
// project import
import { Grid } from '@mui/system';
import MainCard from '../../components/MainCard';
import { Typography } from '@mui/material';
import BrandTable from './brandTable';

import AddBrandButton from './AddBrandButton';


export default function BrandManagementDefault() {
    return (
        // 🧩 Step 1: Create a container grid
        <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid>
                        <Typography variant="h5">Add New Brand</Typography>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    {/* <AddBrand /> */}
                    <AddBrandButton />
                </MainCard>

            </Grid>
            {/* row 3 */}
            <Grid size={{ xs: 12 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid>
                        <Typography variant="h5">Brand List Table</Typography>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <BrandTable />
                </MainCard>

            </Grid>

        </Grid>
    );
}
