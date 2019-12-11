import { MongoClient } from "mongodb";

const MONGO_URL = "mongodb://142.93.171.171:27017";
const DB_NAME = "finderlocals";
const DB_USERS_COLLECTION = "users";

export function getUsers() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(MONGO_URL, (err, client) => {
          if (!err) {
            const db = client.db(DB_NAME); 
            const usersCollection = db.collection(DB_USERS_COLLECTION);
            usersCollection
              .find({})
              .limit(20)
              .toArray()
              .then(users => resolve(users))
              .catch(errorFind => reject(errorFind));
          } else {
            reject(err);
          }
        });
    });
}

export function createUser(newUser) {
    return new Promise((resolve, reject) => {
        let userToInsert = {
          ...newUser,
        };
        MongoClient.connect(MONGO_URL, (err, client) => {
          if (!err) {
            const db = client.db(DB_NAME); 
            const usersCollection = db.collection(DB_USERS_COLLECTION);
            usersCollection
              .insertOne(userToInsert)
              .then(() => resolve(getUsers()))
              .catch(insertError => reject(insertError));
          } else {
            reject(err);
          }
        });
      });
}

export function updateUser(userName, userUpdated) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(MONGO_URL, (err, client) => {
            const db = client.db(DB_NAME); 
            const usersCollection = db.collection(DB_USERS_COLLECTION);
            usersCollection
                .update({"name" : userName}, {...userUpdated})
                .then(result => console.log(result))
                .catch(err => console.log(err));
        });
    });
}

export function deleteUser(userName) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(MONGO_URL, (err, client) => {
        const db = client.db(DB_NAME);
        const usersCollection = db.collection(DB_USERS_COLLECTION);
        usersCollection
          .findOneAndDelete({"name": userName})
          .then(result => console.log(result))
          .catch(err => console.log(err));
      });
    });
  }