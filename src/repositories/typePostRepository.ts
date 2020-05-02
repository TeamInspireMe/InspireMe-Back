import { getRepository, Repository } from 'typeorm';
import { Type } from '../entity/Type';

export async function addTypePostRepository (type: Type) {
  const typeRepository: Repository<Type> = getRepository(Type)
  return await typeRepository.save(type);
} 

export async function getOneTypePostRepository (id: String) {
  const typeRepository: Repository<Type> = getRepository(Type)
  return await typeRepository.findOne({id: id})
}

export async function getAllTypePostRepository () {
  const typeRepository: Repository<Type> = getRepository(Type)
  return await typeRepository.find()
}