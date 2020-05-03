import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Post } from '../entity/Post';
import { addPost, SuccessResult, ErrorResult } from '../services/postService';
import { validate, ValidationError } from 'class-validator';
import { SendMail, Mail } from '../services/mailGunService';
import S3 from '../services/s3Service';

interface _avatarMulterFile extends Express.Multer.File {
	location: string; // location not present (forgotten?) in multer types
}

export interface UploadAvatar_Request extends Request {
	body: { uuid: string };
	file: _avatarMulterFile;
}

export interface UploadAvatar_Response extends Response {
	post: Post;
}


const imageUpload = S3.uploadImg.single('file');

export default class PostController {
  static uploadPic = (
    req: any,
    res: any,
    // req: UploadAvatar_Request,
    // res: UploadAvatar_Response,
  ): void => {
    imageUpload(req, res, async (err: { message: any }) => {
      if (err) {
        console.log('ERROR in image uploading: ', err.message);

        return res.status(422).send({
          errors: [
            {
              title: 'Image Upload Error',
              detail: err.message,
            },
          ],
        });
      }

      console.log(req.body.title);
      const { title, sectionId } = req.body;
      
      const data: String = req.file.location

      const typeId: Number = 2

      let post: Post | Post[];

      try {
        const result = await addPost(title, typeId, sectionId, data)
        // console.log(result.data);
        post = (result as SuccessResult).data.post
      } catch (error) {
        throw new Error;
      }

      console.log(`Your file is here ${req.file.location}`);
      res.status(200).send({ data: post });

    });
  };
}

 