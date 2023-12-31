import { Outlet } from 'react-router-dom';
import { trpc } from '../trpc';

export function HomePage() {
  const list_cards_query = trpc.cards.list.useQuery();
  if (list_cards_query.isLoading) {
    return <div>Loading...</div>;
  }
  if (list_cards_query.data === undefined) return <div>No Data...</div>;
  return (
    <main>
      --- {JSON.stringify(list_cards_query.data)}---
      <h1>Home Page</h1>
      <p>There will be a graph showing the memory levels for each deck</p>
      <p>List of all decks with ability to add more</p>
      <Outlet />
    </main>
  );
}
