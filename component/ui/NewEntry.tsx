import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/AddTaskOutlined';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);

  const { setIsAddingEntry, isAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState('');

  const [touched, setTouched] = useState(false);

  const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;

    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue('');
  };

  return (
    <Box sx={{ maxWidth: '95%', margin: '0 auto 10px' }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva Entrada"
            autoFocus
            multiline
            label="Nueva tarea"
            // pongo condicional al helpertext para que solo aparezca cuando hay un error
            helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
            // con error le digo que si no escribio nada y saco el foco marque el error
            error={inputValue.length <= 0 && touched}
            onChange={onTextFieldChange}
            // el blur es para detectar cuando pierdo el foco del elemento y asi cambiar el touched
            onBlur={() => setTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                setIsAddingEntry(false);
                setTouched(false);
                setInputValue('');
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<SaveIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          fullWidth
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  );
};
