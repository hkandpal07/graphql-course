const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { makeExecutableSchema } = require('graphql-tools');
const { graphql } =  require('graphql')

const typeDefs =  `
    schema {
        query: Query
    }
    # root query for **Hello World Server**
    type Query {
        # Says *hello world*
        hello: String
        """
        Multiline docs
        about name
        in triple quotes
        """
        name: String
    }
`;

const resolvers = {
    Query: {
        hello: () => {
            return 'World';
        },
        name: () => {
            return 'Harshit'
        }
    }
}

const schema = makeExecutableSchema({typeDefs, resolvers})

const app = express(); //create http server using express

app.use(cors()); //add cors support to the http server 
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema })); //set single endpoint for graphql requests

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); //set up graphiql to point to graphql enpoint

app.listen(4000, () => {
    console.log('Go to http://localhost:4000/graphiql to run queries');
})