'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();


  app.route('/api/check')
    .post((req, res) => {

      if (!req.body.puzzle || !req.body.coordinate || !req.body.value) {
        res.json({ error: 'Required field(s) missing' })
      }

      const puzzleString = req.body.puzzle
      const coord = req.body.coordinate.toUpperCase()
      const row = coord.charAt(0)
      const column = coord.charAt(1)
      const value = req.body.value.toString()

      let validate = solver.validate(puzzleString)

      if (validate.error !== 'valid') {
        res.json(validate)
      } else if (validate.error === 'valid') {

        let rowCheck = solver.checkRowPlacement(puzzleString, row, value)
        let columnCheck = solver.checkColPlacement(puzzleString, column, value)
        let regionCheck = solver.checkRegionPlacement(puzzleString, coord, value)

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
          res.json({solution})
        }
      }
    });
};
