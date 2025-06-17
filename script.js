// script.js for Ella's Birthday Pinterest Board

console.log('Birthday board script loaded!');

document.addEventListener('DOMContentLoaded', function() {
  const startBtn = document.getElementById('start-adventure-btn');
  const homeSection = document.getElementById('home-section');
  const board = document.getElementById('masonry-board');
  if (startBtn && homeSection && board) {
    startBtn.addEventListener('click', function() {
      homeSection.style.display = 'none';
      board.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Wordle Game Implementation ---
  const WORDLE_ANSWER = 'SLIDE';
  const MAX_GUESSES = 6;
  const wordlePlaceholder = document.getElementById('wordle-placeholder');
  const wordleCongrats = document.getElementById('wordle-congrats');
  const toSudokuBtn = document.getElementById('to-sudoku-btn');
  const sudokuCard = document.getElementById('sudoku-card');
  const wordleCard = document.getElementById('wordle-card');

  function createWordleBoard() {
    let guesses = [];
    let currentGuess = '';
    let gameOver = false;
    wordlePlaceholder.innerHTML = `
      <div class="wordle-board"></div>
      <input id="wordle-input" maxlength="5" autocomplete="off" placeholder="Type a 5-letter word" autofocus style="text-transform:uppercase;">
      <button id="wordle-submit">Guess</button>
      <div id="wordle-message"></div>
    `;
    const boardDiv = wordlePlaceholder.querySelector('.wordle-board');
    const input = document.getElementById('wordle-input');
    const submit = document.getElementById('wordle-submit');
    const message = document.getElementById('wordle-message');

    function renderBoard() {
      boardDiv.innerHTML = '';
      for (let guess of guesses) {
        const row = document.createElement('div');
        row.className = 'wordle-row';
        for (let i = 0; i < 5; i++) {
          const cell = document.createElement('span');
          cell.className = 'wordle-cell';
          cell.textContent = guess.word[i];
          cell.style.background = guess.colors[i];
          row.appendChild(cell);
        }
        boardDiv.appendChild(row);
      }
    }

    function checkGuess(guess) {
      guess = guess.toUpperCase();
      let colors = Array(5).fill('#FF4B4B'); // default: red for wrong
      let answerArr = WORDLE_ANSWER.split('');
      let guessArr = guess.split('');
      // First pass: correct position
      for (let i = 0; i < 5; i++) {
        if (guessArr[i] === answerArr[i]) {
          colors[i] = '#2C5F2D'; // green
          answerArr[i] = null;
          guessArr[i] = null;
        }
      }
      // Second pass: right letter, wrong spot
      for (let i = 0; i < 5; i++) {
        if (guessArr[i] && answerArr.includes(guessArr[i])) {
          colors[i] = '#FFD600'; // yellow
          answerArr[answerArr.indexOf(guessArr[i])] = null;
        }
      }
      return colors;
    }

    submit.onclick = function() {
      if (gameOver) return;
      let val = input.value.trim().toUpperCase();
      if (val.length !== 5) {
        message.textContent = 'Please enter a 5-letter word.';
        return;
      }
      message.textContent = '';
      let colors = checkGuess(val);
      guesses.push({ word: val, colors });
      renderBoard();
      input.value = '';
      if (val === WORDLE_ANSWER) {
        gameOver = true;
        wordleCongrats.style.display = 'block';
        input.disabled = true;
        submit.disabled = true;
        // Prepare to generate a fun Sudoku example for the next stage
      } else if (guesses.length >= MAX_GUESSES) {
        gameOver = true;
        message.textContent = `Out of guesses! The answer was ${WORDLE_ANSWER}.`;
        input.disabled = true;
        submit.disabled = true;
        wordleCongrats.style.display = 'block';
      }
    };
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') submit.onclick();
    });
    renderBoard();
  }

  if (wordlePlaceholder) {
    createWordleBoard();
  }

  if (toSudokuBtn && sudokuCard && wordleCard) {
    toSudokuBtn.onclick = function() {
      wordleCard.style.display = 'none';
      sudokuCard.style.display = 'flex';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }

  // --- Sudoku and Paint-by-Numbers logic will go here ---

  // --- Sudoku Implementation ---
  const sudokuPlaceholder = document.getElementById('sudoku-placeholder');
  const sudokuCongrats = document.getElementById('sudoku-congrats');
  const toPaintBtn = document.getElementById('to-paint-btn');
  const paintCard = document.getElementById('paint-card');

  // Example Sudoku puzzle (medium, pre-filled for demo)
  // 0 = empty
  const sudokuPuzzle = [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0]
  ];
  // Solution for the above puzzle
  const sudokuSolution = [
    [4, 3, 5, 2, 6, 9, 7, 8, 1],
    [6, 8, 2, 5, 7, 1, 4, 9, 3],
    [1, 9, 7, 8, 3, 4, 5, 6, 2],
    [8, 2, 6, 1, 9, 5, 3, 4, 7],
    [3, 7, 4, 6, 8, 2, 9, 1, 5],
    [9, 5, 1, 7, 4, 3, 6, 2, 8],
    [5, 1, 9, 3, 2, 6, 8, 7, 4],
    [2, 4, 8, 9, 5, 7, 1, 3, 6],
    [7, 6, 3, 4, 1, 8, 2, 5, 9]
  ];
  // Highlighted cell indices (row, col) for the phrase (28 cells)
  const highlightOrder = [
    [0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
    [1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],
    [2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],
    [3,0]
  ];
  // Number sequence for the phrase
  const phraseNumbers = [1,5,4,9,4,7,9,4,5,3,7,6,6,8,5,4,5,8,2,6,2,6,3,3,8,7,6,3];

  function renderSudoku() {
    sudokuPlaceholder.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'sudoku-table';
    for (let r = 0; r < 9; r++) {
      const tr = document.createElement('tr');
      for (let c = 0; c < 9; c++) {
        const td = document.createElement('td');
        td.className = 'sudoku-cell';
        // Check if this cell is highlighted for the phrase
        let highlightIdx = highlightOrder.findIndex(([hr, hc]) => hr === r && hc === c);
        if (highlightIdx !== -1) {
          td.classList.add('highlighted');
          td.setAttribute('data-highlight-idx', highlightIdx);
        }
        if (sudokuPuzzle[r][c] !== 0) {
          td.textContent = sudokuPuzzle[r][c];
          td.classList.add('prefilled');
        } else {
          const input = document.createElement('input');
          input.type = 'text';
          input.maxLength = 1;
          input.pattern = '[1-9]';
          input.className = 'sudoku-input';
          td.appendChild(input);
        }
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    sudokuPlaceholder.appendChild(table);
    // Add legend and instructions
    const legend = document.createElement('div');
    legend.className = 'sudoku-legend';
    legend.innerHTML = `<b>Decoding Legend:</b><br>
      1=A, 2=B, 3=C, 4=D, 5=E, 6=F, 7=G, 8=H, 9=I, 10=J (1), 11=K (2), ...<br>
      <b>After solving, read the highlighted cells in order to decode your secret message!</b>`;
    sudokuPlaceholder.appendChild(legend);
    const instructions = document.createElement('div');
    instructions.className = 'sudoku-instructions';
    instructions.innerHTML = `<b>Instructions:</b> Solve the Sudoku. When finished, the highlighted cells (in order) will reveal a secret message. Use the legend to decode!`;
    sudokuPlaceholder.appendChild(instructions);
    // Add check button
    const checkBtn = document.createElement('button');
    checkBtn.textContent = 'Check Solution';
    checkBtn.className = 'next-btn';
    checkBtn.onclick = checkSudoku;
    sudokuPlaceholder.appendChild(checkBtn);
  }

  function checkSudoku() {
    const table = sudokuPlaceholder.querySelector('table');
    let correct = true;
    let highlights = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const cell = table.rows[r].cells[c];
        let val;
        if (cell.classList.contains('prefilled')) {
          val = parseInt(cell.textContent);
        } else {
          val = parseInt(cell.querySelector('input').value);
        }
        if (val !== sudokuSolution[r][c]) {
          correct = false;
        }
        // Collect highlighted cell values
        if (cell.classList.contains('highlighted')) {
          highlights.push(val || 0);
        }
      }
    }
    if (correct) {
      sudokuCongrats.style.display = 'block';
      // Show the decoded message
      let decoded = highlights.map(n => {
        if (!n || n < 1 || n > 9) return '_';
        return String.fromCharCode(64 + n); // 1=A, 2=B, ...
      }).join('');
      sudokuCongrats.innerHTML += `<div class='decoded-message'><b>Your decoded message:</b><br>${decoded}</div>`;
    } else {
      alert('Not quite right yet! Double check your solution.');
    }
  }

  if (sudokuPlaceholder) {
    renderSudoku();
  }

  if (toPaintBtn && paintCard && sudokuCard) {
    toPaintBtn.onclick = function() {
      sudokuCard.style.display = 'none';
      paintCard.style.display = 'flex';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }
});

// TODO: Add Sudoku logic here
// function renderSudoku() {}

// TODO: Add Paint-by-Numbers logic here
// function renderPaintByNumbers() {} 