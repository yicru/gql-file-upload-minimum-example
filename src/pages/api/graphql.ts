import { createSchema, createYoga } from 'graphql-yoga'
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  graphqlEndpoint: '/api/graphql',
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      scalar File

      type Query {
        greetings: String
      }

      type Mutation {
        readTextFile(file: File!): String!
      }
    `,
    resolvers: {
      Query: {
        greetings: () =>
          'This is the `greetings` field of the root `Query` type',
      },
      Mutation: {
        readTextFile: async (_, { file }: { file: File }) => {
          return await file.text()
        },
      },
    },
  }),
})
