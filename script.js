
//grouping up the cells by rows and columns for easier manipulation.

// DOM Elements
const allCells = document.querySelectorAll('.cell:not(.row-top)');
const topCells = document.querySelectorAll('.cell.row-top');
const resetButton = document.querySelector('.reset');
const statusSpan = document.querySelector('.status');
const undoButton = document.querySelector('.undo');
let undoCell = [],undoCellColumn = [];
let aiScore;
let result;

// columns, arranged from bottom to top. to mimic the peg dropping down to the bottom most row first.
const column0 = [allCells[35], allCells[28], allCells[21], allCells[14], allCells[7], allCells[0], topCells[0]];
const column1 = [allCells[36], allCells[29], allCells[22], allCells[15], allCells[8], allCells[1], topCells[1]];
const column2 = [allCells[37], allCells[30], allCells[23], allCells[16], allCells[9], allCells[2], topCells[2]];
const column3 = [allCells[38], allCells[31], allCells[24], allCells[17], allCells[10], allCells[3], topCells[3]];
const column4 = [allCells[39], allCells[32], allCells[25], allCells[18], allCells[11], allCells[4], topCells[4]];
const column5 = [allCells[40], allCells[33], allCells[26], allCells[19], allCells[12], allCells[5], topCells[5]];
const column6 = [allCells[41], allCells[34], allCells[27], allCells[20], allCells[13], allCells[6], topCells[6]];
const columns = [column0, column1, column2, column3, column4, column5, column6];


// rows
const topRow = [topCells[0], topCells[1], topCells[2], topCells[3], topCells[4], topCells[5], topCells[6]];
const row0 = [allCells[0], allCells[1], allCells[2], allCells[3], allCells[4], allCells[5], allCells[6]];
const row1 = [allCells[7], allCells[8], allCells[9], allCells[10], allCells[11], allCells[12], allCells[13]];
const row2 = [allCells[14], allCells[15], allCells[16], allCells[17], allCells[18], allCells[19], allCells[20]];
const row3 = [allCells[21], allCells[22], allCells[23], allCells[24], allCells[25], allCells[26], allCells[27]];
const row4 = [allCells[28], allCells[29], allCells[30], allCells[31], allCells[32], allCells[33], allCells[34]];
const row5 = [allCells[35], allCells[36], allCells[37], allCells[38], allCells[39], allCells[40], allCells[41]];
const rows = [row0, row1, row2, row3, row4, row5, topRow];


//variables

let gameIsLive = true; //boolean to tell us if game is on. false when someone wins.
let yellowisNext = true; //yellow always goes first as per connect4 rules. true if yellow's turn. false if red's turn.


// functions

//create a function to retrieve class list of each element.
const getClassListArray = (cell) => {
    const classList = cell.classList;
    return [...classList];
}

//create a function to get cell location. i.e. the row and column index of each cell.
const getCellLocation = (cell) => {
     const classList = getClassListArray(cell); //find array of classlist within each element

     const rowClass = classList.find(className => className.includes("row")); //this is why we converted it to an array, so we can use iterators such as find. we use find to match any values in the classList array which includes the string "row".  note that find only returns the first match. but we only have one row class in each cell so its okay. if find cant find any matches it returns undefined.

     const colClass = classList.find(className => className.includes("col")); // repeat the same as above for columns;

     //however we are just getting the matches, we want the index instead.
     // e.g. you will get something like row-4 or col-4. you notice that it is always the 4th index character of the string, so we store these indexes in a new variable:
     const rowIndex = parseInt(rowClass[4],10);
     const colIndex = parseInt(colClass[4],10);

     //rmb since we are getting a string, we need to convert it to a number for easier execution of mathematical functions on it.
     //second argument of parseInt refers to the base. so regular numbers are of base 10.

return [rowIndex, colIndex];
}


