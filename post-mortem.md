## Approach and Process

1. What in my process and approach to this project would I do differently next time?

  * Be more detailed in the planning and pre code phase. For example, create wireframes of my app layout to get a clearer picture on positioning the divs and styling the app. Be more clear on the app features. For example, set a few features to be added to my base game and stick to it instead of continuously adding just to make the app more "cool".

2. What in my process and approach to this project went well that I would repeat next time?

  * Breaking down the project into small parts and tackling them one at a time. Reading up on game mechanics and applicable algorithms, ensuring that I am able to implement them through writing out the pseudo-code and define the tech stacks needed, before starting to write a single line of code.

## Code and Code Design

1. What in my code and program design in the project would I do differently next time?

  * Definitely using an array as the game board to store dynamic data rather than creating a board using divs and applying DOM manipulation on them. Arrays are much more versatile data structures in handling dynamic data as compared to elements since running an element selector requires loops more often than not which can affect code performance for algorithms that run the element selector hundreds or even thousands of times.

```javascript
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
```

2. What in my code and program design in the project went well? Is there anything I would do the same next time?

  * Wrote comments to explain every single functions or variables declared and their purpose. This made reference to helper functions far easier and hence allow me to reuse helper functions without repeating myself by redeclaring them just for convenience. It also ensured that I fully understood how my game was built upon, that the logic of my game was reasonable and I was able to differentiate between essential functions and ones that could be omitted.

```javascript
const getFirstOpenCellForColumn = (colIndex) => {
const column = columns[colIndex]; // loop through columns array and select the column of index: colIndex
const columnWithoutTop = column.slice(0,column.length-1); // remove the top row cell (the hover peg column) from the column.
// we loop through each cell in the column excluding the top row. We then iterate through the classList to find if it has a yellow or red class. So any cell without both means its empty and it will be returned.
for(let i=columnWithoutTop.length-1;i>=0;i--){
    const classList = getClassListArray(rows[i][colIndex]);
    if(!classList.includes("yellow") && !classList.includes("red")) {
        return rows[i][colIndex];
    }
}
return null; //if no empty cells are found for this column, we return null;
}
```



## WDI Unit 1 Post Mortem

1. What habits did I use during this unit that helped me?

  * Always write pseudo code before starting any assignments
  * Committing to Git for any changes made to my app to ensure I am able to restore my data in case anything happens.
  * Dividing my assignments into smaller parts and tackle them in a step by step approach.
  * Coding along with my instructor to keep things interactive and also clear any doubts I have during lessons.

2. What habits did I have during this unit that I can improve on?

  * Could definitely improve on my indentations. I use the "spacebar" key too often to create empty space to write additional code but this also results in disrupting the initial indentations.
  * Take more frequent breaks while coding for long periods. I usually find myself coding for too many hours in a stretch without taking a break and this sometimes cause me to be inefficient towards the end of the session due to fatigue.

3. How is the overall level of the course during this unit? (instruction, course materials, etc.)

  * It is fast at certain sections, but overall I still find it manageable, though I have to admit the assignments can be quite challenging at times.
  * Course materials are alright, as further "googling" or asking my instructors for help usually clear my doubts.





