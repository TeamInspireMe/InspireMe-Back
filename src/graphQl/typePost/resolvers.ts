import { TypePost } from '../../entity/TypePost';
import { addTypePost, getOneTypePost, getAllTypePost, SuccessResult } from '../../services/typePostService' 

export const resolvers = {
  Query: {
    getOneType: async (id: TypePost["id"]): Promise<TypePost | TypePost[]> => {
      try {
        const result: SuccessResult = await getOneTypePost(id)
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
    createTypePost: async (id: Number, name: String): Promise<TypePost | TypePost[]> => {
      try {
        const result: SuccessResult = await addTypePost(id, name);

        return result.data.typePost
      } catch (error) {
        throw new Error;
      }
    }
  }
}