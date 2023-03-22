import { Edit, Delete } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import React, { DragEvent, FC } from 'react';
import { Entry } from '../../interfaces';
import { useContext } from 'react';
import { UIContext } from '../../context/ui';
import router from 'next/router';
import { EntriesContext } from '../../context/entries';
import { dateFunctions } from '../../utils';
interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { _id, description, createdAt } = entry;

  const { startDragging, endDragging } = useContext(UIContext);
  const { deleteEntry } = useContext(EntriesContext);

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text', _id);
    startDragging();
  };

  const onDragEnd = () => {
    endDragging();
  };

  const toEntry = () => {
    router.push(`/entries/${entry._id}`);
  };

  const onDelete = () => {
    deleteEntry(entry._id, true);
  };

  return (
    <Card
      sx={{ maxWidth: '95%', margin: '0 auto 10px' }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="borrar entrada" onClick={onDelete}>
            <Delete />
          </IconButton>
          <IconButton aria-label="editar entrada" onClick={toEntry}>
            <Edit />
          </IconButton>
          <Typography
            variant="body2"
            component={'h4'}
            sx={{ marginLeft: 'auto', marginRight: '8px' }}
          >
            {dateFunctions.getFormatDistanceToNow(createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
