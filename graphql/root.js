const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const DocType = require("./doc.js");

const docsModel = require("../models/model.js");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        docs: {
            type: new GraphQLList(DocType),
            description: 'All documents',
            resolve: async function() {
                let docArray = await docsModel.getAllDocs();

                return docArray
            }
        },

        doc: {
            type: DocType,
            description: 'One document',
            args: {
                name: { type: GraphQLString }
            },
            resolve: async function(parent, args) {
                let docArray = await docsModel.getAllDocs();

                return docArray.find((doc) => doc.name === args.name)
            }
        }
    })
});

module.exports = RootQueryType;