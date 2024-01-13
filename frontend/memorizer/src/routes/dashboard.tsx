import { Outlet } from 'react-router-dom';
import { trpc } from '../trpc';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export function Dashboard() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log(isAuthenticated);
  }, []);
  const list_cards_query = trpc.cards.list.useQuery();
  if (list_cards_query.isLoading) {
    return <div>Loading...</div>;
  }
  if (list_cards_query.data === undefined) return <div>No Data...</div>;
  return (
    <main>
      isAuthenticated:{isAuthenticated.toString()}
      --- {JSON.stringify(list_cards_query.data)}---
      <h1>Home Page</h1> {isAuthenticated}
      <p>There will be a graph showing the memory levels for each deck</p>
      <p>List of all decks with ability to add more</p>
      <Outlet />
    </main>
  );
}
