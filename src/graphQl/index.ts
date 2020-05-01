import { typeDefs as typeDefsUser } from './user/typeDefs';
import { resolvers as resolversUser} from './user/resolvers';
import { typeDefs as typeDefsPost } from './post/typeDefs';
import { resolvers as resolversPost } from './post/resolvers';
import { DocumentNode } from 'graphql';
import { makeExecutableSchema } from 'apollo-server-express';

const typeDefs = [ typeDefsUser, typeDefsPost ];
const resolvers: any = [ resolversUser, resolversPost ];

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})