const getFirstOpenCellForColumn = (colIndex) => {

const column = columns[colIndex]; // loop through columns array and select the column of index: colIndex

const columnWithoutTop = column.slice(0,column.length-1); // remove the top row cell (the hover peg column) from the column.


// we loop through each cell in the column excluding the top row. We then iterate through the classList to find if it has a yellow or red class. So any cell without both means its empty and it will be returned.
for(const cell of columnWithoutTop){
    const classList = getClassListArray(cell);
    if(!classList.includes("yellow") && !classList.includes("red")) {
        return cell;
    }
}
return null; //if no empty cells are found for this column, we return null;

}

const clearColorTop = (colIndex) => {
const topCell = topCells[colIndex];
topCell.classList.remove("yellow"); // remove class of yellow if exist or do nothing
topCell.classList.remove("red");// remove class of red if exist or do nothing. no need for conditional statements.
}


const getColorOfCell = (cell) => {
    const classList = getClassListArray(cell);
    if(classList.includes("yellow")) return "yellow";
    if(classList.includes("red")) return "red";
    return null;
}

const checkWinningCells = (cells) => {
    if (cells.length < 4) return false; //return false if not a winning combination

    gameIsLive = false;
    for(const cell of cells){
        cell.classList.add("win");
    } //set gameislive is false to end the game. add win class for css effects

    statusSpan.textContent = `${yellowisNext ? "Yellow" : "Red"} wins!`
    return true; //return true if there is a winning combination.
}


