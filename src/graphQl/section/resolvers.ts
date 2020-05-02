import { Section } from '../../entity/Section';
import {addSection, getOneSection, getAllSection, SuccessResult } from '../../services/sectionService';
export const resolvers = {
    Query: {
        getAllSection: async (): Promise<Section | Section[]> => {
            try {
                const result: SuccessResult = await getAllSection()
                return result.data.section
            } catch (error) {
                throw new Error
            }
        },
        getOneSection: async (id: Section["id"]): Promise<Section | Section[]> => {
            try {
                const result: SuccessResult = await getOneSection(id);
                return result.data.section;
            } catch (error) {
                throw new Error
            }
        }
    },
    Mutation: {
        createSection: async (id: Number, name: String): Promise<Section | Section[]> => {
            try {
                const result: SuccessResult = await addSection(id, name);
                return result.data.section
            } catch (error){
                throw new Error;
            }
        }
    }
} 