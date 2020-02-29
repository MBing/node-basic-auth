const express = require('express');
const router = express.Router();
const passport = require('passport');
const ObjectID = require('mongodb').ObjectID;
const createError = require('http-errors');
const { loans } = require('../mappers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', async (req, res, next) => {
  const { db } = req.app.locals;
  const users = await db.collection('users').find().toArray();

  return res.send(users)
});

router.get('/books', async (req, res, next) => {
  const { db } = req.app.locals;
  const books = await db.collection('books').find().toArray();

  return res.send(books)
});

router.get('/librarians', async (req, res, next) => {
    const { db } = req.app.locals;
    const books = await db.collection('librarians').find().toArray();

    return res.send(books)
});

router.get('/loans',
    passport.authenticate('basic', {session: false}),
    async (req, res, next) => {
    const { db } = req.app.locals;
    const books = await db.collection('books').find().toArray();
    const users = await db.collection('users').find().toArray();
    const loansArr = await db.collection('loans').find().toArray();
    const mappedLoans = loans(loansArr, books, users);

    return res.send(mappedLoans);
});

router.delete('/loans/:loanId',
    passport.authenticate('basic', {session: false}),
    async (req, res, next) => {
    const { db } = req.app.locals;
    const { loanId } = req.params;
    // check if Id is valid
    if (!ObjectID.isValid(loanId)) {
        return next(createError(400));
    }
    const _id = ObjectID(loanId);
    const loans = db.collection('loans');
    const { lastErrorObject, ok, value } = await loans.findOneAndDelete({_id});

    if ( ok !== 1) {
        return next(createError(500));
    }

    return res.send(value);
});

module.exports = router;
