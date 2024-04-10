import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './redux/store';
import { getCharactersFetch } from './redux/slices/rick-and-morty/slice';

function App() {

    const characters = useAppSelector(x => x.characters.data);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCharactersFetch())
    }, [dispatch]);

    return (
        <div className="App">
            { characters.length }
        </div>
    );
}

export default App;
