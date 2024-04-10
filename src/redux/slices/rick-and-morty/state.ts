import { Character } from '../../../services/rick-and-morty/character';

export type CharactersState = {
    data: Character[];
    isLoading: boolean;
    error: Error | unknown | null | undefined;
}