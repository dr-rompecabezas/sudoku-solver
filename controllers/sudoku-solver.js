class SudokuSolver {

  validate(puzzleString) {
    // { "error": "Invalid characters in puzzle" }
    // { "error": "Expected puzzle to be 81 characters long" }
    if (puzzleString.length !== 81) {
      return false
    } else {
      return true
    }
  }

  checkRowPlacement(puzzleString, row, value) {
    row.toUpperCase()
    let rowIndex = row.charCodeAt(0) + 7
    rowIndex = (rowIndex % 9) * 9
    let n = rowIndex + 9
    value = value.toString()

    for (let i = rowIndex; i < n; i++) {
      if (puzzleString.charAt(i) === value) {
        return false
      }
    }
    return true
  }

  checkColPlacement(puzzleString, column, value) {
    column = +column
    let colIndex = column - 1
    let len = puzzleString.length
    value = value.toString()

    for (let i = colIndex; i < len; i += 9) {
      if (puzzleString.charAt(i) === value) {
        return false
      }
    }
    return true
  }

  checkRegionPlacement(puzzleString, coord, value) {

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

  }
}

module.exports = SudokuSolver;

