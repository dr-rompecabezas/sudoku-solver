const chai = require('chai');
const assert = chai.assert;

const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver = new SudokuSolver();

let puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
let invalidPuzzle = '999..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
let invalidChars = 'X.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
let wrongLength = '9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
let solution = '769235418851496372432178956174569283395842761628713549283657194516924837947381625'
let coordinate = 'A1'
let row = 'A'
let column = 1
let validValue = 7
let invalidValue = 5

suite('UnitTests', () => {

  // #1
  test('Logic handles a valid puzzle string of 81 characters', function () {
    assert.include(solver.validate(puzzle), { error: "valid" })
  })
  // #2 
  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function () {
    assert.include(solver.validate(invalidChars), { error: "Invalid characters in puzzle" })
  })
  // #3 
  test('Logic handles a puzzle string that is not 81 characters in length', function () {
    assert.include(solver.validate(wrongLength), { error: "Expected puzzle to be 81 characters long" })
  })
  // #4 
  test('Logic handles a valid row placement', function () {
    assert.isTrue(solver.checkRowPlacement(puzzle, row, validValue))
  })
  // #5 
  test('Logic handles an invalid row placement', function () {
    assert.isFalse(solver.checkRowPlacement(puzzle, row, invalidValue))
  })
  // #6 
  test('Logic handles a valid column placement', function () {
    assert.isTrue(solver.checkColPlacement(puzzle, column, validValue))
  })
  // #7 
  test('Logic handles an invalid column placement', function () {
    assert.isFalse(solver.checkColPlacement(puzzle, column, invalidValue))
  })
  // #8 
  test('Logic handles a valid region (3x3 grid) placement', function () {
    assert.isTrue(solver.checkRegionPlacement(puzzle, coordinate, validValue))
  })
  // #9 
  test('Logic handles an invalid region (3x3 grid) placement', function () {
    assert.isFalse(solver.checkRegionPlacement(puzzle, coordinate, invalidValue))
  })
  // #10
  test('Valid puzzle strings pass the solver', function () {
    assert.notInclude(solver.solve(puzzle), { error: 'Puzzle cannot be solved' })
  })
  // #11
  test('Invalid puzzle strings fail the solver', function () {
    assert.include(solver.solve(invalidPuzzle), { error: 'Puzzle cannot be solved' })
  })
  // #12 
  test('Solver returns the the expected solution for an incomplete puzzle', function () {
    assert.equal(solver.solve(puzzle), solution)
  })

});
