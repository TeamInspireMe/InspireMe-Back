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
        getOneSection: async (
            parent: any,
			args: Section,
        ): Promise<Section | Section[]> => {
            try {
                const result: SuccessResult = await getOneSection(args.id);
                return result.data.section;
            } catch (error) {
                throw new Error
            }
        }
    },
    Mutation: {
        createSection: async (
            parent: any,
			args: Section,
        ): Promise<Section | Section[]> => {
            try {
                const result: SuccessResult = await addSection(args.id, args.name);
                return result.data.section
            } catch (error){
                throw new Error;
            }
        }
    }
} 