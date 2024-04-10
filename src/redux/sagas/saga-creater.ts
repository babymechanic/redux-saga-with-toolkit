import { takeLatest } from 'redux-saga/effects';

type SliceLike = {
    name: string;
    actions: { [K: string]: (...args: any[]) => any }
}

type ActionPath<TSliceName extends string, TAction extends string> = `${ TSliceName }/${ TAction }`;

export type ExtractActionPaths<T extends SliceLike> = ActionPath<T['name'], Exclude<keyof T['actions'], number | symbol>>;

type ExtractPayload<T extends SliceLike, TPath extends ExtractActionPaths<T>> =
    TPath extends `${ string }/${ infer TProp }`
        ? TProp extends keyof T['actions']
            ? T['actions'][TProp] extends ((...args: any[]) => any)
                ? ReturnType<T['actions'][TProp]>
                : never
            : never
        : never;


export const createSaga = <
    T extends SliceLike,
    TPath extends ExtractActionPaths<T>,
>(path: TPath, handler: (_: ExtractPayload<T, TPath>) => Generator<unknown, unknown>) => {
    return function* () {
        yield takeLatest(path, handler);
    }
}
