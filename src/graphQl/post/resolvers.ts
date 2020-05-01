import { Post, } from "../../entity/Post";
import { Type } from "../../../types";
import { Section } from "../../entity/Section";
import { getRepository } from "typeorm";

export const resolvers = {
    Query: {
        getOne: (postId: Post["uuid"]) => { 'ok' },
        getAll: () => 'okk'       
    },
    Mutation: {
        createPost(): void {
            new Post()
        },
        likePost: (postId: Post["uuid"]): void => {
            let post = getOne(postId);
            return post.like += 1;
        },
        dislikePost: (postId: Post["uuid"]): void => {
            let post = getOne(postId);
            return post.dislike += 1;
        },
        addPost: (title: String, type: Type!, section: Section!): Promise<Post> => {
            const post = new Post()
            post.title = title;
            post.type = type;
            post.section = section;
            return getRepository(Post).save(post);   
        }
    }
}