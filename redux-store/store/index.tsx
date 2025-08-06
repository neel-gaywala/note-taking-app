import { combineReducers } from "redux";
import { STORAGE_NAME } from "@/lib/constants";
import { APP_REDUCER } from "@/redux-store/app";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

interface LogoutParams {
  onSuccess: () => void;
  onError: () => void;
}

export function createPersistStore() {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }
  return createWebStorage("local");
}

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createPersistStore();

const persistConfig = {
  key: STORAGE_NAME,
  storage,
};

const reducer = combineReducers({
  app: APP_REDUCER,
});

export function proceedLogout(params: LogoutParams) {
  return {
    type: "USER_LOGOUT",
    payload: params,
  };
}

/*eslint-disable */
const rootReducer = (state: any, action: any) => {
  if (action.type === "USER_LOGOUT") {
    try {
      action.payload.onSuccess();
      return reducer(undefined, action);
    } catch {
      action.payload.onError();
    }
  }
  return reducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
