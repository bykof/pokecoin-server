export default {
  $id: 'Transaction',
  title: 'Transaction',
  description: 'The transaction schema',
  type: 'object',
  properties: {
    amount: { type: 'integer' },
    timestamp: { type: 'integer' },
    // Fix cause of circular import
    rewardOfBlock: { $ref: 'Block#' },
    user: { $ref: 'User#' },
  },
};
