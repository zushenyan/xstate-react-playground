export interface Response {
  code: number;
}

export interface SignIn {
  email: string;
  password: string;
}

export const signIn = ({ email }: SignIn): Promise<Response> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (email === 'admin@123.com') {
        res({ code: 1 });
      } else {
        rej({ code: 2 });
      }
    }, 2000);
  });
};
