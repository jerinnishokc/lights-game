import React from 'react';
import './board.styles.css';
import {generateBoxes} from '../../helper';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {cells: generateBoxes(this.props.nCells)};
        console.log(this.state);
        this.handleClick = this.handleClick.bind(this);
    }

    static defaultProps = {
        nCells: 25,
        nRows: 5,
        nColumns: 5
    };

    // renderCells() {
    //     const cells = [];
    //     for(let i = 0; i < this.props.nCells; i++) {
    //         cells.push(<div key={i} className='cells'>{i}</div>)
    //     }
    //     return cells;
    // }

    handleClick(e) {
        const id = +e.target.id; 
        //e.persist(); To persist the event properties inside the asynchronous setState synthetic call. Coz synthetic events
        //usually nullify all the event properties for performance purpose
        this.setState(state => {
            // const newCells = state.cells.map(cell => {
            //                     return cell.id === id ? {...cell, glow: !cell.glow} : cell;
            //                   });
            const newCells = this.gameLogic(state.cells[id], state.cells);
            return {cells: newCells};
        }, () => console.log(this.state));
    }
    
    gameLogic(targetCell, cells) {
        console.log('targetcell: ', targetCell);
        const newCells = cells.map(cell => {
            const idMatch = (cell.id === targetCell.id);
            const {rowNum,colNum} = cell;
            //console.log(rowNum,colNum);
            const columnCheck1 = (targetCell.rowNum === rowNum - 1) && (targetCell.colNum === colNum);
            const columnCheck2 = (targetCell.rowNum === rowNum + 1) && (targetCell.colNum === colNum);
            //console.log(cell, idMatch, columnCheck1, columnCheck2);
            const rowCheck1 = (targetCell.rowNum === rowNum) && (targetCell.colNum === colNum - 1);
            const rowCheck2 = (targetCell.rowNum === rowNum) && (targetCell.colNum === colNum + 1);
            return idMatch || columnCheck1 || columnCheck2 || rowCheck1 || rowCheck2 ? {...cell, glow: !cell.glow} : cell;
        });
        return newCells;
    }

    render() {
        let gameState = 'play';
        let check = this.state.cells.reduce((a,c) => a + +c.glow, 0);
        gameState = (check === 0 ? 'win' : 'play');

        return (
            <div className="board-container">
                {
                    gameState === 'win' ?
                    <p>YOU WIN</p> :  
                    this.state.cells.map(cell => {
                        return <div key={cell.id} className={`cells ${cell.glow ? 'glow' : ''}`} onClick={this.handleClick} id={cell.id}>{cell.id}</div>;
                    })
                }
            </div>
        );
    }
}

export default Board;

// toggleCells[id] = 'a';

// const rowNum = Math.floor(id/this.props.nRows) + 1;
// const colNum = Math.floor(id/this.props.nColumns) + 1;
//if(rowNum !== 1) {
    //     toggleCells[id-this.props.nRows] = 'a';
    //     toggleCells[id+this.props.nRows] = 'a';
    // }
    // if(rowNum === 1) {
    //     toggleCells[id+this.props.nRows] = 'a';
    // }
    // if(rowNum === this.props.nRows) {
    //     toggleCells[id-this.props.nRows] = 'a';
    // }
    // console.log('Rows: ', toggleCells);
    // if(colNum !== 1) {
    //     toggleCells[`${(id-1)}`] = 'a';
    //     toggleCells[`${(id+1)}`] = 'a';
    // }
    // if(colNum === 1) {
    //     toggleCells[`${(id+1)}`] = 'a';
    // }
    // if(colNum === this.props.nColumns) {
    //     toggleCells[`${(id-1)}`] = 'a';
    // }
    // console.log('With Columns: ', toggleCells);
    // console.log(rowNum,colNum);

    // console.log(toggleCells);