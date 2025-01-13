import { Store, applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { ThunkMiddleware, thunk } from 'redux-thunk';

import rootReducer from '@/stores/reducers/rootReducer';

// Tạo store trước khi export
const store = createStore(
	rootReducer,
	applyMiddleware(thunk as unknown as ThunkMiddleware),
);

const persistor = persistStore(store as Store);

// Tạo kiểu AppDispatch từ store.dispatch
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
