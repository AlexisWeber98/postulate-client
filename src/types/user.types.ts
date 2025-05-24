export interface User {
  id: string;
  name: string;
  email: string;
  lastName?: string;
  userName?: string;
  profileImage?: string;

}

export type UpdateUserData = Partial<Omit<User, 'id'>>;
