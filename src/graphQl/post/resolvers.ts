import { Post, } from "../../entity/Post";
import { Section } from "../../entity/Section";
import { addPost, getOnePost, getAllPost,upVote, downVote, SuccessResult, ErrorResult } from '../../services/postService';
import { TypePost  } from "../../entity/TypePost";

interface PostToRegister {
    title: String; 
    typeId: Number; 
    sectionId: Number; 
    data: String;
}


export const resolvers = {
    Query: {
        getAllPost:  async (): Promise<Post | Post[]>  => {
            try {
                const result: SuccessResult = await getAllPost()
                return result.data.post
            } catch(error) {
                throw new Error;
            }
        }, 
        getOnePost: async (
            parent: any,
            args: TypePost,
        ) => {
            try {
                const result: SuccessResult = await getOnePost(args.uuid)
                // console.log(result)
                return result.data.post;
            } catch (error) {
                throw new Error;
            }
        },
    },
    Mutation: {
        upVotePost: async (
            parent: any,
            args: Post,
        ): Promise<Post | Post[]> => {
            try {
                const result = await upVote(args.uuid)
                return (result as SuccessResult).data.post
            } catch (error) {
                throw new Error;
            }
        },
        downVotePost: async (
            parent: any,
            args: Post,
        ): Promise<Post | Post[]> => {
            try {
                const result = await downVote(args.uuid)
                return (result as SuccessResult).data.post
            } catch (error) {
                throw new Error;
            }
        },
        createPost: async (
            parent: any,
            args: PostToRegister,
        ): Promise<Post | Post[]> => {
            try {
                const result = await addPost(args.title, args.typeId, args.sectionId, args.data)
                // console.log(result.data);
                return (result as SuccessResult).data.post
            } catch (error) {
                throw new Error;
            }
        }
    }
}