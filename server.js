const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', express.static('public_static'));

app.get('/getAccounts', (req, res) => {
 
console.log("**** GET /getAccounts ****");
truffle_connect.start(function (answer) {
  res.send(answer);
});
});

app.get('/api/accounts', (req, res) => {
  console.log("**** GET /getAccounts ****");
  truffle_connect.start(function (answer) {
    console.log(answer);
    res.status(200).send({
      sucsses:'true',
      accounts:answer
    });
  })
});

app.get('/api/accounts/:id', (req, res) => {
  console.log("**** GET /getAccounts ****");
  truffle_connect.start(function (answer) {
    console.log(answer[req.params.id]);
    res.status(200).send({
      sucsses:'true',
      accounts:answer[req.params.id]
    });
  })
});



app.get('/api/balance/:id', (req, res) => {
  console.log("**** GET /getAccounts ****");
  var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

  truffle_connect.start(function (answer) {
    console.log(answer[req.params.id]);
  var balance =  web3.fromWei( web3.eth.getBalance(answer[req.params.id]),'ether')
  
 ;
    res.status(200).send({
      sucsses:'true',
      accounts:answer[req.params.id],
      balance:balance
    });
  })
});




// get transaction number
app.get('/api/get/transaction/number/:id', (req, res) => {
  console.log("**** GET /getAccounts ****");
 var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

  truffle_connect.start(function (answer) {
    console.log(answer[req.params.id]);
 var transactionCount = web3.eth.getTransactionCount(answer[req.params.id]) ;
    res.status(200).send({
      success: 'true',
      accounts:answer[req.params.id],
      NoOfTransaction:transactionCount
    });
  })
});



// get Tx Hash
app.get('/api/tx/hash/:id', (req, res) => {
  console.log("**** GET /getAccounts ****");
 var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  
  truffle_connect.start(function (answer) {
    console.log(answer[req.params.id]);
 var txHash = web3.eth.getTransaction('0xf2dee27ab9d5f9623c5f6569b12aacad390898a60c6992aadfd34a4d988336a8') ;
    res.status(200).send({
      success: 'true',
      accounts:answer[req.params.id],
      txHash:txHash
    });
  })
 
});






// get privatekey
app.get('/api/privatekey/:id', (req, res) => {
 
  var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

  truffle_connect.start(function (answer) {

    var accountPrivateKey = web3.eth.accounts.privateKeyToAccount(answer[req.params.id]) ;

     console.log(answer[req.params.id]);
     res.status(200).send({
      success: 'true',
      accountPrivateKey:accountPrivateKey, 
    });
  })
 
});




// get privatekey
app.get('/api/privatekeyonly/:id', (req, res) => {
 
  var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

  truffle_connect.start(function (answer) {

    var accountPrivateKey = web3.eth.accounts.privateKeyToAccount(answer[req.params.id]) ;

     console.log(answer[req.params.id]);
     res.status(200).send({
      success: 'true',
      accountPrivateKey:accountPrivateKey.privateKey, 
    });
  })
 
});









// get patient info
app.get('/api/get/medicaldata', (req, res) => {   
  truffle_connect.getMedicalData( (answer) => { 
      res.send(answer);
    }); 
});


// get patient Results
app.get('/api/get/results', (req, res) => {   
  truffle_connect.getResults( (answer) => { 
      res.send(answer);
    }); 
});



//send patient info
app.post('/api/send/medicaldata/:id', (req, res) => { 
  console.log(req.body);
  var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

  let fullname = req.body.fullname;
  let age = req.body.age;
  let medicaldata = req.body.medicaldata;
  
  let medicaldataExp = req.body.medicaldataExp;
  
  let keyN = req.body.keyN;
 
  truffle_connect.start(function (answer) {
    console.log(answer[req.params.id]); 
    truffle_connect.sendMedicalData(answer[req.params.id] ,
      fullname,age,medicaldata,medicaldataExp,keyN, (answer) => {
      res.send(answer);
    });
  })

  
});


//send patient results
app.post('/api/send/results/:id', (req, res) => { 
  console.log(req.body);
  var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

  let results = req.body.results;
  
  let rExpo = req.body.rExpo;
  console.log(req.body.rExpo);
  truffle_connect.start(function (answer) {
    console.log(answer[req.params.id]); 
    truffle_connect.sendResults(answer[req.params.id] ,
      results, rExpo,(answer) => {
      res.send(answer);
    });
  })

  
});





app.post('/getBalance', (req, res) => {
  console.log("**** GET /getBalance ****");
  console.log(req.body);
  let currentAcount = req.body.account;

  truffle_connect.refreshBalance(currentAcount, (answer) => {
    let account_balance = answer;
    truffle_connect.start(function(answer){
      // get list of all accounts and send it along with the response
      let all_accounts = answer;
      response = [account_balance, all_accounts]
      res.send(response);
    });
  });
});

app.post('/sendCoin', (req, res) => {
  console.log("**** GET /sendCoin ****");
  console.log(req.body);

  let amount = req.body.amount;
  let sender = req.body.sender;
  let receiver = req.body.receiver;

  truffle_connect.sendCoin(amount, sender, receiver, (balance) => {
    res.send(balance);
  });
});

app.listen(port, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

  console.log("Express Listening at http://localhost:" + port);

});
