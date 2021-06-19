'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();


  app.route('/api/check')
    .post((req, res) => {

      if (!req.body.puzzle || !req.body.coordinate || !req.body.value) {
        res.json({ error: 'Required field(s) missing' })
        return
      }

      const puzzleString = req.body.puzzle
      const coord = req.body.coordinate.toUpperCase()
      const row = coord.charAt(0)
      const column = coord.charAt(1)
      const value = req.body.value.toString()

      if (row.charCodeAt(0) < 65 
          || row.charCodeAt(0) > 73 
          || column < 1 
          || coord.length > 2) {
        res.json({ error: 'Invalid coordinate' })
        return
      }

      let regex = /[1-9]/
      if (!regex.test(value)) {
        res.json({ error: 'Invalid value' })
        return
      }

      let validate = solver.validate(puzzleString)

      if (validate.error !== 'valid') {
        res.json(validate)
      } else if (validate.error === 'valid') {

        let valueIndex = row.charCodeAt(0) + 7;
        valueIndex = valueIndex % 9 * 9;
        valueIndex = valueIndex + parseInt(column) - 1;
        let newPuzzleString = puzzleString

        if (newPuzzleString.charAt(valueIndex) === value) {
          let splitPuzzle = newPuzzleString.split('')
          splitPuzzle[valueIndex] = '.'
          newPuzzleString = splitPuzzle.join('')
        }

        let rowCheck = solver.checkRowPlacement(newPuzzleString, row, value)
        let columnCheck = solver.checkColPlacement(newPuzzleString, column, value)
        let regionCheck = solver.checkRegionPlacement(newPuzzleString, coord, value)

        let response = { valid: false, conflict: [] }

        if (!rowCheck) {
          response.conflict.push('row')
        }
        if (!columnCheck) {
          response.conflict.push('column')
        }
        if (!regionCheck) {
          response.conflict.push('region')
        }

        if (response.conflict.length === 0) {
          res.json({ valid: true })
        } else {
          res.json(response)
        }
      }
    });

  app.route('/api/solve')
    .post((req, res) => {

      if (!req.body.puzzle) {
        res.json({ error: 'Required field missing' })
        return
      }

      const puzzleString = req.body.puzzle
      let validate = solver.validate(puzzleString)

      if (validate.error !== 'valid') {
        res.json(validate)
      } else if (validate.error === 'valid') {
        let solution = solver.solve(puzzleString)
        if (solution.error === 'Puzzle cannot be solved') {
          res.json(solution)
        } else {
          res.json({ solution })
        }
      }
    });
};
