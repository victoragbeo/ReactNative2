import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

export default function App() {
    return (
        // wrapping Provider n passing store as a prop gives
        // main component n children access to redux store
        <Provider store={store}>
            <Main />
        </Provider>
    );
}

// we now have to go into each comp to set up that connection to the store