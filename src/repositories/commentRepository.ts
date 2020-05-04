import { getRepository, Repository } from 'typeorm';
import { Comment } from '../entity/Comment';

export async function addCommentRepository(comment: Comment): Promise<Comment> {
    const commentRepository: Repository<Comment> = getRepository(Comment);
    return await commentRepository.save(comment)
}

export async function deleteCommentRepository(comment: Comment): Promise<Comment> {
    const commentRepository: Repository<Comment> = getRepository(Comment);
    const result: Comment = await commentRepository.remove(comment);
    console.log(result)
    return result;
}

export async function getOneCommentRepository (id: String) {
    const commentRepository: Repository<Comment> = getRepository(Comment);
    return await commentRepository.findOne({uuid: id});
}

export async function getAllCommentRepository() {
    const commentRepository: Repository<Comment> = getRepository(Comment);
    return commentRepository.find();
}