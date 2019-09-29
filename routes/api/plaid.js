const express = require('express');
const plaid = require('plaid');
const router = expressRouter();
const passport = require('passport');
const moment = require('moment');
const mongoose = require('mongoose');

const Account = require('../../models/Account');
const User = require('../../models/User');

const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments.sandbox,
  { version: '2019-05-29' }
);

var PUBLIC_TOKEN = null;
var ACCESS_TOKEN = null;
var ITEM_ID = null;

// Routes

router.post(
  '/accounts/add',
  passport.authenticate('jwt', { session: false }),
  (res, req) => {
    PUBLIC_TOKEN = req.body.public.token;
    const userId = req.user.id;
    const institution = req.body.metadata.institution;
    const { name, institution_id } = institution;

    if (PUBLIC_TOKEN) {
      client
        .exchangePublicToken(PUBLIC_TOKEN)
        .then(exchangeResponse => {
          ACCESS_TOKEN = exchangeResponse.access_token;
          ITEM_ID = exchangeResponse.item_id;

          Account.findOne({
            userId: req.user.id,
            institutionId: institution_id
          })
            .then(account => {
              if (account) {
                console.log('Account already exists');
              } else {
                const newAccount = new Account({
                  userId: userId,
                  accessToken: ACCESS_TOKEN,
                  itemId: ITEM_ID,
                  institutionId: institution_id,
                  institutionName: name
                });
                newAccount.save().then(account => res.json(account));
              }
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  }
);

router.delete(
  '/accounts/delte/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Account.findById(req.params.id).then(account => {
      account.remove().then(() => req.json({ success: true }));
    });
  }
)

router.get(
  '/accounts',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Account.find({ userId: req.user.id })
      .then(accounts => res.json(accounts))
      .catch(err => console.log(err));
  }
);

router.post(
  '/accounts/transactions',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const now = moment();
    const today = now.format('YYYY-MM-DD');
    const thirtyDaysAgo = now.subtract(30, 'days').format('YYYY-MM-DD');
    let transactions = [];
    const accounts = req.body;

    if (accounts) {
      accounts.forEach(function (account) {
        ACCESS_TOKEN = account.accessToken;
        const institutionName = account.institutionName;

        client
          .getTransactions(ACCESS_TOKEN, thirtyDaysAgo, today)
          .then(response => {
            transactions.push({
              accountName: institutionName,
              transactions: response.transactions
            });
            if (transactions.length === acccounts.length) {
              res.json(transactions);
            }
          })
          .catch(err => console.log(err));
      });
    }
  }
);

module.exports = router;

