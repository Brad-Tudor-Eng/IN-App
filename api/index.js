require('dotenv').config()

import { GraphQLServer, PubSub } from 'graphql-yoga'
import mongoose from 'mongoose'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'

const pubsub = new PubSub()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})

const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription
    },
    context: (req)=>{
        return {
            pubsub
        }
    }
})

const gqlEndpoint = '/gql'

const options = {
    port: process.env.PORT,
    endpoint: gqlEndpoint,
    subscriptions: gqlEndpoint,
    playground: gqlEndpoint
}


server.start( options, ()=>{
    console.log('server has started')
})
 