export interface Resolve {
  email: string;
  msg: string;
}

export const submitUserData = (
  email: string,
  password: string,
  passwordConfirmation: string
): Promise<Resolve> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (email === 'foobar@gmail.com') {
        rej('this email is taken');
      }
      res({
        email,
        msg: `hello ${email}!`,
      });
    }, 1000);
  });
};
