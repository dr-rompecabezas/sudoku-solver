const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  // #1 
  test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function (done) {
    chai.request(server)
      .post('/api/solve')
      .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.solution, '769235418851496372432178956174569283395842761628713549283657194516924837947381625')
        done();
      });
  })
  // #2 
  test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function (done) {
    chai.request(server)
      .post('/api/solve')
      .send({ puzzle: '.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
        done();
      });
  })
  // #3 
  test('Solve a puzzle with invalid characters: POST request to /api/solve', function (done) {
    chai.request(server)
      .post('/api/solve')
      .send({ puzzle: 'x.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid characters in puzzle')
        done();
      });
  })
  // #4 
  test('Solve a puzzle with incorrect length: POST request to /api/solve', function (done) {
    chai.request(server)
      .post('/api/solve')
      .send({ puzzle: '...9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
        done();
      });
  })
  // #5
  test('Solve a puzzle that cannot be solved: POST request to /api/solve', function (done) {
    chai.request(server)
      .post('/api/solve')
      .send({ puzzle: '999..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Puzzle cannot be solved')
        done();
      });
  })
  // #6 
  test('Check a puzzle placement with all fields: POST request to /api/check', function (done) {
    chai.request(server)
      .post('/api/check')
      .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', coordinate: 'A1', value: 7 })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.valid, true)
        done();
      });
  })
  // #7 
  test('Check a puzzle placement with single placement conflict: POST request to /api/check', function (done) {
    chai.request(server)
      .post('/api/check')
      .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', coordinate: 'A1', value: 2 })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.valid, false)
        assert.include(res.body.conflict, 'region')
        done();
      });
  })
  // #8 
  test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function (done) {
    chai.request(server)
      .post('/api/check')
      .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', coordinate: 'A1', value: 1 })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.valid, false)
        assert.include(res.body.conflict, 'row')
        assert.include(res.body.conflict, 'column')
        done();
      });
  })
  // #9 Check a puzzle placement with all placement conflicts: POST request to /api/check
  test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function (done) {
    chai.request(server)
      .post('/api/check')
      .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', coordinate: 'A1', value: 5 })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.valid, false)
        assert.include(res.body.conflict, 'row')
        assert.include(res.body.conflict, 'column')
        assert.include(res.body.conflict, 'region')
        done();
      });
  })
  // #10 C
  test('heck a puzzle placement with missing required fields: POST request to /api/check', function (done) {
    chai.request(server)
      .post('/api/check')
      .send({ coordinate: 'A1', value: 5 })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field(s) missing')
        done();
      });
  })
  // #11 
  test('Check a puzzle placement with invalid characters: POST request to /api/check', function (done) {
    chai.request(server)
      .post('/api/check')
      .send({ puzzle: 'x.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', coordinate: 'A1', value: 5 })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid characters in puzzle')
        done();
      });
  })
  // #12 
  test('Check a puzzle placement with incorrect length: POST request to /api/check', function (done) {
    chai.request(server)
      .post('/api/check')
      .send({ puzzle: '9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', coordinate: 'A1', value: 5 })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
        done();
      });
  })
  // #13 
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function (done) {
    chai.request(server)
      .post('/api/check')
      .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', coordinate: 'X1', value: 5 })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid coordinate')
        done();
      });
  })
  // #14 
  test('Check a puzzle placement with invalid placement value: POST request to /api/check', function (done) {
    chai.request(server)
      .post('/api/check')
      .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', coordinate: 'A1', value: 'x' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid value')
        done();
      });
  })

});

