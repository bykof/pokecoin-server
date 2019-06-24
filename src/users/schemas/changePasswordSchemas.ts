export const responseSuccessfulSchema = {
  type: 'object',
  description: 'Successfully changed password',
}

export const bodySchema = {
  type: 'object',
  properties: {
    'password': { type:'string' },
    'newPassword': { type:'string' },
  },
  required: ['password', 'newPassword'],
}
