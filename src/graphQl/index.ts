import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { typeDefs as typeDefsUser } from './user/typeDefs';
import { resolvers as resolversUser} from './user/resolvers';
import { typeDefs as typeDefsPost } from './post/typeDefs';
import { resolvers as resolversPost } from './post/resolvers';
import { makeExecutableSchema } from 'apollo-server-express';

const types = [
  typeDefsUser,
  typeDefsPost 
];
export const typeDefs = mergeTypes(types, { all: true });

const resolvs = [
  resolversUser,
  resolversPost,
];
export const resolvers = mergeResolvers(resolvs);


// export const schema = makeExecutableSchema({
//     typeDefs,
//     resolvers
// })