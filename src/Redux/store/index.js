import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import rootReducer from "../reducer/index";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function storeFunction() {
    let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
    let persistor = persistStore(store);
    return { store, persistor };
};