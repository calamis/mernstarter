import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#161e2e',
    },
    secondary: {
      main: '#252f3f',  
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      main: "#ffffff",
    }
  },
  // Typography
  typography: {
    fontFamily: 'Inter,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
    body2: {
      fontFamily: 'Inter,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
      fontSize: "14px",
    },
    body1: {
      fontFamily: 'Inter,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
      fontSize: "16px",
    },
  },
  shape: {
    borderRadius: 0,
  },
  shadows: ["none"],
  //Button
  overrides: {
    MuiTextField: {
      root: {
        backgroundColor: "none",
      }
    },
    MuiButton: {
      root: {
        textTransform: "none",
        padding: "10px",
      },
      fullWidth: {
        maxWidth: ""
      }
    }
  },
  props: {
    MuiButton: {
      color: "primary",
      disableRipple: true,
      variant: "outlined",
    },
    MuiCheckbox: {
      disableRipple: true,
    },
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiTextField: {
      variant: "outlined",
      InputLabelProps: {
        shrink: true,
      }
    }
  }
});

export default theme;
