import { getRepository, Repository } from 'typeorm';
import { Section } from '../entity/Section';
import { Post } from '../entity/Post';

export async function addSectionPostRepository (section: Section) {
    const sectionRepository: Repository<Section> = getRepository(Section);
    return await sectionRepository.save(section);
}

export async function getOneSectionRepository (id: Number){
    const sectionRepository: Repository<Section> = getRepository(Section);
    return await sectionRepository.findOne({ where: { id: id }, relations: ["posts"]});
}

export async function getAllSectionRepository () {
    const sectionRepository: Repository<Section> = getRepository(Section);
    return await sectionRepository.find();
}
