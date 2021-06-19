class SudokuSolver {

  validate(puzzleString) {
    
    let error = {error: 'valid'}
    let regex = /[1-9|\.]{81}/

    if (puzzleString.length !== 81) {
      error.error = "Expected puzzle to be 81 characters long"
    } else if (!regex.test(puzzleString)) {
      error.error = "Invalid characters in puzzle"
    }
    return error
  }

  checkRowPlacement(puzzleString, row, value) {
    
    value = value.toString()
    row = row.toUpperCase()
    let rowIndex = row.charCodeAt(0) + 7
    rowIndex = (rowIndex % 9) * 9
    let n = rowIndex + 9
    

    for (let i = rowIndex; i < n; i++) {
      // console.log('value: ' + value + '; index: ' + i)
      if (puzzleString.charAt(i) === value) {
        return false
      }
    }
    return true
  }

  checkColPlacement(puzzleString, column, value) {
    
    value = value.toString()
    let colIndex = column - 1
    let len = puzzleString.length

    for (let i = colIndex; i < len; i += 9) {
      if (puzzleString.charAt(i) === value) {
        return false
      }
    }
    return true
  }

  checkRegionPlacement(puzzleString, coord, value) {

    coord = coord.toUpperCase()
    value = value.toString()

    let regionChars = [
      [0, 1, 2, 9, 10, 11, 18, 19, 20],
      [3, 4, 5, 12, 13, 14, 21, 22, 23],
      [6, 7, 8, 15, 16, 17, 24, 25, 26],
      [27, 28, 29, 36, 37, 38, 45, 46, 47],
      [30, 31, 32, 39, 40, 41, 48, 49, 50],
      [33, 34, 35, 42, 43, 44, 51, 52, 53],
      [54, 55, 56, 63, 64, 65, 72, 73, 74],
      [57, 58, 59, 66, 67, 68, 75, 76, 77],
      [60, 61, 62, 69, 70, 71, 78, 79, 80]
    ];
    
    let regionCoords = [
      ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"],
      ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"],
      ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"],
      ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"],
      ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"],
      ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"],
      ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"],
      ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"],
      ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]
    ];
    
    let regionIndex;
    
    for (let i = 0; i < 9; i++) {
      if (regionCoords[i].includes(coord)) {
        regionIndex = i
      }
    }
    
    for (let i = 0; i < 9; i++) {
      if (puzzleString.charAt(regionChars[regionIndex][i]) === value) {
        return false
      }
    }
    return true
  }

  solve(puzzleString) {

    let splitPuzzle = puzzleString.split('')
    let solution = splitPuzzle.join('')

    let update = (index, value) => {
      splitPuzzle[index] = value.toString()
      solution = splitPuzzle.join('')
    }

    let validCount = 0;
    let validValue = [];
    let totalSolved = 0;

    while (splitPuzzle.includes('.')) {
      for (let i = 0; i < 81; i++) {
        let row = String.fromCharCode('A'.charCodeAt(0) + Math.floor(i / 9))
        let column = (i % 9) + 1
        let coord = '' + row + column
  
        if (solution.charAt(i) === ".") {
          
          for (let value = 1; value < 10; value++) {
  
            let rowCheck = this.checkRowPlacement(solution, row, value)
            let columnCheck = this.checkColPlacement(solution, column, value)
            let regionCheck = this.checkRegionPlacement(solution, coord, value)
  
            // console.log(coord + ' index: ' + i + '; value: ' + value + '; rowCheck: ' + rowCheck + '; colCheck: ' + columnCheck + '; regionCheck: ' + regionCheck)
  
            if (rowCheck && columnCheck && regionCheck) {
              
              validCount++
              validValue.push(value)
              // console.log(coord + ' index: ' + i + '; valid value: ' + value + '; validCount: ' + validCount)
            }
  
            if (value === 9 && validCount === 1) {
              // console.log('Update at coord ' + coord + ', index: ' + i + '; value: ' + validValue[0])
              update(i,validValue[0])
              totalSolved++
              validCount = 0
              validValue = []
            } else if (value === 9 && validCount > 1) {
              // console.log('Coordinate ' + coord + ' has ' + validCount + ' possible solutions: ' + validValue)
              validCount = 0
              validValue = []
            }
          }
        }
      }
      if (totalSolved === 0) {
        return {error: 'Puzzle cannot be solved'}
      } else {
        totalSolved = 0
      }
    }

    // console.log('solution string: ' + solution)
    return solution
  }
}

module.exports = SudokuSolver;

