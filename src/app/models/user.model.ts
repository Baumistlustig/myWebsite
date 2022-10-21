export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  status: string;
  role: string;
  verified: boolean;
  created: Date;
  updated: Date | null;
}
