//PREPARAZIONE
const grid = document.querySelector('.grid');
const input = document.querySelector('input');
const match_btn = document.querySelector('#match-word');
const next_word_btn = document.querySelector('.btn_next_lingo');
const progressBar = document.querySelector('#myBar');
const cells = document.querySelectorAll('.cell')

let words;
let randomWordValue;
let charsInsertedWord;
let charsRandomWord;
let gridSelected = [];
let tentativo = 0;
let wrongChars = [];
let victory = false;
let interval = null;
let loss = false;
//leggo le stringhe dal file di testo e le inserisco in un array

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      words = this.responseText.split("\n");

      randomWord(words);

    }
  };
  xhttp.open("GET", "words.txt", true);
  xhttp.send();
}
loadDoc();


//Inizio del gioco selezione in maniera random una parola
function randomWord(words) {
  const randomIndex = Math.floor(Math.random() * words.length);
  randomWordValue = words[randomIndex];
  console.log(randomWordValue);
  selectGrid(randomWordValue);
  moveBar();
}

//Creo 4 griglie
let gridMatrix_5_char;
let gridMatrix_6_char;
let gridMatrix_7_char;
let gridMatrix_8_char;


//Seleziono griglia sulla base della lunghezza della parola

function selectGrid(randomWordValue) {
  gridMatrix_5_char = [['', '.', '.', '.', '.'], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']];
  gridMatrix_6_char = [['', '.', '.', '.', '.', '.'], ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']];
  gridMatrix_7_char = [['', '.', '.', '.', '.', '.', '.'], ['', '', '', '', '', '', ''], ['', '', '', '', '', '', ''], ['', '', '', '', '', '', ''], ['', '', '', '', '', '', ''], ['', '', '', '', '', '', ''], ['', '', '', '', '', '', '']];
  gridMatrix_8_char = [['', '.', '.', '.', '.', '.', '.', '.'], ['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '']];

  //Rimuovo classe che fa riferimento alla griglia precedente
  grid.classList.remove('grid-5-chars', 'grid-6-chars', 'grid-7-chars', 'grid-8-chars');

  const lengthWord = randomWordValue.length;

  switch (lengthWord) {
    case 5: drawGrid(gridMatrix_5_char);
      grid.classList.add('grid-5-chars');
      break;
    case 6: drawGrid(gridMatrix_6_char);
      grid.classList.add('grid-6-chars');
      break;
    case 7: drawGrid(gridMatrix_7_char);
      grid.classList.add('grid-7-chars');
      break;
    case 8: drawGrid(gridMatrix_8_char);
      grid.classList.add('grid-8-chars');
      break;
  }

}

//Funzione che disegna la row
function drawRow(selectGrid, attempt, wrongLength, victory, charsInsertedWord, loss) {

  let rows = document.querySelectorAll('.row-div');

  if (victory == true) {
    rows[attempt].innerHTML = '';

    // per riga tentativo
    attemptRow(wrongLength, attempt, charsInsertedWord, selectGrid,rows);

  } else {
    rows[attempt].innerHTML = '';
    if (attempt < selectGrid.length - 1) {
      rows[attempt + 1].innerHTML = '';
    }
    // per riga tentativo
    attemptRow(wrongLength, attempt, charsInsertedWord,selectGrid, rows);
    if (attempt == selectGrid.length - 2) {
      grid.style.height = `calc(60px *${selectGrid.length} `;
      let row = document.createElement('div');
      row.classList.add('row-div');
      grid.appendChild(row);
    }
    //per riga nuova
   selectGrid[attempt + 1].forEach(function (cellContent, cellIndex) {

      cell = document.createElement('div');

      cell.classList.add('cell', 'cell-blue');
      rows[attempt + 1].appendChild(cell);

      cell.innerText = selectGrid[attempt + 1][cellIndex];

      rowAttempt = attempt + 1;

    });

  }

}
//Funzione che gestisce row del tentativo
function attemptRow(wrongLength, attempt, charsInsertedWord, selectGrid, rows){
  selectGrid[attempt].forEach(function (cellContent, cellIndex) {


    cell = document.createElement('div');

    cell.classList.add('cell', 'cell-blue');
    rows[attempt].appendChild(cell);

    cell.innerText = selectGrid[attempt][cellIndex];


    rowAttempt = attempt;
    chooseColor(wrongLength, rowAttempt, charsInsertedWord, cellIndex, selectGrid)


  })

}
//Funzione che disegna griglia
function drawGrid(gridMatrix, charsInsertedWord) {
  grid.innerHTML = '';
  charsRandomWord = randomWordValue.split("");

  gridMatrix.forEach(function (rowCells, rowIndex) {

    row = document.createElement('div');
    row.classList.add('row-div');
    grid.appendChild(row);
    rowCells.forEach(function (cellContent, cellIndex) {

      cell = document.createElement('div');

      cell.classList.add('cell', 'cell-blue');
      row.appendChild(cell);

      gridMatrix[0][0] = charsRandomWord[0];

      cell.innerText = rowCells[cellIndex];
      if (gridMatrix[rowIndex][cellIndex] == charsRandomWord[0]) {
        cell.classList.remove('cell-blue');
        cell.classList.add('cell-green');
      }

    });
  });
  //griglia selezionata
  gridSelected = gridMatrix;
  console.log(gridSelected);
}

// Funzione che gestisce colore celle
function chooseColor(wrongLength, rowAttempt, charsInsertedWord, cellIndex, selectGrid) {
  //se la parola è sbagliata
  if (wrongLength == true) {

    cell.classList.remove('cell-blue');
    cell.classList.add('cell-red');

  } else {

    if (selectGrid[rowAttempt][cellIndex] == charsRandomWord[cellIndex]) {
      cell.classList.remove('cell-blue');
      cell.classList.add('cell-green');
    } else {
  
      wrongChars.push(selectGrid[rowAttempt][cellIndex]);

      if (charsInsertedWord && charsInsertedWord.length != 0) {
        //lettere uguali a lettara della cella considerata incluse nella parola da indovinare
        let equalsCharsRandomWord = charsRandomWord.filter((char) => char == selectGrid[rowAttempt][cellIndex]);
        if (equalsCharsRandomWord.length != 0) {
          //lettere corrette  inserite 
          let charsCorrects = charsInsertedWord.filter((char, i) => char === charsRandomWord[i] && char === selectGrid[rowAttempt][cellIndex]);
          //lettere uguali a lettara della cella considerata inserite fino alla cella iterata
          let equalsCharsInsertedWord = wrongChars.filter((char) => char == selectGrid[rowAttempt][cellIndex]);
          //somma tra le lettere uguali a lettara della cella considerata in posizone errata e lettere uguali corrette
          let totalChar = equalsCharsInsertedWord.length + charsCorrects.length; 

          if (charsCorrects.length < equalsCharsRandomWord.length && totalChar <= equalsCharsRandomWord.length) {
            cell.classList.remove('cell-blue');
            cell.classList.add('cell-orange');

          }
        }
      }
    }
  }
  //In caso di vittoria o sconfitta
  if (victory == true || loss == true) {

    next_word_btn.classList.remove('hidden');
  }

}

//Funzione che confronta stringa inserita con stringa da trovare
function selectArray(attempt) {

  insertedValueWord = input.value.trim().toLowerCase();
  charsInsertedWord = insertedValueWord.split("");

  //parametro per valutazione lunghezza parola 
  let wrongLength = false;
  if (input.value == '') {
    if (attempt == (gridSelected.length - 1)) {
      loss = true;
      gridSelected.push(charsRandomWord);
    }else {
      gridSelected[attempt + 1] = gridSelected[attempt];
    }
    drawRow(gridSelected, attempt, wrongLength, victory, charsInsertedWord, loss);

  } else if (charsRandomWord.length === charsInsertedWord.length) {

    compareTwoArrays(charsRandomWord, charsInsertedWord)

    if (compareTwoArrays(charsRandomWord, charsInsertedWord) == true) {
      victory = true;
      gridSelected[attempt] = charsInsertedWord;
      console.log(gridSelected);
      drawRow(gridSelected, attempt, wrongLength, victory,charsInsertedWord, loss);

    }

    if (compareTwoArrays(charsRandomWord, charsInsertedWord) == false) {
      for (let i = 0; i < charsRandomWord.length; i++) {
        if (charsRandomWord[i] == charsInsertedWord[i]) {
          gridSelected[attempt][i] = charsInsertedWord[i];
          if (attempt < (gridSelected.length - 1)) {
            gridSelected[attempt + 1][i] = charsInsertedWord[i];
          }

        } else {
          gridSelected[attempt][i] = charsInsertedWord[i];
          if (attempt < (gridSelected.length - 1)) {
            gridSelected[attempt + 1][i] = '.';
          }
        }
      }

      if (attempt == (gridSelected.length - 1)) {
        loss = true;
        gridSelected.push(charsRandomWord);
      }

      drawRow(gridSelected, attempt, wrongLength, victory, charsInsertedWord, loss);
    }
  } else {
    // lunghezza errata
    wrongLength = true;
    if (charsRandomWord.length < charsInsertedWord.length) {
      gridSelected[attempt] = charsInsertedWord.slice(0, gridSelected[attempt].length);

    } else {
      arr = [...".".repeat(gridSelected[attempt].length - charsInsertedWord.length).split("")].map(String);
      gridSelected[attempt] = charsInsertedWord.concat(...arr);
    }
    if (attempt < (gridSelected.length - 1)) {
      arr = [...".".repeat(gridSelected[attempt].length - 1).split("")].map(String);
      const firstChar = [charsRandomWord[0]]
      gridSelected[attempt + 1] = firstChar.concat(...arr);
    }
    if (attempt == (gridSelected.length - 1)) {
      loss = true;
      gridSelected.push(charsRandomWord);
    }
    drawRow(gridSelected, attempt, wrongLength, victory, charsInsertedWord, loss);
  }

}

//Funzione che controlla se i due array parola inserita e parola estratta sono uguali

function compareTwoArrays(charsWordRandom, charsWordInserted) {

  return charsWordRandom.every((element, index) => {
    return element === charsWordInserted[index]
  });
}

//Funzione di avanzammento progressBar

function moveBar() {
  progressBar.style.width = 100 + '%';
  clearInterval(interval);

  let width = 100;
  let counter = 1;

  interval = setInterval(frame, 1000);

  function frame() {
    if (counter == 10) {
      wrongChars = [];
      clearInterval(interval);
      progressBar.style.width = 0;
      console.log(tentativo);
      selectArray(tentativo);
      tentativo++
      input.value = '';
      if (victory !== true && loss !== true) {
        moveBar();
      }

    } else {
      if (victory !== true && loss !== true) {
        counter++
        width -= 10;
        progressBar.style.width = width + '%';
      }
    }
  }
}

//EVENTI

next_word_btn.addEventListener('click', function () {
  console.log(words);
  grid.removeAttribute("style");
  wrongChars = [];
  tentativo = 0;
  victory = false;
  loss = false;
  next_word_btn.classList.add('hidden');
  randomWord(words);

});

match_btn.addEventListener('click', function () {
  wrongChars = [];
  moveBar();
  console.log(input.value);
  if (input.value == '') {
    return false;
  } else {
    selectArray(tentativo);
    tentativo++
    input.value = '';
  }
});

input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    match_btn.click();
  }
});

