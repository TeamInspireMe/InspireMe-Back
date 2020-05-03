import { getRepository, Repository } from 'typeorm';
import { Section } from '../entity/Section';
import { Post } from '../entity/Post';

export async function addSectionPostRepository (section: Section) {
    const sectionRepository: Repository<Section> = getRepository(Section);
    return await sectionRepository.save(section);
}

export async function getOneSectionRepository (id: Number){
    const sectionRepository: Repository<Section> = getRepository(Section);
    return await sectionRepository.findOne({id: id});
}

export async function getAllSectionRepository () {
    const sectionRepository: Repository<Section> = getRepository(Section);
    return await sectionRepository.find();
}

export async function addPostToSectionRepository (id: Number, post: Post) {
    const sectionRepository: Repository<Section> = getRepository(Section);
    const currSection = await sectionRepository.findOne({id: id});
    if (currSection != undefined) {
        console.log(post);
        // currSection.posts?.push(post)
        currSection.posts = []
        console.log(currSection)
        console.log('ok')
        try {
            return await sectionRepository.update({id: id}, currSection)
        } catch (error) {
            console.log(error)
        }
    } else {
        console.log("nop")
    }
}