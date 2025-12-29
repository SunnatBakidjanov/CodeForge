/* --- Imports --- */
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './app/App.tsx';

/* --- Create React Root --- */
const reactRoot = document.getElementById('root') as HTMLElement;
const rootEleemnt = createRoot(reactRoot);

/* React Query Client */
const queryClient = new QueryClient();

/* --- Render App --- */
rootEleemnt.render(
	<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</GoogleOAuthProvider>
);
