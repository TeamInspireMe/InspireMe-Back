import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import { typeDefs as typeDefsUser } from './user/typeDefs';
import { resolvers as resolversUser} from './user/resolvers';

import { typeDefs as typeDefsPost } from './post/typeDefs';
import { resolvers as resolversPost } from './post/resolvers';

import { typeDefs as typeDefsTypePost } from './typePost/typeDefs';
import { resolvers as resolversTypePost } from './typePost/resolvers';

import { typeDefs as typeDefsSection } from './section/typeDefs';
import { resolvers as resolversSection } from './section/resolvers';

import { makeExecutableSchema } from 'apollo-server-express';
var merge = require('lodash/merge');

const types = [
  typeDefsUser,
  typeDefsPost,
  typeDefsTypePost,
  typeDefsSection
];
export const typeDefs = mergeTypes(types, { all: true });

// const resolvs = [
//   resolversUser,
//   resolversPost,
//   resolversTypePost
// ];
//  export const resolvers = mergeResolvers(resolvs);

export const resolvers = merge({}, 
  resolversUser,
  resolversPost,
  resolversTypePost,
  resolversSection
)

// export const schema = makeExecutableSchema({
//     typeDefs,
//     resolvers
// }) 
