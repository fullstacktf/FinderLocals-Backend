const locals = [{ name: 'Local Alfonso', id: 1, location: "C/ Teresa de los campos" }, { name: 'Local Gigants', id: 2, location: "C/ Pedro de Alonso" }];
import { MongoClient, Server, ObjectId } from 'mongodb';
import { type } from 'os';

const MONGO_URL = 'mongodb://localhost:27017';//esto depende

export function getLocals() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(MONGO_URL, (err, client) => {
          if (!err) {
            const db = client.db('locals');//esto depende de la creación
            const moviesCollection = db.collection('locals');
            moviesCollection.find({}).limit(20).toArray()
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
      let localToInsert = { ... newLocal,   created: new Date(), updated: new Date() };
      MongoClient.connect(MONGO_URL, (err, client) => {
        if (!err) {
          const db = client.db('locals');
          const localssCollection = db.collection('locals');
          localssCollection.insertOne(localToInsert)
            .then(() => resolve(getLocals()))
            .catch(insertError => reject(insertError));
        } else {
          reject(err);
        }
      });
    });
}
