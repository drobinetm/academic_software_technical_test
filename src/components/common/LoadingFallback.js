import React from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';

export function LoadingFallback({ fullScreen = false, label = 'Cargando' }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight={fullScreen ? '100vh' : 240}
      gridGap={16}
    >
      <CircularProgress color="primary" />
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
    </Box>
  );
}
