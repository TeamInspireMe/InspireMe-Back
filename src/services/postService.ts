import { Request, Response } from 'express';
import { Post } from '../entity/Post';
import { Section } from '../entity/Section';
import { addPostRepository, getOnePostRepository, getAllPostRepository } from '../repositories/postRepository';
import { getOneTypePostRepository } from '../repositories/typePostRepository'
import { getOneSectionRepository } from '../repositories/sectionRepository';
import { validate, ValidationError } from 'class-validator';
import { Type } from '../../types';

interface BaseResult {
    status: number;
}

export interface SuccessResult extends BaseResult {
	data: {
		post: Post | Post[];
	}
}

export interface ErrorResult extends BaseResult {
	err: any;
}

type Result = SuccessResult | ErrorResult;

export const getOnePost = async (id: String) => {
  let res: SuccessResult;
  let err: ErrorResult;

  try {
    const postToSend: Post | undefined = await getOnePostRepository(id)

    if (postToSend == undefined) {
      err = {
        status: 400,
        err: "this post doesn't exists",

      }
    } else {

      res = {
        status: 201,
        data: { post: postToSend }
      }
    }

  } catch (error) {
    err = {
			status: 400,
			err: error.message,
		};
  }

  return new Promise (
    (
			resolve: (result: SuccessResult) => void,
			reject: (result: ErrorResult) => void,
		) => {
      if (err) reject(err);
			else {
				resolve(res);
			}
    },
  )
}

export const getAllPost = async () => {
  let res: SuccessResult;
  let err: ErrorResult;

  try {
    const postToSend: Post[] | undefined = await getAllPostRepository()

    if (postToSend == undefined) {
      err = {
        status: 400,
        err: "an error occured while fetching all TypePosts",
      }
    } else {
      res = {
        status: 201,
        data: { post: postToSend }
      }
    }

  } catch (error) {
    err = {
			status: 400,
			err: error.message,
		};
  }

  return new Promise (
    (
			resolve: (result: SuccessResult) => void,
			reject: (result: ErrorResult) => void,
		) => {
      if (err) reject(err);
			else {
				resolve(res);
			}
    },
  )
}

export const addPost = async (
	title: String, 
	typeId: Number,
	sectionId: Number,
	data: String
): Promise<Result> => {
	let res: SuccessResult;
	let err: ErrorResult;
	
	const post = new Post();
	post.title = title;
	post.data = data;

	const typePost = await getOneTypePostRepository(typeId);

	if (typePost == undefined) {
		console.log(`Error typeError is ${typePost}`);
	} else {
		post.type = typePost;
	}

	const section = await getOneSectionRepository(sectionId)

	if (section == undefined) {
		console.log(`Error section is ${section}`);
	} else {
		post.section = section;
	}

	const errors: ValidationError[] = await validate(post);

	if (errors.length > 0) {
		err = {
			status: 400,
			err: errors,
		};
  }

  try {
		const postToSend: Post = await addPostRepository(post)

    res = {
      status: 201,
      data: { post: postToSend }
    }
  } catch (error) {
    err = {
			status: 400,
			err: error.message,
		};
  }
  
  return new Promise (
    (
			resolve: (result: SuccessResult) => void,
			reject: (result: ErrorResult) => void,
		) => {
			if (err) reject(err);
			else {
				resolve(res);
			}
		},
  );
}

//  export deletePost = async ()