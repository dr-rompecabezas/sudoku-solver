'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();


  app.route('/api/check')
    .post((req, res) => {
      const puzzleString = req.body.puzzle
      const row = req.body.coordinate.charAt(0)
      const column = req.body.coordinate.charAt(1)
      const value = req.body.value

      let validate = solver.validate(puzzleString)

      if (!validate) {
        // { "error": "Invalid characters in puzzle" }
        // { "error": "Expected puzzle to be 81 characters long" }
        res.json({ error: "Expected puzzle to be 81 characters long" })
      } else {

        let rowCheck = solver.checkRowPlacement(puzzleString, row, value)
        let colCheck = solver.checkColPlacement(puzzleString, column, value)

        let response = { valid: false, conflict: [] }

        if (!rowCheck) {
          response.conflict.push('row')
        }
        if (!colCheck) {
          response.conflict.push('column')
        }

        if (response.conflict.length === 0) {
          res.json({ valid: true })
        } else {
          res.json(response)
        }
      }

      // solver.checkColPlacement (puzzleString, row, column, value)
      // solver.checkColPlacement (puzzleString, row, column, value)
      // solver.checkRegionPlacement (puzzleString, row, column, value)

      // sample json responses expected by index.js fetch:
      // { "valid": false, "conflict": [ "row", "column", "region" ] }
      // { "valid": false, "conflict": [ "row", "column" ] }
      // { "valid": false, "conflict": [ "region" ] }
      // { "valid": false, "conflict": [ "column", "region" ] }
      // { "valid": false, "conflict": [ "column" ] }
      // { "valid": true }
    });

  app.route('/api/solve')
    .post((req, res) => {
      // const puzzleString = req.body.puzzle
      // validate (puzzleString) => if puzzleString.length !== 81:
      // return json error
      // { "error": "Expected puzzle to be 81 characters long" }
      // { "error": "Puzzle cannot be solved" }

      // solver.solve(puzzleString)
      // response with json:
      // { solution: puzzleString }
    });
};
