import { getRepository, Repository } from 'typeorm';
import { TypePost } from '../entity/TypePost';

export async function addTypePostRepository (type: TypePost) {
  const typeRepository: Repository<TypePost> = getRepository(TypePost)
  return await typeRepository.save(type);
} 

export async function getOneTypePostRepository (id: Number) {
  const typeRepository: Repository<TypePost> = getRepository(TypePost)
  return await typeRepository.findOne({id: id})
}

export async function getAllTypePostRepository () {
  const typeRepository: Repository<TypePost> = getRepository(TypePost)
  return await typeRepository.find()
}