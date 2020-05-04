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
  console.log("ok")
  const postRepository: Repository<Post> = getRepository(Post);
  const test = await postRepository.find();
  console.log(test)
  console.log('ko')
  return await postRepository.find();
}

export async function upVotePostRepository (id: String) {
  const postRepository: Repository<Post> = getRepository(Post);
  const currPost = await postRepository.findOne({ uuid: id })
  if(currPost != undefined){
    let upVoted: number = currPost.upVote;
    upVoted++;
    currPost.upVote = upVoted;
    console.log(` Number of upVote: ${currPost.upVote}`);
    return await postRepository.save(currPost)
  }else {
    console.log(`Oops couldn't upVote`);
  }
}

export async function downVotePostRepository (id: String){
  const postRepository: Repository<Post> = getRepository(Post);
  const currPost = await postRepository.findOne({uuid: id});
  if (currPost != undefined) {    
    let downVoted: number = currPost.downVote;
    downVoted++
    currPost.downVote = downVoted
    console.log(` Number of downVote: ${currPost.downVote}`);
    return await postRepository.save(currPost)
  }else {
    console.log(`Oops couldn't downVote`);
  }

}