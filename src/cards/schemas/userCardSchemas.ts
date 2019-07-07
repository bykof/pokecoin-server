import userCardSchema from "./userCardSchema"

export const responseSuccessfulSchema = {
  type: 'array',
  items: userCardSchema,
}
