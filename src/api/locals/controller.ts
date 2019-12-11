import { MongoClient } from "mongodb";

const MONGO_URL = "mongodb://142.93.171.171:27017"; //esto depende
const DB_NAME = "finderlocals";
const DB_LOCALS_COLLECTION = "locals";

export function getLocals() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, (err, client) => {
      if (!err) {
        const db = client.db(DB_NAME);
        const localsCollection = db.collection(DB_LOCALS_COLLECTION);
        localsCollection
          .find({})
          .limit(20)
          .toArray()
          .then(locals => resolve(locals))
          .catch(errorFind => reject(errorFind));
      } else {
        reject(err);
      }
    });
  });
}

export function createLocals(newLocal) {
  return new Promise((resolve, reject) => {
    let localToInsert = {
      ...newLocal,
      created: new Date(),
      updated: new Date()
    };
    MongoClient.connect(MONGO_URL, (err, client) => {
      if (!err) {
        const db = client.db(DB_NAME);
        const localsCollection = db.collection(DB_LOCALS_COLLECTION);
        localsCollection
          .insertOne(localToInsert)
          .then(() => resolve(getLocals()))
          .catch(insertError => reject(insertError));
      } else {
        reject(err);
      }
    });
  });
}

export function updateLocal(localName, localUpdated) {
  return new Promise((resolve, reject) => {
      MongoClient.connect(MONGO_URL, (err, client) => {
        const db = client.db(DB_NAME);
        const localsCollection = db.collection(DB_LOCALS_COLLECTION);
        localsCollection
          .update({"name" : localName}, {...localUpdated})
          .then(result => console.log(result))
          .catch(err => console.log(err));
      });
  });
}

export function deleteLocal(localName) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, (err, client) => {
      const db = client.db(DB_NAME);
      const localsCollection = db.collection(DB_LOCALS_COLLECTION);
      localsCollection
        .findOneAndDelete({"name": localName})
        .then(result => console.log(result))
        .catch(err => console.log(err));
    });
  });
}
