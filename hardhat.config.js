require("@nomicfoundation/hardhat-toolbox");


module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/LeCpOxKARAdyrod1Pa2gRWQykFCky5wI",
        blockNumber: 14390000,
      },
    },
  },
};



  //   'truffle-dashboard':{
  //     url : "http://localhost:24012/rpc"
  //   }
  // }
  
