import $ from 'vanilly';
import { calculateWinner } from './utils/calculateWinner';
import './css';

// pure-component
const Square = (val: number) => {
  return $('button')
    .$class('square')
    .$text(val);
};

// board, Lifting State up here
const Board = (name: string) => {
  const squares = Array(9).fill(null);
  const status = 'Next player: X';
  let xIsNext = true;

  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';

    xIsNext = !xIsNext;
    updateGameStatus();
  };

  const renderSquare = (i: number) => {
    return Square(squares[i]).$on('click', function() {
      handleClick(i);
      this.$replace(renderSquare(i));
    });
  };

  const updateGameStatus = () => {
    const winner = calculateWinner(squares);
    let status: string;

    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    game.$query('#status', el => el.$text(status));
  };

  const game = $('div').$append(
    $('div').$text(name),
    $('div')
      .$id('status')
      .$class('status')
      .$text(status),
    $('div')
      .$class('board-row')
      .$append(renderSquare(0), renderSquare(1), renderSquare(2)),
    $('div')
      .$class('board-row')
      .$append(renderSquare(3), renderSquare(4), renderSquare(5)),
    $('div')
      .$class('board-row')
      .$append(renderSquare(6), renderSquare(7), renderSquare(8)),
  );

  return game;
};

// Game application, render some board
const Game = () => {
  return $('div')
    .$class('game')
    .$append(
      $('div')
        .$class('game-board')
        .$append(Board('Game A')),
      $('div')
        .$class('game-board')
        .$append(Board('Game B')),
      $('div')
        .$class('game-board')
        .$append(Board('Game C')),
    );
};

document.body.append(Game());
