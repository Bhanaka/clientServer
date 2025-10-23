/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Box,
    Stack,
    Typography
} from '@mui/material';
import Dot from 'components/@extended/Dot';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'brandNo', align: 'left', disablePadding: false, label: 'No' },
    { id: 'brandCode', align: 'left', disablePadding: false, label: 'Code No.' },
    { id: 'brandName', align: 'left', disablePadding: false, label: 'Name' },
    { id: 'brandIsActive', align: 'right', disablePadding: false, label: 'isActive' }
];

function BrandTableHead({ order, orderBy }) {
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
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function OrderStatus({ status }) {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'warning';
            title = 'Pending';
            break;
        case 1:
            color = 'success';
            title = 'Approved';
            break;
        case 2:
            color = 'error';
            title = 'Rejected';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    return (
        <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
}

export default function BrandTable() {
    const order = 'asc';
    const orderBy = 'brandNo';

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
                    <BrandTableHead order={order} orderBy={orderBy} />
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>BR-001</TableCell>
                            <TableCell>Apple</TableCell>
                            <TableCell align="right">Yes</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

BrandTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };
OrderStatus.propTypes = { status: PropTypes.number };
