const {findByObjectId} = require('./db');

const loans = (loansArr = [], booksArr = [], usersArr = []) => {
    return loans.map(({_id, bookId, userId}) => {
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