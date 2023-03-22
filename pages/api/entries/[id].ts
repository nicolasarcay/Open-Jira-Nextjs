import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  //   Consulto si el id es valido en la BD
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: 'El ID no es valido' });
  }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res);

    case 'GET':
      return getEntry(req, res);

    case 'DELETE':
      return deleteEntry(req, res);

    default:
      res.status(400).json({ message: 'El metodo no existe' });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: 'No hay entrada con ese ID' });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );

    await db.disconnect();

    res.status(200).json(updatedEntry);
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToGet = await Entry.findById(id);

  await db.disconnect();

  if (!entryToGet) {
    return res.status(400).json({ message: 'No hay entrada con ese ID' });
  }

  res.status(200).json(entryToGet);

  await db.disconnect();
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  try {
    const deletedEntry = await Entry.findByIdAndDelete(id);

    await db.disconnect();

    res.status(200).json(deletedEntry);
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
