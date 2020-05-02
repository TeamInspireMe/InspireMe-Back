import { getRepository, Repository } from 'typeorm';
import { Section } from '../entity/Section';

export async function addSectionPostRepository (section: Section) {
    const sectionRepository: Repository<Section> = getRepository(Section);
    return await sectionRepository.save(section)
}

export async function getOneSectionRepository (id: Number){
    const sectionRepository: Repository<Section> = getRepository(Section)
    return await sectionRepository.findOne({id: id})
}

export async function getAllSectionRepository () {
    const sectionRepository: Repository<Section> = getRepository(Section)
    return await sectionRepository.find()
}