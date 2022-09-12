const mongo = require("mongodb").MongoClient;
const collectionName = "docs";

/* mongodb+srv://bjmo21:<password>@cluster0.ewteqfp.mongodb.net/?retryWrites=true&w=majority


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://bjmo21:<password>@cluster0.ewteqfp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
 */

const database = {
    getDb: async function getDb () {
         /* let dsn = `mongodb://localhost:27017/docs`; */
        let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.ewteqfp.mongodb.net/?retryWrites=true&w=majority`;

        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb://localhost:27017/test";
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            db: db,
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;