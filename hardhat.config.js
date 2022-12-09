require("@nomicfoundation/hardhat-toolbox");
const path = require("path");
require("dotenv").config();
require('hardhat-contract-sizer');
const {API_KEY}= process.env;

module.exports = {
    networks: {
    hardhat: {
      forking: {
        url: `https://mainnet.infura.io/v3/${API_KEY}`,
      },
    },
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
   // only: [':ERC20$'],
  }
};



  //   'truffle-dashboard':{
  //     url : "http://localhost:24012/rpc"
  //   }
  // }
  //compiler
  
