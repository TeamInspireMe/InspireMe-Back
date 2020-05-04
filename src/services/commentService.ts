import { Comment } from '../entity/Comment';
import { validate, ValidationError } from 'class-validator';
import { getOneUserRepository } from '../repositories/userRepository';
import { addCommentRepository, getAllCommentRepository, getOneCommentRepository, deleteCommentRepository } from '../repositories/commentRepository'


interface BaseResult {
  status: number;
}

export interface SuccessResult extends BaseResult {
  data: {
    comment: Comment | Comment[];
  }
}

export interface ErrorResult extends BaseResult {
err: any;
}

type Result = SuccessResult | ErrorResult;

export const addComment = async (content: String, userId: String) => {
  let res: SuccessResult;
  let err: ErrorResult;

  const comment = new Comment();
  comment.content = content;

  const user = await getOneUserRepository(userId)
  
  if (user != undefined) {
    comment.user = user;
  } else {
    err = {
      status: 400,
      err: "cannot find user",
    };
  }

  const errors: ValidationError[] = await validate(comment);

  if (errors.length > 0) {
    err = {
      status: 400,
      err: errors,
    };
  }

  try {
      const commentToSend: Comment = await addCommentRepository(comment);

      res = {
        status: 201,
        data: {comment: commentToSend}
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


export const getOneComment = async (id: String) => {
  let res: SuccessResult;
  let err: ErrorResult;

  try {
    const commentToSend: Comment | undefined = await getOneCommentRepository(id);
    
    if(commentToSend == undefined) {
      err = {
        status: 400,
        err: "this Section doesn't exists"
      }
    } else {
      res = {
        status: 201,
        data: { comment: commentToSend }
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


export const getAllComment = async () => {
  let res: SuccessResult;
  let err: ErrorResult;

  try {
		const commentToSend: Comment[] | undefined = await getAllCommentRepository()

    if (commentToSend == undefined) {
      err = {
        status: 400,
        err: "an error occured while fetching all comments",
      }
    } else {
      res = {
        status: 201,
        data: { comment: commentToSend }
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

export const deleteComment = async (id: String) => {
  let res: SuccessResult;
  let err: ErrorResult;
  
  const commentToDel: Comment | undefined = await getOneCommentRepository(id);

  
  try {
    if (commentToDel != undefined) {
      const deletedPost = await deleteCommentRepository(commentToDel)
 
      res = {
        status: 201,
        data: { comment: deletedPost }
      }
    } else {
      err = {
        status: 400,
        err: "cannot find user",
      };
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