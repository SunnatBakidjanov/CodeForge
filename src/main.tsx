/* --- Imports --- */
import { createRoot } from 'react-dom/client';
import { App } from './app/App.tsx';

/* --- Create React Root --- */
const reactRoot = document.getElementById('root') as HTMLElement;
const rootEleemnt = createRoot(reactRoot);

/* --- Render App --- */
rootEleemnt.render(<App />);
