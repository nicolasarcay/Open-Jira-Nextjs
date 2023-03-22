import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    // aca sirve para personalizar los componentes por defecto de Material IU

    MuiAppBar: {
      // para modificar las pops por defecto que tiene el componente
      defaultProps: {
        elevation: 0,
      },
      // para modificar los estilos que tiene por defecto
      styleOverrides: {
        root: {
          backgroundColor: '#4a148c',
        },
      },
    },
  },
});
