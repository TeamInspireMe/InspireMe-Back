import { Request, Response } from 'express';
import { Post } from '../entity/Post';
import { Section } from '../entity/Section';
import { addPostRepository } from '../repositories/postRepository';
import { validate, ValidationError } from 'class-validator';
import { Type }from '../../types';

interface BaseResult {
    status: number;
}

export interface SuccessResult extends BaseResult {
	data: {
		post: Post;
	}
}

export interface ErrorResult extends BaseResult {
	err: any;
}

type Result = SuccessResult | ErrorResult;

export const addPost = async (
	title: String, 
	type: String, 
	section: String, 
	data: String
): Promise<Result> => {
	let res: SuccessResult;
	let err: ErrorResult;

	const post = new Post()

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