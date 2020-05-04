import { Comment } from '../../entity/Comment';
import { getAllComment, getOneComment, addComment, deleteComment, SuccessResult, ErrorResult } from '../../services/commentService';

interface CommentToRegister {
  content: String; 
  userId: String; 
  postId: String;
}

export const resolvers = {
    Query: {
        getOneComment: async (
            parent: any,
            args: Comment,
        ): Promise<Comment | Comment[]> => {
            try {
                const result: SuccessResult = await getOneComment(args.uuid)
                return result.data.comment
            } catch (error) {
                throw new Error;
            }
        },
        getAllComment: async (): Promise<Comment | Comment[]> => {
            try {
                const result: SuccessResult = await getAllComment();
                return result.data.comment;
            } catch (error) {
                throw new Error;
            }
        }
    },
    Mutation: {
        createComment: async (
            parent: any,
            args: CommentToRegister,
        ): Promise<Comment | Comment[]> => {
            try {
                const result: SuccessResult = await addComment(args.postId, args.userId, args.content)
                console.log("Plop",result.data.comment)
                return result.data.comment
            } catch (error){
                throw new Error;
            } 
        },

        deleteComment: async (
            parent: any,
            args: Comment,
        ): Promise<Comment | Comment[]> => {
            try {
                const result: SuccessResult = await deleteComment(args.uuid)
                return result.data.comment
            } catch (error){
                throw new Error;
            }
        }
    }
}