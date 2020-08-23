import TicTacToe from './TicTacToe'
import React,{useEffect, useState} from 'react';
import ReactDom from 'react-dom';



const MasterGame = () => {
    let [change,setChange] = useState({});
    let [game, setGame] = useState({});

    const loadGame = () => {
        const gameId = document.querySelector('#gameId').value;
        const player = document.querySelector('#player').value;

        setGame(new TicTacToe(gameId,player,setChange));
    }
    const newGame = () => {
        setGame(new TicTacToe(null,'X',setChange));
    }
    return (
        <>
            <input placeholder="gameId" id="gameId" />
            <input placeholder="player" id="player" />
            <input type="button" value="load" onClick={loadGame} />
            <input type="button" value="new game" onClick={newGame} />
            {game.id? <GameBoard game={game} /> :null}
        </>
    )
}

ReactDom.render(
    <MasterGame />,
    document.querySelector('#app')
)
