import { configureStore } from '@reduxjs/toolkit';
import { githubApi } from '../redux/github/github.api';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { githubReducer } from '../redux/github/github.slice';

export const store = configureStore({
    reducer: {
        [githubApi.reducerPath]: githubApi.reducer,
        github: githubReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
