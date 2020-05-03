import { Post, } from "../../entity/Post";
import { Section } from "../../entity/Section";
import { addPost, getOnePost, getAllPost, SuccessResult, ErrorResult } from '../../services/postService';
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
                return result.data.post;
            } catch (error) {
                throw new Error;
            }
        },
    },
    Mutation: {
        upVotePost: (postId: Post["uuid"]): void => { //TODO: add func to service and repository
            console.log('upvote');
            
        },
        downVotePost: (postId: Post["uuid"]): void => {
            console.log('downvote');
        },
        createPost: async (
            parent: any,
            args: PostToRegister,
        ): Promise<Post | Post[]> => {
            try {
                const result = await addPost(args.title, args.typeId, args.sectionId, args.data)
                console.log(result);
                return result
            } catch (error) {
                throw new Error;
            }
        }
    }
}