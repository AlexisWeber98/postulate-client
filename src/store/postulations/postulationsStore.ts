import { create } from 'zustand';
import { Postulation, PostulationState } from '../../types/interface/postulations/postulation';

const usePostulationsStore = create<PostulationState>((set, get) => ({
  postulations: [],
  loading: false,

  addPostulation: (newPostulation) => {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const postulation: Postulation = {
      ...newPostulation,
      id,
      createdAt: now,
      updatedAt: now
    };

    set(state => ({
      postulations: [...state.postulations, postulation]
    }));

    return id;
  },

  updatePostulation: (id, updatedFields) => {
    set(state => ({
      postulations: state.postulations.map(postulation =>
        postulation.id === id
          ? { ...postulation, ...updatedFields, updatedAt: new Date().toISOString() }
          : postulation
      )
    }));
  },

  deletePostulation: (id) => {
    set(state => ({
      postulations: state.postulations.filter(postulation => postulation.id !== id)
    }));
  },

  getPostulation: (id) => {
    return get().postulations.find(postulation => postulation.id === id);
  },

  checkDuplicate: (company, position) => {
    return get().postulations.some(
      postulation =>
        postulation.company.toLowerCase() === company.toLowerCase() &&
        postulation.position.toLowerCase() === position.toLowerCase()
    );
  }
}));

export { usePostulationsStore };
