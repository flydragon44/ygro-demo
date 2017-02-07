require('rootpath')();
const path = require('path');
const express = require('express');
const router = express.Router();
const db = require('server/database');
const alasql = require('alasql');

router.get('/transaction-event', function(req, res) {
  const { transactionEvent, transactionDetail } = db;
  const queryString = 'SELECT b.* FROM ? a INNER JOIN ? b using transactionDetailId where a.status = "new"';
  const result = alasql(queryString, [transactionEvent, transactionDetail]);
  res.send(result);
});

module.exports = router;
