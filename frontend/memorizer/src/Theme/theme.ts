import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2' // Adjust primary color
    },
    secondary: {
      main: '#f50057' // Adjust secondary color
    }
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Adjust default font family
    fontSize: 16 // Adjust default font size
  }
});
