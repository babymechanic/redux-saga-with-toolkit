import { call, put, SagaReturnType, takeEvery } from 'redux-saga/effects';
import { Page } from '../../services/rick-and-morty/page';
import { Character } from '../../services/rick-and-morty/character';
import { getCharactersFailure, getCharactersSuccess } from '../slices/rick-and-morty/slice';

const callService = async (): Promise<Page<Character>> => {
    const result = await fetch('https://rickandmortyapi.com/api/character/');
    return result.json();
};

function* workGetCharactersFetch() {
    try {
        const response: SagaReturnType<typeof callService> = yield call(callService);
        yield put(getCharactersSuccess(response.results));
    } catch (error) {
        yield put(getCharactersFailure(error));
    }
}

export function* charactersSaga() {
    yield takeEvery('characters/getCharactersFetch', workGetCharactersFetch)
}