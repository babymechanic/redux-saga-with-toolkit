import { call, put, SagaReturnType } from 'redux-saga/effects';
import { Page } from '../../services/rick-and-morty/page';
import { Character } from '../../services/rick-and-morty/character';
import {
    CharactersSlice,
    FetchCharactersQuery,
    getCharactersFailure,
    getCharactersSuccess
} from '../slices/rick-and-morty/slice';
import { createSaga, ExtractActionPaths } from './saga-creater';

const callService = async (payload: FetchCharactersQuery): Promise<Page<Character>> => {
    console.log({ payload });
    const result = await fetch('https://rickandmortyapi.com/api/character/');
    return result.json();
};

const path = 'characters/getCharactersFetch' satisfies ExtractActionPaths<CharactersSlice>;
const characterSaga = createSaga<CharactersSlice, typeof path>(path, function* (action) {
        try {
            const response = (yield call(callService, action.payload)) as SagaReturnType<typeof callService>;
            yield put(getCharactersSuccess(response.results));
        } catch (error) {
            yield put(getCharactersFailure(error));
        }
    }
);

export function* rootSaga() {
    yield characterSaga()
}