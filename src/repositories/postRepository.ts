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
  return await postRepository.findOne({uuid: id});
}

export async function getAllPostRepository () {
  const postRepository: Repository<Post> = getRepository(Post);
  return postRepository.find();
}

export async function upVotePostRepository (id: String) {
  const postRepository: Repository<Post> = getRepository(Post);
  const currPost = await postRepository.findOne({ uuid: id })
  let test: number = 0;
  test ++;
  if (currPost != undefined && currPost.upVote != undefined) {
    let currUp = currPost.upVote++
  }
  return await postRepository.update({ uuid: id }, { upVote: currUp })
}

export async function downVotePostRepositoy (id: String){
  const postRepository: Repository<Post> = getRepository(Post);
  const currPost = await postRepository.findOne({uuid: id});
  if (currPost != undefined) {
    console.log("test downVote");    
    
    const downVoted = currPost.downVote++;
    console.log(` Number of downVote: ${downVoted}`);

    return await postRepository.update({uuid: id}, {downVote: downVoted})
  }else {
    console.log(`Oops couldn't downVote`);
  }

  
}