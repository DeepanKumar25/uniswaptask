const {ethers} = require("hardhat")
const fs = require("fs");
const path = require("path")
async function main(){
    const [deployer] = await ethers.getSigners()
    const token1contract = await ethers.getContractFactory("Token1")
    const token1 = await token1contract.deploy()
    await token1.deployed()
    console.log(`Deployed contract to ${token1.address}`)

    fs.writeFileSync(path.join(__dirname,"../build/token1.json"),`{"contract address" : "${token1.address}",`)
     const getTheAbi = () => {
    try {
    const dir = path.resolve(
      __dirname,
      "../artifacts/contracts/token1.sol/Token1.json"
    )
    const file = fs.readFileSync(dir, "utf8")
    const json = JSON.parse(file)
    const abi = json.abi
    //console.log(`abi`, abi)

    return  JSON.stringify(abi)
  } catch (e) {
    console.log(`e`, e)
  }
}
fs.appendFileSync(path.join(__dirname,"../build/token1.json"),`"abi" : ${await getTheAbi()}}`)

    const token2contract = await ethers.getContractFactory("Token2")
    const token2 = await token2contract.deploy()
    await token2.deployed()
    console.log(`Deployed contract to ${token2.address}`)

    fs.writeFileSync(path.join(__dirname,"../build/token2.json"),`{"contract address" : "${token2.address}",`)
    const getTheAbi2= () => {
   try {
   const dir = path.resolve(
     __dirname,
     "../artifacts/contracts/token2.sol/Token2.json"
   )
   const file = fs.readFileSync(dir, "utf8")
   const json = JSON.parse(file)
   const abi = json.abi
   //console.log(`abi`, abi)

   return  JSON.stringify(abi)
 } catch (e) {
   console.log(`e`, e)
 }
}
fs.appendFileSync(path.join(__dirname,"../build/token2.json"),`"abi" : ${await getTheAbi2()}}`)

    const liquiditycontract = await ethers.getContractFactory("TestUniswapLiquidity")
    const liquidity = await liquiditycontract.deploy()
    await liquidity.deployed()
    console.log(`Deployed contract to ${liquidity.address}`)

    fs.writeFileSync(path.join(__dirname,"../build/liquidity.json"),`{"contract address" : "${liquidity.address}",`)
     const getTheAbi3 = () => {
    try {
    const dir = path.resolve(
      __dirname,
      "../artifacts/contracts/liquidity.sol/TestUniswapLiquidity.json"
    )
    const file = fs.readFileSync(dir, "utf8")
    const json = JSON.parse(file)
    const abi = json.abi
    //console.log(`abi`, abi)

    return  JSON.stringify(abi)
  } catch (e) {
    console.log(`e`, e)
  }
}
fs.appendFileSync(path.join(__dirname,"../build/liquidity.json"),`"abi" : ${await getTheAbi3()}}`)

    const amount = ethers.utils.parseEther("1")
    const letsapprove1 = await token1.approve(liquidity.address,amount)
    await letsapprove1.wait()
    const amount2 = ethers.utils.parseEther("150")
    const letsapprove2 = await token2.approve(liquidity.address,amount2)
    await letsapprove2.wait()
    console.log("hi")

    // let amounta,amountb,liq;
    // const data ={amounta,amountb,liq}
     const tx=  await liquidity.addLiquidity(token1.address,token2.address,amount,amount2);
     //const tx_receipt=
     await tx.wait()

    const events = await liquidity.queryFilter("Log");
    console.log(events);
    //console.log(tx_receipt)

    console.log("removing")

    const tx2= await liquidity.removeLiquidity(token1.address,token2.address);
    await tx2.wait()

    const events2 = await liquidity.queryFilter("Log");
    console.log(events2);

    //const tra =  await 


}

main()