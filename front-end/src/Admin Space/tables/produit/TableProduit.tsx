import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from "@mui/icons-material/Edit";
import { ListeProduit } from './ListeProduit';
import SupprimerProduit from './SupprimerProduit';
import ActionProduit from './ActionProduit';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof Produit>(
    order: Order,
    orderBy: Key
): (a: Produit, b: Produit) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

interface Produit {
    id: number;
    titre: string;
    description: string;
    categorie: string;
    image_url: string;
    prix_old: string;
    prix_new: string;
    stock: boolean;
    nombre_avis: number;
}

interface HeadCell {
    id: keyof Produit;
    label: string;
}
const headCells: readonly HeadCell[] = [
    { id: "titre", label: "Titre" },
    { id: "prix_new", label: "Prix Actuel" },
    { id: "prix_old", label: "Ancien Prix" },
    { id: "categorie", label: "Catégorie" },
    { id: 'stock', label: "Stock" },
    { id: "nombre_avis", label: "Avis" },
    { id: "stock", label: "Action" },
];


interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Produit) => void;
    order: Order;
    orderBy: string;
}


export default function TableProduit() {

    const [modalOpen, setModalOpen] = React.useState(false);
    const [isUpdate, setIsUpdate] = React.useState(false);

    const rows = ListeProduit(isUpdate);
    const handleAddClick = () => {
        setSelectedRow({})
        setModalOpen(true);
    };

    const toggleModal = () => {
        setModalOpen((prev) => !prev);
    };
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Produit>('titre');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selectedRow, setSelectedRow] = React.useState<any>({});

    function EnhancedTableHead(props: EnhancedTableProps) {
        const { order, orderBy, onRequestSort } =
            props;
        const createSortHandler =
            (property: keyof Produit) => (event: React.MouseEvent<unknown>) => {
                onRequestSort(event, property);
            };

        return (
            <TableHead>
                <TableRow>

                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={'left'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    function EnhancedTableToolbar() {
        return (
            <Toolbar
                sx={[
                    {
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        backgroundColor: "#2a86e2ff",
                        color: "#fff",
                        boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
                    },

                ]}
            >
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Table Produit
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Ajouter Produit">
                        <IconButton onClick={handleAddClick}>
                            <AddIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </Tooltip>

                </Box>

            </Toolbar>
        );
    }
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Produit,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            [...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [rows, order, orderBy, page, rowsPerPage],
    );
    return (

        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%' }}>
                    <EnhancedTableToolbar />
                    <TableContainer
                        component={Paper}
                        sx={{
                            borderRadius: 3,
                            boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                            overflowX: "auto",
                        }}
                    >
                        <Table sx={{ minWidth: 1000 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'} >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {visibleRows.map((row) => {


                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.id}
                                            sx={{ cursor: 'pointer' }}
                                        >

                                            <TableCell align="left">{row.titre}</TableCell>
                                            <TableCell align="left">{row.prix_new} TND</TableCell>
                                            <TableCell align="left">{row.prix_old} TND</TableCell>
                                            <TableCell align="left">{row.categorie}</TableCell>
                                            <TableCell align="left" sx={{ color: row.stock ? 'green' : 'red' }}>
                                                {row.stock ? 'En stock' : 'Rupture'}
                                            </TableCell>
                                            <TableCell align="left">{row.nombre_avis}</TableCell>

                                            <TableCell align="right" sx={{ display: 'flex', gap: 1 }}>

                                                {/* Supprimer */}
                                                <Tooltip title="Supprimer">
                                                    <SupprimerProduit id={row.id} isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
                                                </Tooltip>

                                                {/* Modifier */}
                                                <Tooltip title="Modifier">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => {
                                                            setSelectedRow(row);
                                                            setModalOpen(true);
                                                        }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

            </Box>
            {modalOpen && <ActionProduit isOpen={modalOpen} toggle={toggleModal} isModifier={selectedRow.id !== undefined} produit={selectedRow}
                isUpdate={isUpdate} setIsUpdate={setIsUpdate} />}
        </>
    );
}