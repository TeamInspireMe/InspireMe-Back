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
  return  await postRepository.findOne({ where: {uuid: id}, relations: ['comments', 'user']});
}

export async function getAllPostRepository () {
  const postRepository: Repository<Post> = getRepository(Post);
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

export async function addCommentToPost(id: String){
  const postRepository: Repository<Post> = getRepository(Post);
  const currPost = await postRepository.findOne({uuid: id});
  if (currPost != undefined){
    let counter: number = currPost.commentCount;
    counter++
    currPost.commentCount = counter
    console.log(` Number of comments: ${currPost.commentCount}`);
    return await postRepository.save(currPost)
  } else {
    console.log(`Oops couldn't count comments`);
    
  }

}