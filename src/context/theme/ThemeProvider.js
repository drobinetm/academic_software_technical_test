import React, { useEffect, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { STORAGE_KEYS } from '../../constants/storage';
import { readStorageValue, writeStorageValue } from '../../utils/storage';
import { ThemeContext } from './ThemeContext';

const THEME_MODES = ['light', 'dark', 'system'];

const getSystemMode = () => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getStoredThemeMode = () => {
  const storedValue = readStorageValue(STORAGE_KEYS.themeMode, 'system');
  return THEME_MODES.includes(storedValue) ? storedValue : 'system';
};

const createAppTheme = (mode) => {
  const isDark = mode === 'dark';
  const primaryMain = isDark ? '#7ea6ff' : '#204a78';
  const secondaryMain = isDark ? '#c9955b' : '#8b5e34';
  const backgroundDefault = isDark ? '#0d1218' : '#eef2f6';
  const backgroundPaper = isDark ? '#161d25' : '#f8fafc';
  const textPrimary = isDark ? '#edf2f7' : '#162535';
  const textSecondary = isDark ? '#99a7b8' : '#5f7084';
  const lineSoft = isDark ? 'rgba(153, 167, 184, 0.14)' : 'rgba(22, 37, 53, 0.12)';
  const lineStrong = isDark ? 'rgba(126, 166, 255, 0.24)' : 'rgba(32, 74, 120, 0.18)';

  return createTheme({
    palette: {
      type: mode,
      primary: {
        main: primaryMain,
      },
      secondary: {
        main: secondaryMain,
      },
      background: {
        default: backgroundDefault,
        paper: backgroundPaper,
      },
      text: {
        primary: textPrimary,
        secondary: textSecondary,
      },
      success: {
        main: '#2f9d78',
      },
      error: {
        main: '#c65b57',
      },
      warning: {
        main: '#c9955b',
      },
    },
    shape: {
      borderRadius: 20,
    },
    typography: {
      fontFamily: 'Inter, Segoe UI, Helvetica Neue, Arial, sans-serif',
      h3: {
        fontWeight: 800,
        letterSpacing: '-0.03em',
      },
      h4: {
        fontWeight: 800,
        letterSpacing: '-0.02em',
      },
      h5: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 700,
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
      },
    },
    layout: {
      mode,
      appBar: {
        background: isDark ? '#101720' : 'rgb(0 21 42)',
        border: isDark ? '#243444' : 'rgb(52 194 254)',
        text: isDark ? '#edf2f7' : '#edf6ff',
        logoutBackground: isDark ? '#1a2430' : 'rgba(255, 255, 255, 0.08)',
        logoutText: isDark ? '#edf2f7' : '#edf6ff',
        selectorBackground: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.08)',
        selectorBorder: isDark ? 'rgba(153, 167, 184, 0.16)' : 'rgba(52, 194, 254, 0.45)',
        selectorText: isDark ? '#dbe5f0' : '#dff6ff',
        selectorActiveBackground: isDark ? '#223244' : 'rgb(52 194 254)',
        selectorActiveText: isDark ? '#ffffff' : 'rgb(0 21 42)',
      },
      drawer: {
        background: isDark
          ? 'linear-gradient(180deg, rgba(18, 24, 32, 0.98), rgba(13, 18, 24, 0.98))'
          : 'linear-gradient(180deg, #fbfcfd, #f3f6fa)',
        border: lineSoft,
        profileBackground: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(22, 37, 53, 0.025)',
        sectionBackground: isDark ? 'rgba(255, 255, 255, 0.025)' : 'rgba(32, 74, 120, 0.05)',
        text: textPrimary,
        mutedText: isDark ? '#c3cfdb' : '#526578',
        accent: isDark ? '#7ea6ff' : '#204a78',
        hoverBackground: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(32, 74, 120, 0.06)',
        activeBackground: isDark ? 'rgba(126, 166, 255, 0.12)' : 'rgba(32, 74, 120, 0.10)',
        activeBorder: lineStrong,
        activeShadow: isDark ? 'none' : 'none',
        avatarBackground: isDark ? '#24303c' : '#d9e4ef',
      },
      page: {
        background: backgroundDefault,
      },
      surface: {
        heroBackground: isDark
          ? 'linear-gradient(135deg, rgba(24, 34, 46, 0.98), rgba(18, 24, 32, 0.98))'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(244, 247, 251, 0.98))',
        heroBorder: lineSoft,
        cardBackground: isDark
          ? 'linear-gradient(180deg, rgba(24, 31, 41, 0.98), rgba(18, 24, 32, 0.98))'
          : 'linear-gradient(180deg, #ffffff, #f7f9fc)',
        cardBorder: lineSoft,
        cardShadow: isDark ? 'none' : 'none',
        cardRadius: 24,
        tableHeadBackground: isDark ? '#1c4676' : '#2f80ed',
        authPanelBackground: isDark
          ? 'linear-gradient(180deg, rgba(24, 31, 41, 0.98), rgba(16, 23, 31, 0.98))'
          : 'linear-gradient(180deg, #ffffff, #f5f8fb)',
        authPanelBorder: lineSoft,
        authPanelShadow: isDark ? 'none' : 'none',
      },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          html: {
            backgroundColor: backgroundDefault,
          },
          body: {
            backgroundColor: backgroundDefault,
          },
          '#root': {
            minHeight: '100vh',
            backgroundColor: backgroundDefault,
          },
        },
      },
      MuiPaper: {
        rounded: {
          borderRadius: 20,
        },
        root: {
          backgroundImage: 'none',
        },
      },
      MuiDrawer: {
        paper: {
          backgroundColor: isDark ? '#121820' : '#f8fafc',
          borderRight: `1px solid ${lineSoft}`,
        },
      },
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: isDark ? 'rgba(16, 23, 32, 0.9)' : 'rgba(247, 249, 252, 0.92)',
          borderBottom: `1px solid ${lineSoft}`,
          backdropFilter: 'blur(16px)',
        },
      },
      MuiOutlinedInput: {
        root: {
          backgroundColor: isDark ? '#111820' : '#ffffff',
          borderRadius: 0,
          minHeight: 68,
          '& fieldset': {
            borderColor: isDark ? 'rgba(153, 167, 184, 0.18)' : '#94a1af',
          },
          '&:hover fieldset': {
            borderColor: isDark ? 'rgba(153, 167, 184, 0.28)' : '#718295',
          },
          '&.Mui-focused fieldset': {
            borderColor: primaryMain,
          },
        },
        input: {
          color: textPrimary,
          paddingTop: 21,
          paddingBottom: 21,
          '&::placeholder': {
            color: isDark ? '#99a7b8' : '#6f7d8c',
            opacity: 1,
          },
          '&:-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 100px ${isDark ? '#111820' : '#ffffff'} inset`,
            WebkitTextFillColor: textPrimary,
            caretColor: textPrimary,
            transition: 'background-color 9999s ease-out 0s',
          },
          '&::-webkit-calendar-picker-indicator': {
            cursor: 'pointer',
            opacity: 1,
            filter: isDark ? 'invert(1)' : 'invert(0.38)',
          },
        },
      },
      MuiInputLabel: {
        outlined: {
          color: isDark ? '#99a7b8' : '#5f7084',
        },
      },
      MuiSelect: {
        outlined: {
          display: 'flex',
          alignItems: 'center',
          minHeight: 22,
          paddingTop: 18.5,
          paddingBottom: 18.5,
        },
        iconOutlined: {
          right: 14,
          color: isDark ? '#99a7b8' : '#5f7084',
        },
      },
      MuiMenu: {
        paper: {
          marginTop: 8,
          borderRadius: 16,
          backgroundColor: isDark ? '#182029' : '#ffffff',
          border: `1px solid ${lineSoft}`,
          boxShadow: 'none',
        },
        list: {
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      MuiMenuItem: {
        root: {
          minHeight: 44,
          marginLeft: 8,
          marginRight: 8,
          borderRadius: 10,
          color: textPrimary,
          '&:hover': {
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(32, 74, 120, 0.06)',
          },
          '&.Mui-selected': {
            backgroundColor: isDark ? 'rgba(126, 166, 255, 0.12)' : 'rgba(32, 74, 120, 0.10)',
          },
          '&.Mui-selected:hover': {
            backgroundColor: isDark ? 'rgba(126, 166, 255, 0.16)' : 'rgba(32, 74, 120, 0.14)',
          },
        },
      },
      MuiButton: {
        root: {
          borderRadius: 0,
          paddingLeft: 18,
          paddingRight: 18,
        },
        containedPrimary: {
          color: '#ffffff',
          backgroundColor: isDark ? '#7ea6ff' : '#204a78',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: isDark ? '#7297ea' : '#1a3f67',
            boxShadow: 'none',
          },
        },
        outlined: {
          borderColor: isDark ? 'rgba(153, 167, 184, 0.18)' : 'rgba(95, 112, 132, 0.22)',
        },
      },
      MuiTableCell: {
        root: {
          borderBottom: `1px solid ${isDark ? 'rgba(153, 167, 184, 0.12)' : 'rgba(95, 112, 132, 0.16)'}`,
        },
        head: {
          color: textPrimary,
          fontWeight: 700,
        },
      },
    },
  });
};

export function ThemeProvider({ children }) {
  const [themeMode, setThemeModeState] = useState(getStoredThemeMode);
  const [systemMode, setSystemMode] = useState(getSystemMode);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => {
      setSystemMode(event.matches ? 'dark' : 'light');
    };

    setSystemMode(mediaQuery.matches ? 'dark' : 'light');

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);

      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }

    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  const setThemeMode = (nextMode) => {
    const safeMode = THEME_MODES.includes(nextMode) ? nextMode : 'system';
    setThemeModeState(safeMode);
    writeStorageValue(STORAGE_KEYS.themeMode, safeMode);
  };

  const resolvedMode = themeMode === 'system' ? systemMode : themeMode;

  const theme = useMemo(() => createAppTheme(resolvedMode), [resolvedMode]);

  const contextValue = useMemo(
    () => ({
      themeMode,
      resolvedMode,
      setThemeMode,
    }),
    [resolvedMode, themeMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
