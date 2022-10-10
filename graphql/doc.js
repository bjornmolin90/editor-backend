const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');
const docsModel = require("../models/model.js");

const DocType = new GraphQLObjectType({
    name: 'Docs',
    description: 'Name and permitted users on a document',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },

        users: {
            type: new GraphQLList(GraphQLString),
        }
    })
})

module.exports = DocType;
