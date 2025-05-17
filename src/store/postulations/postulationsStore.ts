import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Postulation,
  PostulationState,
} from "../../types/interface/postulations/postulation";

export const usePostulationsStore = create<PostulationState>()(
  persist(
    (set, get) => ({
      postulations: [],
      loading: false,

      addPostulation: (newPostulation: Omit<Postulation, 'id' | 'createdAt' | 'updatedAt'>) => {
        const timestamp = new Date().toISOString();
        const id = crypto.randomUUID();

        const postulation: Postulation = {
          ...newPostulation,
          id,
          createdAt: timestamp,
          updatedAt: timestamp,
        };

        set((state: PostulationState) => ({
          postulations: [postulation, ...state.postulations],
        }));

        return id;
      },

      updatePostulation: (id: string, updatedFields: Partial<Postulation>) => {
        set((state: PostulationState) => ({
          postulations: state.postulations.map((app: Postulation) =>
            app.id === id
              ? {
                  ...app,
                  ...updatedFields,
                  updatedAt: new Date().toISOString(),
                }
              : app,
          ),
        }));
      },

      deletePostulation: (id: string) => {
        set((state: PostulationState) => ({
          postulations: state.postulations.filter((app: Postulation) => app.id !== id),
        }));
      },

      getPostulation: (id: string) => {
        return get().postulations.find((app: Postulation) => app.id === id);
      },

      checkDuplicate: (company: string, position: string) => {
        return get().postulations.some(
          (app: Postulation) =>
            app.company.toLowerCase() === company.toLowerCase() &&
            app.position.toLowerCase() === position.toLowerCase(),
        );
      },
    }),
    {
      name: "job-potulations-storage",
    },
  ),
);
