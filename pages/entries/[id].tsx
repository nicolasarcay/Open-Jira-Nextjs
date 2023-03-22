import { ChangeEvent, useContext, useState, useMemo, FC } from 'react';
import { GetServerSideProps } from 'next';

import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import { Layout } from '../../component/layouts';
import { Entry, EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import { dbEntries } from '../../database';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'progress', 'finished'];

interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry, deleteEntry } = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState(entry.description);

  const [status, setStatus] = useState<EntryStatus>(entry.status);

  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };

    updateEntry(updatedEntry, true);
  };

  const onDelete = () => {
    deleteEntry(entry._id, true);
  };

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  return (
    <Layout title={inputValue.substring(0, 20) + '...'}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: 'calc(95vh - 100px)' }}
      >
        <Grid item xs={12} md={8} lg={6}>
          <Card>
            <CardHeader
              title={inputValue}
              subheader={`Creada ${dateFunctions.getFormatDistanceToNow(
                entry.createdAt
              )}`}
            />

            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="nueva entrada"
                value={inputValue}
                onChange={onInputValueChanged}
                helperText={isNotValid && 'Ingrese un valor'}
                error={isNotValid}
                onBlur={() => setTouched(true)}
              />
              <FormControl
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row onChange={onStatusChanged} value={status}>
                  {validStatus.map(option => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.dark',
          transform: 'scaleX(-1)',
        }}
        onClick={onDelete}
      >
        <DeleteSweepOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
