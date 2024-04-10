import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharactersState } from './state';
import { Character } from '../../../services/rick-and-morty/character';

const initialState: CharactersState = {
    data: [],
    isLoading: false,
    error: undefined
};

export type FetchCharactersQuery = {
    page: number;
    name: string;
}

const slice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        getCharactersFetch(state: CharactersState, _action: PayloadAction<FetchCharactersQuery>) {
            state.isLoading = true;
        },
        getCharactersSuccess(state: CharactersState, action: PayloadAction<Character[]>) {
            state.isLoading = false;
            state.data = action.payload;
        },
        getCharactersFailure(state: CharactersState, action: PayloadAction<Error | unknown>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { getCharactersFetch, getCharactersSuccess, getCharactersFailure } = slice.actions;

type caseReducers = keyof typeof slice.caseReducers;

type Append<Prefix extends string, Postfix extends string> = `${ Prefix }/${ Postfix }`

type C = Append<typeof slice.name, caseReducers>;

export const charactersReducer = slice.reducer;