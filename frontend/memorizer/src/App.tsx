import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from './trpc';
import { BrowserRouter } from 'react-router-dom';
import { RouterComponent } from './Router';
import { ThemeProvider } from '@mui/material';
import { theme } from './Theme/theme';
export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3301/trpc',
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          }
        })
      ]
    })
  );
  return (
    // <ThemeProvider theme={theme}>
    <GoogleOAuthProvider clientId='793087155881-3gd19s84s0t7qjtgnvdelag2n6ijt1g1.apps.googleusercontent.com'>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <RouterComponent />
          </BrowserRouter>
        </QueryClientProvider>
      </trpc.Provider>
    </GoogleOAuthProvider>
    // </ThemeProvider>
  );
}

export default App;
