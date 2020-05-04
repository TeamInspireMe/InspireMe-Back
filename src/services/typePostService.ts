import { TypePost } from '../entity/TypePost';
import { addTypePostRepository, getOneTypePostRepository, getAllTypePostRepository } from '../repositories/typePostRepository';
import { validate, ValidationError } from 'class-validator';

interface BaseResult {
  status: number;
}

export interface SuccessResult extends BaseResult {
  data: {
    typePost: TypePost | TypePost[];
  }
}

export interface ErrorResult extends BaseResult {
  err: any;
}

type Result = SuccessResult | ErrorResult;

export const addTypePost = async (id: Number, name: String) => {
	let res: SuccessResult;
  let err: ErrorResult;

  const typePost = new TypePost();
  typePost.id = id;
  typePost.name = name;

  const errors: ValidationError[] = await validate(typePost);

  if (errors.length > 0) {
		err = {
			status: 400,
			err: errors,
		};
  }

  try {
    const typePostToSend: TypePost = await addTypePostRepository(typePost)

    res = {
      status: 201,
      data: { typePost: typePostToSend }
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
			if (err) {
        reject(err);
      }
			else {
				resolve(res);
			}
		},
  );

}

export const getOneTypePost = async (id: Number) => {
  let res: SuccessResult;
  let err: ErrorResult;

  try {
    const typePostToSend: TypePost | undefined = await getOneTypePostRepository(id)

    if (typePostToSend == undefined) {
      err = {
        status: 400,
        err: "this TypePost doesn't exists",
      }
    } else {

      res = {
        status: 201,
        data: { typePost: typePostToSend }
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

export const getAllTypePost = async () => {
  let res: SuccessResult;
  let err: ErrorResult;

  try {
    const typePostToSend: TypePost[] | undefined = await getAllTypePostRepository()

    if (typePostToSend == undefined) {
      err = {
        status: 400,
        err: "an error occured while fetching all TypePosts",
      }
    } else {
      res = {
        status: 201,
        data: { typePost: typePostToSend }
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
