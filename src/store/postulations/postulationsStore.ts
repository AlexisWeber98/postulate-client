import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Postulation,
  PostulationState,
} from "../../types/interface/postulations/postulation";

<<<<<<< HEAD
const usePostulationsStore = create<PostulationState>((set, get) => ({
  postulations: [],
  loading: false,
=======
export const usePostulationsStore = create<PostulationState>()(
  persist(
    (set, get) => ({
      postulations: [],
>>>>>>> 41d4925 (RF: delete duplicate directories)

      addPostulation: (newPostulation) => {
        const timestamp = new Date().toISOString();
        const id = crypto.randomUUID();

        const postulation: Postulation = {
          ...newPostulation,
          id,
          createdAt: timestamp,
          updatedAt: timestamp,
        };

        set((state) => ({
          postulations: [postulation, ...state.postulations],
        }));

        return id;
      },

      updatePostulation: (id, updatedFields) => {
        set((state) => ({
          postulations: state.postulations.map((app) =>
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

      deletePostulation: (id) => {
        set((state) => ({
          postulations: state.postulations.filter((app) => app.id !== id),
        }));
      },

      getPostulation: (id) => {
        return get().postulations.find((app) => app.id === id);
      },

      checkDuplicate: (company, position) => {
        return get().postulations.some(
          (app) =>
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
