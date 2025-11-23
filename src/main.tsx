/* --- Imports --- */
import { createRoot } from 'react-dom/client';
import { App } from './app/App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

/* --- Create React Root --- */
const reactRoot = document.getElementById('root') as HTMLElement;
const rootEleemnt = createRoot(reactRoot);

/* --- Render App --- */
rootEleemnt.render(
	<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
		<App />
	</GoogleOAuthProvider>
);
