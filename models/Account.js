const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  accessToken: {
    type: String,
    Required: true
  },
  itemId: {
    type: String,
    required: true
  },
  institutionsId: {
    type: String,
    required: true
  },
  institutionsName: {
    type: String
  },
  accountName: {
    type: String
  },
  accountType: {
    type: String
  },
  accountSubType: {
    type: String
  }
});

module exports = Account = mongoose.model('account', AccountSchema);