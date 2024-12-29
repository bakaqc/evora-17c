import { Store, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { Persistor } from 'redux-persist/es/types';

import rootReducer from '@/stores/reducers/rootReducer';

const reduxStore = (): { store: Store; persistor: Persistor } => {
	const store = createStore(rootReducer);
	const persistor = persistStore(store);

	return { store, persistor };
};

export default reduxStore;
