import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Postulation, PostulationState } from '../../types/interface/postulations/postulation';

export const usePostulationsStore = create<PostulationState>()(
  persist(
    (set, get) => ({
      postulations: [],

      addPostulation: (newPostulation: Postulation) => {
        set((state: PostulationState) => ({
          postulations: [newPostulation, ...state.postulations],
        }));
      },

      updatePostulation: (id: string, updatedFields: Partial<Postulation>) => {
        set((state: PostulationState) => ({
          postulations: state.postulations.map(p =>
            p.id === id ? { ...p, ...updatedFields } : p
          ),
        }));
      },

      deletePostulation: (id: string) => {
        set((state: PostulationState) => ({
          postulations: state.postulations.filter(p => p.id !== id),
        }));
      },

      getPostulation: (id: string) => {
        const postulation = get().postulations.find((app: Postulation) => app.id === id);
        return postulation;
      },

      checkDuplicate: (company: string, position: string) => {
        if (!company || !position) {
          return false;
        }
        const isDuplicate = get().postulations.some(
          (app: Postulation) =>
            app.company?.toLowerCase() === company.toLowerCase() &&
            app.position?.toLowerCase() === position.toLowerCase()
        );
        return isDuplicate;
      },

      setAllPostulations: (postulations: Postulation[]) => {
        set({ postulations });
      },
    }),
    {
      name: 'job-potulations-storage',
    }
  )
);
