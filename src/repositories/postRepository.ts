import { getRepository, Repository } from 'typeorm';
import { Post } from '../entity/Post';

export async function addPostRepository(post: Post): Promise<Post> {
  const postRepository: Repository<Post> = getRepository(Post);
	return await postRepository.save(post);
}

export async function deletePostRepository(post: Post): Promise<boolean> {
  const postRepository: Repository<Post> = getRepository(Post);
  const result: Post = await postRepository.remove(post);
  return true
}

export async function getOnePostRepository (id: String) {
  const postRepository: Repository<Post> = getRepository(Post);
  return postRepository.findOne({uuid: id});
}

export async function getAllPostRepository () {
  const postRepository: Repository<Post> = getRepository(Post);
  return postRepository.find();
}