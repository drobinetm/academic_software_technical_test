import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: theme.layout.surface.cardRadius,
    background: theme.layout.surface.cardBackground,
    border: `1px solid ${theme.layout.surface.cardBorder}`,
    boxShadow: theme.layout.surface.cardShadow,
  },
  title: {
    padding: theme.spacing(3, 3, 1),
  },
  titleContent: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
  },
  titleIconWrap: {
    width: 42,
    height: 42,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.layout.mode === 'dark' ? 'rgba(248, 113, 113, 0.12)' : 'rgba(220, 38, 38, 0.08)',
    color: theme.layout.mode === 'dark' ? '#fca5a5' : '#c62828',
    flexShrink: 0,
  },
  titleText: {
    fontWeight: 700,
    color: theme.palette.text.primary,
  },
  content: {
    padding: theme.spacing(1, 3, 0),
  },
  description: {
    color: theme.palette.text.secondary,
    lineHeight: 1.6,
  },
  actions: {
    padding: theme.spacing(2, 3, 3),
    gap: theme.spacing(1),
  },
  actionButton: {
    minWidth: 0,
    height: 40,
    padding: theme.spacing(0.75, 1.75),
    borderRadius: 0,
    fontWeight: 700,
    boxShadow: 'none',
  },
}));

export function ConfirmationDialog({
  open,
  title,
  description,
  onClose,
  onConfirm,
  loading = false,
  confirmLabel,
  confirmColor = 'secondary',
  hideCancel = false,
}) {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="xs" PaperProps={{ className: classes.paper }}>
      <DialogTitle className={classes.title} disableTypography>
        <Box className={classes.titleContent}>
          <Box className={classes.titleIconWrap}>
            <ReportProblemOutlinedIcon fontSize="small" />
          </Box>
          <Typography variant="h6" className={classes.titleText}>
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <DialogContentText className={classes.description}>{description}</DialogContentText>
      </DialogContent>
      <DialogActions className={classes.actions}>
        {!hideCancel ? (
          <Button onClick={onClose} disabled={loading} variant="outlined" className={classes.actionButton}>
            Cancelar
          </Button>
        ) : null}
        <Button onClick={onConfirm} disabled={loading} color={confirmColor} variant="contained" className={classes.actionButton}>
          {loading ? 'Eliminando...' : confirmLabel || 'Eliminar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
