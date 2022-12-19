import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Reducers } from '../reducers';

export const store = createStore(Reducers, applyMiddleware(thunk));

// export const store = configureStore({
//   reducer: Reducers,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
// });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
