interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci.',
      status: 'finished',
      createdAt: Date.now() - 1000000,
    },
    {
      description: 'Lorem ipsum dolor sit amet.',
      status: 'pending',
      createdAt: Date.now() - 250000,
    },
    {
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, corporis?',
      status: 'progress',
      createdAt: Date.now() - 300000,
    },
  ],
};
