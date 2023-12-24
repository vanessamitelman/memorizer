import { atom } from 'jotai';

export const userAtom = atom<{
  id: number;
  email: string;
} | null>(null);