const checkStatusOfGame = (cell) => {

    const color = getColorOfCell(cell);

    if(!color) return; //once again null is a falsy value. so if there is no color class, it means the cell is empty and skip the rest of checking if there is a win condition and add the peg.

const [rowIndex,colIndex] = getCellLocation(cell); // we get the rowindex and colindex of the cell we are checking.

    //WIN CONDITION:

// CHECK HORIZONTALLY

//check on the left.
let winningCells = [cell]; //put the current cell inside first.

let rowToCheck = rowIndex;
let colToCheck = colIndex-1; //start by checking the column before it.

while(colToCheck >= 0){ //this is edge case 1. we limit to check till the left most column.
    const cellToCheck = rows[rowToCheck][colToCheck]; //this targets: the current col to check if there is a matching peg.
    if(getColorOfCell(cellToCheck)===color){

        winningCells.unshift(cellToCheck); //add to left of cell in the winningcells array each time there is a match
        colToCheck--;  // move on the the next col on the left.
    } else {
        break; //if its not then can we stop checking/adding to the winningCells array, so we can straight break the loop.
    }
}

//check on the right

colToCheck = colIndex + 1;

while(colToCheck <= 6){ //this is edge case 2. we limit to check till the right most column.
    const cellToCheck = rows[rowToCheck][colToCheck]; //this targets: the current col to check if there is a matching peg.
    if(getColorOfCell(cellToCheck)===color){ //same as above but now we add to the right instead.
        winningCells.push(cellToCheck);
        colToCheck++;
    } else {
        break; //if its not then can we stop checking/adding to the winningCells array, so we can straight break the loop.
    }
}

let isWinningCombo = checkWinningCells(winningCells);
if(isWinningCombo) {
if(color === "yellow"){
    aiScore = 2;
    return;
} if(color === "red"){
    aiScore = 1;
    return;
}
};

// CHECK VERTICALLY

//check on the top.
winningCells = [cell]; //put the current cell inside first.

rowToCheck = rowIndex - 1;
colToCheck = colIndex; //start by checking the column before it.

while(rowToCheck >= 0){ //this is edge case 3. we limit to check till the top most column.
    const cellToCheck = rows[rowToCheck][colToCheck]; //this targets: the current row to check if there is a matching peg.
    if(getColorOfCell(cellToCheck)===color){

        winningCells.unshift(cellToCheck); //add to left of cell in the winningCells array each time there is a match
        rowToCheck--;  // move on the the next row at the top.
    } else {
        break; //if its not then can we stop checking/adding to the winningCells array, so we can straight break the loop.
    }
}

//check the bottom.

rowToCheck = rowIndex + 1;

while(rowToCheck <= 5){ //this is edge case 4. we limit to check till the bottom most row
    const cellToCheck = rows[rowToCheck][colToCheck]; //this targets: the current row to check if there is a matching peg.
    if(getColorOfCell(cellToCheck)===color){ //same as above but now we add to the right instead.
        winningCells.push(cellToCheck);
        rowToCheck++;
    } else {
        break; //if its not then can we stop checking/adding to the winningCells array, so we can straight break the loop.
    }
}

isWinningCombo = checkWinningCells(winningCells);
if(isWinningCombo) {
if(color === "yellow"){
    aiScore = 2;
    return;
} if(color === "red"){
    aiScore = 1;
    return;
}
};



// CHECK DIAGONALLY

//check on the bottom left diagonal
winningCells = [cell]; //put the current cell inside first.
rowToCheck = rowIndex + 1;
colToCheck = colIndex - 1; //start going along bottom left diagonal

while(colToCheck >= 0 && rowToCheck <= 5){ //this is edge case 5. we limit to check till the left bottom corner of the board
    const cellToCheck = rows[rowToCheck][colToCheck]; //this targets: the current cell to check if there is a matching peg.
    if(getColorOfCell(cellToCheck)===color){
        winningCells.unshift(cellToCheck); //add to left of cell in the winningCells array each time there is a match
        rowToCheck++;
        colToCheck--;  // move on along the bottom left diagonal.
    } else {
        break; //if its not then can we stop checking/adding to the winningCells array, so we can straight break the loop.
    }
}

//check the upper right diagonal.

rowToCheck = rowIndex - 1;
colToCheck = colIndex + 1;
//start going along top right diagonal
while(colToCheck <= 6 && rowToCheck >= 0){ //this is edge case 6. we limit to check till the top right corner of the board
    const cellToCheck = rows[rowToCheck][colToCheck]; //this targets: the current cell to check if there is a matching peg.
    if(getColorOfCell(cellToCheck)===color){ //same as above but now we add to the right instead.
        winningCells.push(cellToCheck);
        rowToCheck--;
        colToCheck++; //move along the top right diagonal.
    } else {
        break; //if its not then can we stop checking/adding to the winningCells array, so we can straight break the loop.
    }
}

isWinningCombo = checkWinningCells(winningCells);
if(isWinningCombo) {
if(color === "yellow"){
    aiScore = 2;
    return;
} if(color === "red"){
    aiScore = 1;
    return;
}
};

//check on the top left diagonal
winningCells = [cell]; //put the current cell inside first.
rowToCheck = rowIndex - 1;
colToCheck = colIndex - 1; //move along top left diagonal

while(rowToCheck >= 0 && colToCheck >= 0){ //this is edge case 7. we limit to check till the top left corner of the board
    const cellToCheck = rows[rowToCheck][colToCheck]; //this targets: the current row to check if there is a matching peg.
    if(getColorOfCell(cellToCheck)===color){
        winningCells.unshift(cellToCheck); //add to left of cell in the winningCells array each time there is a match
        rowToCheck--;
        colToCheck--;  // move on along top left diagonal.
    } else {
        break; //if its not then can we stop checking/adding to the winningCells array, so we can straight break the loop.
    }
}

//check the bottom right diagonal.

rowToCheck = rowIndex + 1;
colToCheck = colIndex + 1;

while(colToCheck <= 5 && rowToCheck <= 6){ //this is edge case 8. we limit to check till the bottom right corner of the board
    const cellToCheck = rows[rowToCheck][colToCheck]; //this targets: the current cell to check if there is a matching peg.
    if(getColorOfCell(cellToCheck)===color){ //same as above but now we add to the right instead.
        winningCells.push(cellToCheck);
        rowToCheck++;
        colToCheck++; // we move downwards diagonally
    } else {
        break; //if its not then can we stop checking/adding to the winningCells array, so we can straight break the loop.
    }
}

isWinningCombo = checkWinningCells(winningCells);
if(isWinningCombo) {
if(color === "yellow"){
    aiScore = 2;
    return;
} if(color === "red"){
    aiScore = 1;
    return;
}
};


//check for tie
const rowsWithoutTop = rows.slice(0,rows.length-1);
for(const row of rowsWithoutTop){
    for(const cell of row){
        const classList = getClassListArray(cell);
        if(!classList.includes("yellow") && !classList.includes("red")){ //as long as there is an empty cell game has not ended and its not a tie.
            return
        }
    }
}
// if the above loop completes without returning, it means there is a tie. game ends in a tie!!!
gameisLive = false;
statusSpan.textContent = "Game is a tie!!"
aiScore = -1;

}


