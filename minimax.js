


let depth = 2; // how many columns in terms of index

let scores = {
    red: Infinity,
    yellow: -Infinity
}; //we make AI who is the red player the maximizing player

function aiMove(){
    let bestScore = -Infinity;
    let move;

for(let j=0;j<7;j++){
    let tempCell = getFirstOpenCellForColumn(j); //is the spot in the column available?
    if(tempCell == null){continue;}
    let tempI = getCellLocation(tempCell)[0];
    if(tempI >=0){
        if(move == null){
            move = j;
            console.log(move)
    }

rows[tempI][j].classList.add("red");
    let score = minimax(rows,depth,false,1,-Infinity,Infinity);
    // console.log("################################")
    // console.log("################################")
    // console.log("################################")
    // console.log("################################")
    // console.log("out of minimax")
    rows[tempI][j].classList.remove("red");

    if(score > bestScore){
        bestScore = score;
        move = j;
        }
    }
}



return move;

}


function countHorizontal(startRow,startCol,endRow,endCol,player){
    let pieces = 0;
    if (endRow >= 5){endRow = 5};
    if(endCol>=6){endCol = 6};
for(let i=startRow;i<=endRow;i++){
        for(let j=startCol;j<=endCol;j++){
if(player==0 && !getColorOfCell(rows[startRow][startCol])){
    pieces+=1
}else{
    if(getClassListArray(rows[i][j]).includes(player)){
                pieces += 1;
            }
}}
}

return pieces;
}



function countDiagonal(startRow,startCol,direction,player){

    let pieces = 0;

for(let x=0;x<4;x++){
    if(direction==1){
        if(startRow + x < 6 && startCol + x < 7){
            if(player==0 && !getColorOfCell(rows[startRow + x][startCol
                + x])){
                pieces+=1
            } else{
                if(getClassListArray(rows[startRow+x][startCol+x]).includes(player)){
                pieces += 1;
            }
        }
    } else {
        if (startRow + x < 6 && startCol - x < 7 && startCol - x > 0){
            if(player==0 && !getColorOfCell(rows[startRow + x][startCol
                - x])){
                pieces+=1
            } else {
                if(getClassListArray(rows[startRow+x][startCol-x]).includes(player)){
                pieces += 1;
            }
        }
    }
}
}
}
return pieces;

}

function score_position(player,player2,nr_moves){
    let score = 0;

    for(let i=5;i>=1;i--){
        for(let j=0;j<7;j++){
         if ((countHorizontal(i, j, i + 3, j, player) == 3 && countHorizontal(i, j, i + 3, j, 0) == 1) || (countHorizontal(i, j, i, j + 3, player) == 3 && countHorizontal(i, j, i, j + 3, 0) == 1) ||
(countDiagonal(i, j, -1, player) == 3 && countDiagonal(i, j, -1, 0) == 1) ||
        (countDiagonal(i, j, 1, player) == 3 && countDiagonal(i, j, 1, 0) == 1))

{
        score += 1000;
      }

      if ((countHorizontal(i, j, i + 3, j, player) == 2 && countHorizontal(i, j, i + 3, j, 0) == 2) || (countHorizontal(i, j, i, j + 3, player) == 2 && countHorizontal(i, j, i, j + 3, 0) == 2) ||
 (countDiagonal(i, j, -1, player) == 2 && countDiagonal(i, j, -1, 0) == 2) ||
        (countDiagonal(i, j, 1, player) == 2 && countDiagonal(i, j, 1, 0) == 2)) {
        score += 10;
      }

      if ((countHorizontal(i, j, i + 3, j, player) == 1 && countHorizontal(i, j, i + 3, j, 0) == 3) || (countHorizontal(i, j, i, j + 4, player) == 1 && countHorizontal(i, j, i, j + 4, 0) == 3) ||
          (countDiagonal(i, j, -1, player) == 1 && countDiagonal(i, j, -1, 0) == 3)||
        (countDiagonal(i, j, 1, player) == 1 && countDiagonal(i, j, 1, 0) == 3)) {
        score += 1;

      }

      if ((countHorizontal(i, j, i + 3, j, player2) == 3 && countHorizontal(i, j, i + 3, j, 0) == 1) || (countHorizontal(i, j, i, j + 3, player2) == 3 && countHorizontal(i, j, i, j + 3, 0) == 1) ||
          (countDiagonal(i, j, -1, player2) == 3 && countDiagonal(i, j, -1, 0) == 1) ||
        (countDiagonal(i, j, 1, player2) == 3 && countDiagonal(i, j, 1, 0) == 1)) {
        score -= 1000;

      }

      if ((countHorizontal(i, j, i + 3, j, player2) == 2 && countHorizontal(i, j, i + 3, j, 0) == 2) || (countHorizontal(i, j, i, j + 3, player2) == 2 && countHorizontal(i, j, i, j + 3, 0) == 2) ||
          (countDiagonal(i, j, -1, player2) == 2 && countDiagonal(i, j, -1, 0) == 2) ||
        (countDiagonal(i, j, 1, player2) == 2 && countDiagonal(i, j, 1, 0) == 2)) {
        score -= 10;
      }

      if ((countHorizontal(i, j, i + 3, j, player2) == 1 && countHorizontal(i, j, i + 3, j, 0) == 3) || (countHorizontal(i, j, i, j + 3, player2) == 1 && countHorizontal(i, j, i, j + 3, 0) == 3) ||
          (countDiagonal(i, j, -1, player2) == 1 && countDiagonal(i, j, -1, 0) == 3) ||
        (countDiagonal(i, j, 1, player2) == 1 && countDiagonal(i, j, 1, 0) == 3)) {
        score -= 1;

      }
    }
  }

  return score
}


