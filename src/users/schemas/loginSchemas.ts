export const bodySchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['username', 'password'],
}

export const responseSuccessfulSchema = {
  type: 'object',
  properties: {
    token: { type: 'string' },
  }
}

export const responseFailedSchema = {
  type: 'object',
  properties: {
    code: { type: 'string', enum: ['UserNotFoundError', 'PasswordIncorrectError'] },
    message: { type: 'string' },
    username: { type: 'string' },
  }
}
