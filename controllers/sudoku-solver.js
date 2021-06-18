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

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {

  }
}

module.exports = SudokuSolver;

