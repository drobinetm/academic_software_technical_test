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
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

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
    flexShrink: 0,
  },
  successIcon: {
    backgroundColor: theme.layout.mode === 'dark' ? 'rgba(47, 157, 120, 0.16)' : 'rgba(47, 157, 120, 0.10)',
    color: theme.palette.success.main,
  },
  errorIcon: {
    backgroundColor: theme.layout.mode === 'dark' ? 'rgba(198, 91, 87, 0.16)' : 'rgba(198, 91, 87, 0.10)',
    color: theme.palette.error.main,
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

export function MessageDialog({
  open,
  title,
  message,
  severity = 'success',
  onClose,
  actionLabel = 'Aceptar',
}) {
  const classes = useStyles();

  const isError = severity === 'error';

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" PaperProps={{ className: classes.paper }}>
      <DialogTitle className={classes.title} disableTypography>
        <Box className={classes.titleContent}>
          <Box className={`${classes.titleIconWrap} ${isError ? classes.errorIcon : classes.successIcon}`}>
            {isError ? <ErrorOutlineOutlinedIcon fontSize="small" /> : <CheckCircleOutlineOutlinedIcon fontSize="small" />}
          </Box>
          <Typography variant="h6" className={classes.titleText}>
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <DialogContentText className={classes.description}>{message}</DialogContentText>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button onClick={onClose} color="primary" variant="contained" className={classes.actionButton}>
          {actionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
