import { createTheme } from '@mui/material';
import { grey, red } from '@mui/material/colors';

export const lightTheme = createTheme({
  palette: {
    // Modifico los colores por defecto de mi template
    mode: 'light',
    background: {
      default: grey[300],
    },
    primary: {
      main: '#4a148c',
    },
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
    },
  },
});
