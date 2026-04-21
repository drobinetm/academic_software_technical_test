import React from 'react';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { getCustomerFullName } from '../../services/customer/customerTransformers';

const useStyles = makeStyles((theme) => ({
  tablePaper: {
    background: theme.layout.surface.cardBackground,
    border: 'none',
    boxShadow: theme.layout.surface.cardShadow,
    overflow: 'hidden',
    borderRadius: 0,
  },
  table: {
    borderCollapse: 'separate',
    borderSpacing: 0,
  },
  headCell: {
    backgroundColor: theme.layout.surface.tableHeadBackground,
    color: theme.palette.common.white,
    fontWeight: 700,
    borderBottom: 'none',
    borderRight: '1px solid #ffffff',
    borderLeft: 'none',
    '&:last-child': {
      borderRight: 'none',
    },
  },
  identificationHeadCell: {
    width: 170,
  },
  actionHeadCell: {
    width: 110,
    paddingLeft: 8,
    paddingRight: 8,
    textAlign: 'center',
  },
  emptyState: {
    padding: theme.spacing(6, 3),
    textAlign: 'center',
  },
  actionCell: {
    whiteSpace: 'nowrap',
    width: 110,
    paddingLeft: 8,
    paddingRight: 8,
    textAlign: 'center',
    borderBottom: `1px solid ${theme.layout.surface.cardBorder}`,
    borderRight: `1px solid ${theme.layout.surface.cardBorder}`,
    '& .MuiIconButton-root': {
      padding: 6,
    },
  },
  bodyCell: {
    borderBottom: `1px solid ${theme.layout.surface.cardBorder}`,
    borderRight: `1px solid ${theme.layout.surface.cardBorder}`,
  },
  firstColumnCell: {
    borderLeft: `1px solid ${theme.layout.surface.cardBorder}`,
  },
  firstHeadCell: {
    borderLeft: '1px solid #ffffff',
  },
  emptyCell: {
    borderBottom: `1px solid ${theme.layout.surface.cardBorder}`,
    borderLeft: `1px solid ${theme.layout.surface.cardBorder}`,
    borderRight: `1px solid ${theme.layout.surface.cardBorder}`,
  },
}));

export function CustomerListTable({ rows, onEdit, onDelete }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tablePaper} elevation={0}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={`${classes.headCell} ${classes.firstHeadCell} ${classes.identificationHeadCell}`}>Identificación</TableCell>
            <TableCell className={classes.headCell}>Nombre completo</TableCell>
            <TableCell className={`${classes.headCell} ${classes.actionHeadCell}`} align="center">
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length ? (
            rows.map((customer) => (
              <TableRow hover key={customer.id}>
                <TableCell className={`${classes.bodyCell} ${classes.firstColumnCell}`}>{customer.identificacion || '-'}</TableCell>
                <TableCell className={classes.bodyCell}>{getCustomerFullName(customer) || '-'}</TableCell>
                <TableCell align="center" className={classes.actionCell}>
                  <Tooltip title="Editar cliente">
                    <IconButton color="primary" onClick={() => onEdit(customer)}>
                      <EditOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar cliente">
                    <IconButton color="secondary" onClick={() => onDelete(customer)}>
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className={classes.emptyCell}>
                <Box className={classes.emptyState}>
                  <Typography variant="h6">No se encontraron clientes</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Ajusta los filtros y ejecuta la búsqueda nuevamente.
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
