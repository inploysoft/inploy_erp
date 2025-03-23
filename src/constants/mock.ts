// User table mock
type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const tableMock: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example1@gmail.com',
  },
  {
    id: 'asdasdsad',
    amount: 125,
    status: 'processing',
    email: 'example2@gmail.com',
  },
  {
    id: 'fdhdfsgh',
    amount: 125,
    status: 'processing',
    email: 'example3@gmail.com',
  },
  {
    id: 'dketh42',
    amount: 125,
    status: 'processing',
    email: 'example4@gmail.com',
  },
  // ...
];
