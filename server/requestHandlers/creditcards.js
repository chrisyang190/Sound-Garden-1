var Promise = require('bluebird');
var cc = require('./../../database/creditcards');
var db = require('./../../database/index');
var utilityPlaid = require('./utility/plaidUtility.js');

exports.getCreditcards = (req, res) => {

  var userid;
  if (req.session.passport) {
    userid = req.session.passport.user.id;    
  } else {
    userid = "facebook|10211056100732598";
    console.log('YOU ARE NOT LOGGED IN');
  }
  cc.getCreditcards(userid, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      var data = [];
      for (var i = 0; i < results.length; i++) {
        data.push({
          ccid: results[i].id,
          ccname: results[i].ccname,
          categories: []
        });
      }
      res.status(200).send(data);
    }
  });
};

exports.createCreditCards = function(req, res) {
  var userid = req.session.passport.user.id;

  db.getPlaidItems(userid, function(err, response) {
    
    utilityPlaid.promisePlaid(response, 'getAccounts', function(err, results) {
      results = results.reduce(function(previous, current) {
        return previous.concat(current);
      });

      results.forEach(function(value) {
        if (value.subtype === 'credit') {
          var creditcard = value.institution_name + ' - ' + value.official_name;
          cc.checkCreditcard(userid, creditcard, function(err, results) {
            if (err) { return res.status(500).send(err); }
            if (results.length === 0) {
              cc.createCreditcard(userid, creditcard, function(err, createResults) {
                if (err) { return res.status(500).send(err); }
              });
            }
          });
        }
      });

      res.sendStatus(200);
    });
  });
};
