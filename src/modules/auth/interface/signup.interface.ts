export interface ISignup {
  user: {
    email: string;
    password: string;
  };
  profile: {
    name: string;
    lastName: string;
    photo?: string;
    description?: string;
    linkedin?: string;
    github?: string;
  };
}
