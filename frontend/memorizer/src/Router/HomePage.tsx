import { InfoDialog } from '../Components/HomePage/InfoDialog';
import { FormPropsTextFields } from '../Components/form';
import { trpc } from '../trpc';
import { NavLink } from 'react-router-dom';

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
      <FormPropsTextFields />
      <InfoDialog />
      <br />
      <NavLink to='/create-account'>Create Account</NavLink>
      <br />
      <NavLink to='/login'>Login</NavLink>
      <br />
      <NavLink to='/learning'>Learning</NavLink>
    </main>
  );
}
