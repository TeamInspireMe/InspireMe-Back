import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Post } from '../entity/Post';
import { addPost, SuccessResult, ErrorResult } from '../services/postService';
import { validate, ValidationError } from 'class-validator';
import { SendMail, Mail } from '../services/mailGunService';
import S3 from '../services/s3Service';
import axios from 'axios';

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
      const { title, sectionId, userId } = req.body;
      
      const data: String = req.file.location

      const typeId: Number = 2

      let post: Post | Post[];

      try {
        const result = await addPost(title, typeId, sectionId, data, userId)
        // console.log(result.data);
        post = (result as SuccessResult).data.post
      } catch (error) {
        throw new Error;
      }

      console.log(`Your file is here ${req.file.location}`);
      res.status(200).send({ data: post });

    });
  };

  static fetchPost = async (
    req: any,
    res: any
  ): Promise<void> => {
    try {
      const response = await axios.get(`https://apodapi.herokuapp.com/api/?start_date=2018-10-05&end_date=2018-10-10`)
      console.log(response.data);
      
      let datas = JSON.parse(response.data);

      datas.forEach((dataFetched: { title: String; url: String;})=> {
        let post: Post | Post[];

        const title = dataFetched.title;
        const data = dataFetched.url;
        const typeId = 2;
        const sectionId = 2;

        const uuid = req.body.userId

        const result = addPost(title, typeId, sectionId, data, uuid)
      });

    } catch (err) {
      console.log(err);
      this.fetchPost(req, res)
    }
    
    
  }
}