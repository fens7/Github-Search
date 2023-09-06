import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IRepo } from '../../models/models';
import { useAppSelector } from '../../hooks/hooks';
import { RootState } from '../store';

const API = 'http://localhost:3001/favorites/';

export interface FavRepo {
    id: number;
    favoriteUrl: string;
}

interface RepoState {
    favorites: FavRepo[];
}

const initialState: RepoState = {
    favorites: [],
};

export const getFavorites = createAsyncThunk('github/getFavorites', async () => {
    try {
        const { data } = await axios.get(API);
        return data;
    } catch (error) {}
});

export const addToFavorites = createAsyncThunk('github/addToFavorites', async (params: FavRepo) => {
    try {
        const { data } = await axios.post(API, params);
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const removeFromFavorites = createAsyncThunk(
    'github/removeFromFavorites',
    async (id: number) => {
        try {
            await axios.delete(API + id);
        } catch (error) {
            console.log(error);
        }
    },
);

export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToFavorites.fulfilled, (state, action) => {
                state.favorites.push(action.payload);
            })
            .addCase(getFavorites.fulfilled, (state, action) => {
                state.favorites = action.payload;
                // console.log(action.payload);
            })
            .addCase(removeFromFavorites.fulfilled, (state, action) => {
                state.favorites = state.favorites.filter((fav) => fav.id !== action.meta.arg);
            });
    },
});

export const fetchFavorites = (state: RootState) => state.github.favorites;

export const githubReducer = githubSlice.reducer;
