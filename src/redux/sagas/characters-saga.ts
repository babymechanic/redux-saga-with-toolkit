import { call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { Page } from '../../services/rick-and-morty/page';
import { Character } from '../../services/rick-and-morty/character';
import {
    CharacterActionPaths,
    CharactersSlice,
    FetchCharactersQuery,
    getCharactersFailure,
    getCharactersSuccess
} from '../slices/rick-and-morty/slice';
import { ExtractPayload } from './saga-creater';

const callService = async (payload: FetchCharactersQuery): Promise<Page<Character>> => {
    console.log({ payload });
    const result = await fetch('https://rickandmortyapi.com/api/character/');
    return result.json();
};

function* workGetCharactersFetch(action: ExtractPayload<CharactersSlice, 'characters/getCharactersFetch'>) {
    try {
        const response: SagaReturnType<typeof callService> = yield call(callService, action.payload);
        yield put(getCharactersSuccess(response.results));
    } catch (error) {
        yield put(getCharactersFailure(error));
    }
}

export function* charactersSaga() {
    yield takeLatest('characters/getCharactersFetch' satisfies CharacterActionPaths, workGetCharactersFetch)
}