function minimax(board,depth,isMaximizing,nr_moves,alpha,beta){
 let result = getWinner();
  if (result == "yellow" || result == "red") {
    console.log("someone won")
    return scores[result] - 20 * nr_moves; //nr_moves is the no.of remaining moves. we set this to reduce the score when it takes more moves to win.
  }

  if (result == -1) {
    console.log("nobody won")
    return 0 - 50 * nr_moves;
  }

  if (depth == 0) {
    console.log("reach base case")
    return score_position("red", "yellow", nr_moves);
  }

if (isMaximizing) {

    let bestScore = -Infinity;
    for (let j = 0; j < 7; j++) {
      let tempCell = getFirstOpenCellForColumn(j);
if(tempCell == null){continue;}
      let tempI = getCellLocation(tempCell)[0];
      if (tempI < 6 && tempI > -1) {

        rows[tempI][j].classList.add("red");

        let score = minimax(rows, depth - 1, false, nr_moves + 1, alpha, beta);

        rows[tempI][j].classList.remove("red");

        bestScore = Math.max(score, bestScore);

        alpha = Math.max(bestScore, alpha);
        if (alpha >= beta) {
          break
        }


      }
    }

    return bestScore;

  } else {

    let bestScore = Infinity;
    for (let j = 0; j < 7; j++) {
      // Is the spot available?
      let tempCell = getFirstOpenCellForColumn(j);
      if(tempCell == null){continue;}
      let tempI = getCellLocation(tempCell)[0];

      if (tempI < 6 && tempI > -1) {

        rows[tempI][j].classList.add("yellow");

        let score = minimax(rows, depth - 1, true, nr_moves + 1, alpha, beta);

        rows[tempI][j].classList.remove("yellow");

        bestScore = Math.min(score, bestScore);

        beta = Math.min(bestScore, beta);
        if (alpha >= beta) {
          break
        }
      }
    }

    return bestScore;
  }

}

function p(i,j){
    if (i<0 || j<0 || i >= 6 || j >= 7){
        return null;
    } else {
        if ((getColorOfCell(rows[i][j])) === "red"){
            return "red";
        } if ((getColorOfCell(rows[i][j])) === "yellow"){
            return "yellow";
        } if ((getColorOfCell(rows[i][j])) === null){
            return null;
        }
    };
}


function getWinner(){ //loops through rows, columns, diagonals, etc for win condition
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (p(i,j) != null && p(i,j) == p(i,j+1) && p(i,j) == p(i,j+2) && p(i,j) == p(i,j+3)) {
        return p(i,j);
      }

      if (p(i,j) != null && p(i,j) == p(i+1,j) && p(i,j) == p(i+2,j) && p(i,j) == p(i+3,j)) {
        return p(i,j);
      }

      for (let d = -1; d <= 1; d += 2) {
        if (p(i,j) != null && p(i,j) == p(i+1*d,j+1) && p(i,j) == p(i+2*d,j+2) && p(i,j) == p(i+3*d,j+3)) {
          return p(i,j);
        }
      }

    }
}


  for (let i = 0; i < 6; i++){
    for (let j = 0; j < 7; j++){
      if (p(i,j) == null) {return 0};
      return -1;
    }
   //tie
}
 }