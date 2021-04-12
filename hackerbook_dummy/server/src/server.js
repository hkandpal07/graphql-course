const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');
const loaders = require('./loader')

const schema = makeExecutableSchema({typeDefs, resolvers})

const app = express(); //create http server using express

app.use(cors()); //add cors support to the http server 
app.use('/graphql', 
    bodyParser.json(), 
    graphqlExpress(() => { 
        return {
            schema,
            context: {
                loaders: loaders()
            } 
        }
    })
); //set single endpoint for graphql requests

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); //set up graphiql to point to graphql enpoint

app.listen(4000, () => {
    console.log('Go to http://localhost:4000/graphiql to run queries');
})