const contract = require('truffle-contract');

const metacoin_artifact = require('../build/contracts/MetaCoin.json');
var MetaCoin = contract(metacoin_artifact);


const medicalTrans_artifact = require('../build/contracts/MedicalTrans.json');
var MedicalTrans = contract(medicalTrans_artifact);


module.exports = {
  start: function(callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);
    MedicalTrans.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    self.web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        console.log("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      self.accounts = accs;
      self.account = self.accounts[2];

      callback(self.accounts);
    });
  },


  sendMedicalData: function(sender ,fullname,age,medicaldata,medicaldataExp,keyN ,callback) {
    var self = this;
    MedicalTrans.setProvider(self.web3.currentProvider);

    var meta;
    MedicalTrans.deployed().then(function(instance) {
      meta = instance;
      return meta.sendMedicalData(fullname,age,medicaldata,medicaldataExp,keyN ,{from: sender});
    }).then(function() {
      self.getMedicalData(  function (answer) {
        callback(answer);
      });
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  
  sendResults: function(sender ,results,rExpo,callback) {
    var self = this;
    MedicalTrans.setProvider(self.web3.currentProvider);

    var meta;
    MedicalTrans.deployed().then(function(instance) {
      meta = instance;
      return meta.sendResults(results,rExpo,{from: sender});
    }).then(function() {
      self.getResults(  function (answer) {
        callback(answer);
      });
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  },


  getMedicalData: function(  callback) {
    var self = this; 
    MedicalTrans.setProvider(self.web3.currentProvider); 
    var meta;
    MedicalTrans.deployed().then(function(instance) {
      meta = instance;
      return meta.getMedicalData();
    }).then(function(value) {
        callback(value );
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },

  getResults: function(  callback) {
    var self = this; 
    MedicalTrans.setProvider(self.web3.currentProvider); 
    var meta;
    MedicalTrans.deployed().then(function(instance) {
      meta = instance;
      return meta.getResults();
    }).then(function(value) {
        callback(value );
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },

  refreshBalance: function(account, callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(account, {from: account});
    }).then(function(value) {
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
  
  sendCoin: function(amount, sender, receiver, callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.sendCoin(receiver, amount, {from: sender});
    }).then(function() {
      self.refreshBalance(sender, function (answer) {
        callback(answer);
      });
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  }
}
