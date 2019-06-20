import blockSchema from "../../blockchain/schemas/blockSchema";
import userSchema from "../../users/schemas/userSchema";

export default {
  type: 'object',
  properties: {
    amount: { type: 'integer' },
    timestamp: { type: 'integer' },
    rewardOfBlock: blockSchema,
    user: userSchema,
  },
}
