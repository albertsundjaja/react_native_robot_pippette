import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import store from './store/store';
import { Provider as PaperProvider } from 'react-native-paper';
import Main from './components/Main';

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <Main />
      </PaperProvider>
    </StoreProvider>
  );
}
