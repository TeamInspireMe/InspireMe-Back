import { Post, } from "../../entity/Post";
import { Section } from "../../entity/Section";
import { getRepository } from "typeorm";
import { addPost, SuccessResult, ErrorResult } from '../../services/postService';
import { Type  } from "../../entity/Type";


export const resolvers = {
    Query: {
        getAll: () => {
            return getRepository(Post).find()
        }, 
        getOne: (postId: Post["uuid"]) => {
            return getRepository(Post).findOne(postId.toString())
        },     
    },
    Mutation: {
        upVotePost: (postId: Post["uuid"]): void => {
            console.log('upvote');
            
        },
        downVotePost: (postId: Post["uuid"]): void => {
            console.log('downvote');
        },
        createPost: async (title: String, type: Type, section: Section, data: String): Promise<Post> => {
            const post = new Post()
            post.title = title;
            post.type = type;
            post.section = section;
            post.data = data;
            type Result = SuccessResult | ErrorResult;

            try {
                const result = await addPost(post);
    
                return (result as SuccessResult).data.post
            } catch (error) {
                throw new Error;
            }
        }
    }
}