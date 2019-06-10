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
    username: { type: 'string' },
  }
}

export const responseFailedSchema = {
  type: 'object',
  properties: {
    code: { type: 'string', enum: ['UserAlreadyExists'] },
    message: { type: 'string' },
    username: { type: 'string' },
  }
}
