const { findByObjectId } = require('./db');

const loans = (loansArr = [], books = [], users = []) => {
  return loansArr.map(({ _id, bookId, userId }) => {
    const book = findByObjectId(books)(bookId);
    const user = findByObjectId(users)(userId);

    return {
      _id,
      book,
      user,
    };
  });
};

module.exports = { loans };
