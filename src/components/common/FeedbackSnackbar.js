import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { useFeedback } from '../../hooks/useFeedback';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    right: theme.spacing(3),
    bottom: theme.spacing(3),
    zIndex: theme.zIndex.snackbar,
    maxWidth: 420,
    [theme.breakpoints.down('xs')]: {
      right: theme.spacing(2),
      left: theme.spacing(2),
      bottom: theme.spacing(2),
      maxWidth: 'none',
    },
  },
  alert: {
    boxShadow: theme.layout.surface.cardShadow,
    borderRadius: 0,
  },
}));

export function FeedbackSnackbar() {
  const classes = useStyles();
  const { feedback, closeFeedback } = useFeedback();

  React.useEffect(() => {
    if (!feedback.open) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      closeFeedback();
    }, 4500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [closeFeedback, feedback.open]);

  if (!feedback.open) {
    return null;
  }

  return (
    <Box className={classes.container}>
      <Alert elevation={6} variant="filled" severity={feedback.severity} onClose={closeFeedback} className={classes.alert}>
        {feedback.message}
      </Alert>
    </Box>
  );
}
