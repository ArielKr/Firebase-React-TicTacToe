import myBase from './firebase'

class TicTacToe{
    path = "game/"
    id;
    board = new Array(9).fill(0);
    player = 'X';
    turn = 'X';
    onchange = () => {};

    constructor(id,player,onChange){
        this.player = player;
        this.onchange = onChange;
        if(id){
            this.id = id;
            this.get();
            myBase.listener('value',this.path + this.id, res=>{
                this.fromDb(res);
            })
        }else{
            this.id= "g-" + Math.round(Math.random() * 1000000);
            myBase.save(this.path + this.id,this.toDb())
        }
    }
    fromDb(res) {
        this.turn = res.turn;
        this.board = res.board;
        this.isOver();
        this.onchange({});
    }
    get() {
        myBase.get(this.path + this.id).then(res => {
            this.fromDb(res);
        })
    }
    move(loc) {
        if(this.player == this.turn){
            this.board[loc]=this.player;
            this.turn = this.turn == 'X' ? 'Y': 'X';
            this.isOver();
            myBase.save(this.path + this.id,this.toDb())
        }
    }

    toDb() {
        return {
            board: this.board,
            turn: this.turn
        }
    }

    isOver(){
        const wins = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,4,7],
            [2,4,6],
            [0,3,6],
            [1,4,7],
            [2,5,8]
        ]
        if(this.board.every(c => !!c)){
            this.turn = "Over";
        }
        wins.map(state => {
            console.log(this.board[state[0]],this.board[state[0]],this.board[state[1]], this.board[state[2]]);
            if(!!this.board[state[0]] && this.board[state[0]] == this.board[state[1]] && this.board[state[0]] == this.board[state[2]]){
                this.turn = "Win";
            }
        })
    }
}


const Cell = ({value, index ,click}) => {
    const clickable = <p className="clickable" onClick={()=>click(index)}>{value}</p>;
    const noneClick = <p>{value}</p>
    const cube = click? clickable: noneClick;
    return cube;
}

const GameBoard = ({game}) => {
    const canClick = game.turn!=game.player? null : (i) =>{
        game.move(i);
    }
    return (
        <>
        <h3>id: {game.id}: {game.turn}: {game.board.join()}</h3>
            <div className="board">
            {game.board.map((cell,i) =>  <Cell key={i} value={cell} index={i} click={cell == ''? canClick : null} />)}
        </div>
        </>
    )
}

export default TicTacToe;