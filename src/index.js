import ReactDOM from 'react-dom/client';

import { Provider } from 'mobx-react';

import App from './App';

import MainStore from './stores/mainstore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider MainStore={MainStore}>
        <App />
    </Provider>
);