const debug = require('debug')('myapp:mongodb');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const { mongodb: mongoConfig } = require('./config');
const createSchema = async db => {
    debug('ensuring schema');

    // check if there are already collections, otherwise skip this
    try {

        await Promise.all([
            db.dropCollection('books'),
            db.dropCollection('users'),
            db.dropCollection('loans'),
        ]);
    } catch (e) {
        debug('One or more collections don\'t exist');
    }

    await Promise.all([
        db.createCollection('books'),
        db.createCollection('users'),
        db.createCollection('loans'),
    ]);
};

const addObjectID = list => {
    return list.map(item => {
        return Object.assign({}, item, { _id: ObjectID() });
    });
};

const findById = list => id => list.find(item => item.id === id);
const findByObjectId = list => id => list.find(item => item._id.equals(id));

const createData = async db => {
    debug('creating dummy data');

    const booksCollection = db.collection('books');
    const usersCollection = db.collection('users');
    const loansCollection = db.collection('loans');

    let {books, users, loans} = require('./data');

    books = addObjectID(books);
    users = addObjectID(users);

    loans = loans.map(({bookId, userId}) => {
        const book = findById(books)(bookId);
        const user = findById(users)(userId);

        return {
            _id: ObjectID(),
            bookId: book._id,
            userId: user._id,
        };
    });

    await booksCollection.insertMany(books.map(({title, _id}) => ({ title, _id})));
    await usersCollection.insertMany(users.map(({name, _id}) => ({ name, _id})));
    await loansCollection.insertMany(loans);
};

const init = async () => {
    debug('init');
    const mongoURI = mongoConfig.uri;
    try {
        const mongoClient = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        debug('connected');
        await createSchema(mongoClient.db());
        debug('schema created');
        await createData(mongoClient.db());
        debug('data created');

        return mongoClient.db();
    } catch (e) {
        debug('Could not connect.');
        throw new Error('Could not connect!');
    }
};

module.exports = { init, findByObjectId };
