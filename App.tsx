
import React from 'react';
import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./src/redux/reducers";
import rootSaga from "./src/redux/sagas";
import { StatusBar, useColorScheme, } from 'react-native';
import Root from "./src/root";
import { Colors } from 'react-native/Libraries/NewAppScreen';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <Provider store={store}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Root />
    </Provider >
  );
}


export default App;
