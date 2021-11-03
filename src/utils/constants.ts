export enum RequestMethods {
  POST = 'POST',
}

export enum RequestHeaders {
  CONTENT_TYPE = 'Content-Type',
}

export enum MimeTypes {
  JSON = 'application/json',
  URL_ENCODED = 'application/x-www-form-urlencoded',
}

export enum Urls {
  RECAPTCHA_VERIFY = 'https://www.google.com/recaptcha/api/siteverify',
}

export enum StatusTexts {
  OK = 'OK',
}

export enum ErrorMsgs {
  RECAPTCHA_SERVICE_FAIL = 'An error occurred while attempting to contact reCAPTCHA services',
  RECAPTCHA_VERIFY_FAIL = 'reCAPTCHA verification failed',
  RECAPTCHA_RESPONSE_FAIL = 'reCAPTCHA returned an unsuccessful API response',
  AWS_SERVICE_FAIL = 'An error occurred while attempting to contact AWS services',
}

export enum Msgs {
  INDEX_GREETING = 'Welcome to the coped.dev API.',
}

export enum Envs {
  PRODUCTION = 'production',
  DEVELOPMENT = 'developement',
}
