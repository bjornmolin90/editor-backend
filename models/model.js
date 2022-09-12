const database = require("../db/database.js");

const docs = {
    getAllDocs: async function getAllDocs() {
        let db;
        try {
            db = await database.getDb();

            const allDocs = await db.collection.find().toArray();

            return allDocs;
        } catch (error) {
            return {
                errors: {
                    message: error.message,
                }
            };
        } finally {
            await db.client.close();
        }
    },

    insertDoc: async function insertDoc(newDoc) {
        let db;

        try {
            db = await database.getDb();

            const result = await db.collection.insertOne(newDoc);

            return {
                ...newDoc,
                _id: result.insertedId,
            };
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    },

    updateDoc: async function updateDoc(newDoc) {
        let db;

        try {
            db = await database.getDb();

            const result = await db.collection.updateOne( { name: newDoc.name}, {$set: { content: newDoc.content } })

            return {
                newDoc
            };
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    }
    
};

module.exports = docs;