//Event Handlers

const handleCellMouseOver = (event) => {
//event refers to the mouseover event. so event.target gives you the exact cell you are mousing over.

if(!gameIsLive) return; //if game is not live. dont do anything.

const [rowIndex,colIndex] = getCellLocation(event.target); //de-structure it to get the individual indexes.

const topCell = topCells[colIndex]; // we want to select each of the top cells above the board for the hover over effect.

//if its yellow's turn, add yellow class to the selectedTopcell to show the hover effect.
if(yellowisNext){
    topCell.classList.add("yellow");
} else{ //else if its red's turn add the red class.
    topCell.classList.add("red");
}
}

const handleCellMouseOut = (event) => {
// when mouse is moved off the element with the listener attached / off one of its children, to ensure the yellow/red hover effect dont stick around when we move around.

const [rowIndex,colIndex] = getCellLocation(event.target); //de-structure it to get the individual indexes.

clearColorTop(colIndex);


}

const handleClick = (event) => {

if(!gameIsLive) return; //if game is not live. dont do anything.

const [rowIndex,colIndex] = getCellLocation(event.target);
undoCellColumn.push(colIndex);
const openCell = getFirstOpenCellForColumn(colIndex);
undoCell.push(openCell);

if (!openCell){ //if there is a return value, it means its truthy. null is a falsy value. so !openCell means the getFirstOpenCellForColumn function returns null.
    return; // dont do anything. just return and end the function and dont run the rest of the code.
}

// if (yellowisNext){
//     openCell.classList.add("yellow");
// } else if (!yellowisNext){
//     openCell.classList.add("red");
// }

//basically the below ternary operator summarizes the above statement. so its saying if yellowisNext is true, add "yellow", if false, add "red".

openCell.classList.add(yellowisNext ? "yellow" : "red");

// to check status of game. if there is a winner.  -> checkStatusOfGame(openCell); its openCell because you have to put in a peg into an empty cell to win.

checkStatusOfGame(openCell);

yellowisNext = !yellowisNext //flip to red's turn. not true = false.

clearColorTop(colIndex);

if(gameIsLive){ //only run the following if game is live!
const topCell = topCells[colIndex];
topCell.classList.add(yellowisNext ? "yellow" : "red"); //when we clear the color, we need to add back the respectively color if not the peg will just be empty.

}

// if(yellowisNext == false){
//     aiMove();
// }

}


// Adding eventListeners for our cells.

// for..in... gets the index of the array. for..of.. gets you the values. similar to obj.keys vs obj.values, we use const because we dont want the values to be overwritten. if it were to be then an error will be shown and we can evaluate our code.
for(const row of rows){
    for(const cell of row){
        cell.addEventListener("mouseover", handleCellMouseOver); //when mouse if moved onto the element
        cell.addEventListener("mouseout", handleCellMouseOut); // when mouse is moved off the element with the listener attached / off one of its children
        cell.addEventListener("click", handleClick); // when cell is click, the function handleClick is called.
    }
}


resetButton.addEventListener("click",()=>{

    for(const row of rows){
        for(const cell of row){
            cell.classList.remove("red");
            cell.classList.remove("yellow");
            cell.classList.remove("win");
        }
    }
    gameIsLive = true;
    yellowisNext = true;
    statusSpan.textContent = "";
});

undoButton.addEventListener("click",()=>{
    if(gameIsLive && undoCell.length > 0 && undoCellColumn.length > 0){
    undoCell[undoCell.length-1].classList.remove("yellow");
    undoCell[undoCell.length-1].classList.remove("red");
    clearColorTop(undoCellColumn[undoCellColumn.length-1]);
    undoCell.pop();
    undoCellColumn.pop();
    yellowisNext = !yellowisNext //flip to red's turn. not true = false.
}


})










