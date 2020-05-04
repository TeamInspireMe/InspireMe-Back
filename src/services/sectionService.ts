import { Section } from '../entity/Section';
import { validate, ValidationError } from 'class-validator';
import { addSectionPostRepository, getOneSectionRepository, getAllSectionRepository } from '../repositories/sectionRepository';

interface BaseResult {
    status: number;
}
  
export interface SuccessResult extends BaseResult {
    data: {
      section: Section | Section[];
    }
}
  
export interface ErrorResult extends BaseResult {
  err: any;
}
  
type Result = SuccessResult | ErrorResult;

export const addSection = async (id: Number, name: String) => {
    let res: SuccessResult;
    let err: ErrorResult;

    const section = new Section();
    section.id = id;
    section.name = name;

    const errors: ValidationError[] = await validate(section);

    if (errors.length > 0) {
		err = {
			status: 400,
			err: errors,
		};
  }

  try {
      const sectionToSend: Section = await addSectionPostRepository(section);

      res = {
          status: 201,
          data: {section: sectionToSend}
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

export const getOneSection = async (id: Number) => {
    let res: SuccessResult;
    let err: ErrorResult;

    try {
        const sectionToSend: Section | undefined = await getOneSectionRepository(id)

        if (sectionToSend == undefined) {
            err = {
                status: 400,
                err: "this Section doesn't exists"
            }
        } else {
            res = {
                status: 201,
                data: { section: sectionToSend }
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

export const getAllSection = async () => {
    let res: SuccessResult;
    let err: ErrorResult;

    try {
        const sectionToSend: Section[] | undefined = await getAllSectionRepository()

        if ( sectionToSend == undefined ){
            err = {
                status: 400,
                err: "an error occured while fetching all Section",
            }
        } else {
            res = {
                status: 201,
                data: { section: sectionToSend }
            }
        }
    } catch (error) {
        err = {
            status: 400,
			err: error.message
        }
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