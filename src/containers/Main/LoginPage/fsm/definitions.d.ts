export interface FormContext {
  email: string;
  password: string;
}

export interface EmailStates {
  states: {
    noError: {};
    errors: {
      states: {
        empty: {};
        badFormat: {};
        noAccount: {};
      };
    };
  };
}

export interface PasswordStates {
  states: {
    noError: {};
    errors: {
      states: {
        empty: {};
      };
    };
  };
}

export interface FormStates {
  states: {
    ready: {};
  };
}

export interface SumbitEvent {
  type: 'SUBMIT';
  payload: { email: string; password: string };
}
export interface EmailCacheEvent {
  type: 'EMAIL_CACHE';
  payload: string;
}
export interface EmailValidateFrontendEvent {
  type: 'EMAIL_VALIDATE_FRONTEND';
}
export interface EmailValidateBackendEvent {
  type: 'EMAIL_VALIDATE_BACKEND';
}
export interface PasswordCacheEvent {
  type: 'PASSWORD_CACHE';
  payload: string;
}
export interface PasswordValidateFrontendEvent {
  type: 'PASSWORD_VALIDATE_FRONTEND';
}

export type TFormEvents =
  | SumbitEvent
  | EmailCacheEvent
  | EmailValidateFrontendEvent
  | EmailValidateBackendEvent
  | PasswordCacheEvent
  | PasswordValidateFrontendEvent;
