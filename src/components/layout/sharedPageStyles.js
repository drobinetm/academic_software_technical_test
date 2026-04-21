export const createSurfacePanelStyle = (theme) => ({
  padding: theme.spacing(3),
  borderRadius: theme.layout.surface.cardRadius,
  background: theme.layout.surface.cardBackground,
  border: `1px solid ${theme.layout.surface.cardBorder}`,
  boxShadow: theme.layout.surface.cardShadow,
});

export const createSecondaryActionButtonStyle = (theme) => ({
  minWidth: 0,
  height: 40,
  padding: theme.spacing(0.75, 1.75),
  borderRadius: 0,
  fontWeight: 700,
  boxShadow: 'none',
  border: 'none',
  backgroundColor: theme.layout.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : '#f7f9fc',
  color: theme.layout.mode === 'dark' ? theme.palette.text.primary : '#4f6781',
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
    marginLeft: 0,
    color: theme.layout.mode === 'dark' ? theme.palette.primary.main : '#607d94',
  },
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: theme.layout.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#eef3f8',
  },
});
