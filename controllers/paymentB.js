var braintree = require("braintree");
//Connections To Braintree Sever
var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   '2mb46jdtxhhvpxff',
    publicKey:    'wymqvpj3sdgncqgg',
    privateKey:   '00a71d1ed76fb05f94cd54d94108dc01'
});

exports.gettoken = (req,res) => {
    gateway.clientToken.generate({},(err, response) => {
        if(err){
            return res.status(500).send(err);
        }else{
            console.log(response.clientToken);
            clientToken = response.clientToken;
            return res.send(clientToken);
        }
      });

}


exports.processpayment = (req,res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        //deviceData: deviceDataFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err){
            return res.status(400).json(err);
          }
          else{
              return res.status(200).json(result);
          }
      });
}
