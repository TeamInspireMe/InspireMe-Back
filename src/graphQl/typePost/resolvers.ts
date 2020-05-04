import { TypePost } from '../../entity/TypePost';
import { addTypePost, getOneTypePost, getAllTypePost, SuccessResult } from '../../services/typePostService' 

export const resolvers = {
  Query: {
    getOneType: async (
      parent: any,
			args: TypePost,
    ): Promise<TypePost | TypePost[]> => {
      try {
        const result: SuccessResult = await getOneTypePost(args.id)
        return result.data.typePost;
      } catch (error) {
        throw new Error
      }
    },
    getAllType: async (): Promise<TypePost | TypePost[]> => {
      try {
        const result: SuccessResult = await getAllTypePost()
        return result.data.typePost
      } catch (error) {
        throw new Error
      }
    }, 
  },
  Mutation: {
    createTypePost: async (
      parent: any,
			args: TypePost,
    ): Promise<TypePost | TypePost[]> => {
      try {
        const result: SuccessResult = await addTypePost(args.id, args.name);

        return result.data.typePost
      } catch (error) {
        throw new Error;
      }
    }
  }
}