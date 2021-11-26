
// L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, 
// in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.

const playButton = document.getElementById('play');
playButton.addEventListener('click', startGame);

// Funzione principale del gioco
function startGame() {
  // Opzioni
  const bombsNumber = 16;
  // Nascondo la scritta introduttiva
  const introText = document.getElementById('text');
  introText.classList.add('hidden');
  // Faccio apparire la griglia
  const mainGrid = document.getElementById('grid');
  mainGrid.classList.remove('hidden');
  // Nascondo il messaggio finale
  mainGrid.innerHTML = '';
  document.getElementById('final-message').classList.add('hidden');

  // Scelta del giocatore
  const levelSelect = parseInt( document.getElementById('levels').value );
  let maxGridNumber;
  let gridItemDimension;
  if( levelSelect === 1 ) {
    maxGridNumber = 100;
    gridItemDimension = 10;
  } else if ( levelSelect === 2 ) {
    maxGridNumber = 81;
    gridItemDimension = 9;
  } else if ( levelSelect === 3 ) {
    maxGridNumber = 49;
    gridItemDimension = 7;
  };

  // Genero le bombe
  const bombsArray = generateBombs(maxGridNumber, bombsNumber);
  console.log(bombsArray);
  // Calcolo il numero massimo di tentavivi dopo il quale il giocatore ha vinto
  const maxAttempts = maxGridNumber - bombsArray.length;
  // Creo un array vuoto che contiene i numeri scelti dal giocatore
  const rightAttemptsArray = [];

  // Creo un determinato numero di 'cells' in base al livello selezionato
  for( let i = 1; i <= maxGridNumber; i++ ) {
  
  const newGeneratedCell = generateGridItem(i, gridItemDimension);

  newGeneratedCell.addEventListener('click', handleCellClick);

  mainGrid.appendChild(newGeneratedCell);
  };

// Funzioni //
function handleCellClick() {
  // Leggo il numero della cella
  const selectedNumber = parseInt( this.querySelector('span').textContent );

  // Se il numero è incluso dell'array di bombe,
  // la cella diventa rossa e il gioco termina
  if( bombsArray.includes(selectedNumber) ) {
    this.classList.add('bomb');
    endGame('lose');
    } else {
    // altrimenti la cella diventa celeste e non più selezionabile
    this.classList.add('selected');
    this.style.pointerEvents = 'none';
    // Il numero selezionato viene aggiunto all'array
    // che contiene i numeri scelti dal giocatore
    rightAttemptsArray.push(selectedNumber);
    console.log(rightAttemptsArray);

    // Se la lunghezza dell'array dei numeri selezionati
    // è maggiore o uguale al numero massimo di tentativi, il gioco termina
    if( rightAttemptsArray.length >= maxAttempts ) {
      endGame('win');
    };
  };
};

  // Parte finale del gioco //
  // winOrLose: 'win' se il giocatore ha vinto, 'lose' se ha perso
  function endGame(winOrLose) {
    let finalMessage;
    if( winOrLose === 'win' ) {
      // Se ha vinto visualizzerà il messaggio 'Hai vinto'
      finalMessage = 'Hai vinto!';
    } else {
      // Se ha perso visualizzerà il messaggio 'Hai perso', 
      // inclusivo del numero di tentativi esatti
      finalMessage = 'Hai perso! Hai totalizzato ' + rightAttemptsArray.length + ' tentativi esatti.';
    };

    // Mostro il messaggio finale
    const finalMessageContainer = document.getElementById('final-message');
    finalMessageContainer.innerHTML = finalMessage;
    finalMessageContainer.classList.remove('hidden');

    // Rendo tutte le celle non più selezionabili
    const allCells = document.getElementsByClassName('square');
    for( let i = 0; i < allCells.length; i++ ) {
      const thisCell = allCells[i];
      thisCell.style.pointerEvents = "none";
    };
  };
};

// Funzioni //

// Genero un array di bombe da 1 a x
// maxRangeNumber: numero massimo range di bombe
// numberOfBombs: numero di elementi nell'array

// return: array completo con le bombe
function generateBombs(maxRangeNumber, numberOfBombs) {
  // Finché l'array non ha numberOfBombs elementi
  // genero un numero random tra 1 e maxRangeNumber
  // e se l'elemento non è gia presente nell'array lo pusho
  const arrayOfBombs = [];
  while( arrayOfBombs.length < numberOfBombs ) {
    const randomNumber = getRndInteger(1, maxRangeNumber);

    if(!arrayOfBombs.includes(randomNumber)) {
      arrayOfBombs.push(randomNumber);
    };
  };

  return arrayOfBombs;
};

// Genero un nuovo 'cells' per la griglia
// innerNumber: numero che compare all'interno della cella
// cellDimension: dimensione della cella

// return: l'elemento è pronto per essere appeso alla griglia
function generateGridItem(innerNumber, cellDimension) {
  // Creo un nuovo div
  const newCell = document.createElement('div');
  // Aggiungo la classe 'cells'
  newCell.classList.add('cells');
  // Popolo la cella con lo span col numero
  newCell.innerHTML = `<span>${innerNumber}</span>`;
  // Width e height vengono impostate in base al livello scelto dal giocatore
  newCell.style.width = `calc(100% / ${cellDimension})`;
  newCell.style.height = `calc(100% / ${cellDimension})`;

  return newCell;
};

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};