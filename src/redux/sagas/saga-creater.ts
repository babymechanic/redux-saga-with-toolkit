type SliceLike = {
    name: string;
    actions: { [K: string]: (...args: any[]) => any }
}

type ActionPath<TSliceName extends string, TAction extends string> = `${ TSliceName }/${ TAction }`;

export type ExtractActionPaths<T extends SliceLike> = ActionPath<T['name'], Exclude<keyof T['actions'], number | symbol>>;

export type ExtractPayload<T extends SliceLike, TPath extends ExtractActionPaths<T>> =
    TPath extends `${ string }/${ infer TProp }`
        ? TProp extends keyof T['actions']
            ? T['actions'][TProp] extends ((...args: any[]) => any)
                ? ReturnType<T['actions'][TProp]>
                : never
            : never
        : never;


