const {ethers} = require("hardhat")
async function main(){
    const [deployer] = await ethers.getSigners()
    const token1contract = await ethers.getContractFactory("Token1")
    const token1 = await token1contract.deploy()
    await token1.deployed()
    console.log(`Deployed contract to ${token1.address}`)

    const token2contract = await ethers.getContractFactory("Token2")
    const token2 = await token2contract.deploy()
    await token2.deployed()
    console.log(`Deployed contract to ${token2.address}`)

    const liquiditycontract = await ethers.getContractFactory("TestUniswapLiquidity")
    const liquidity = await liquiditycontract.deploy()
    await liquidity.deployed()
    console.log(`Deployed contract to ${liquidity.address}`)

    const amount = ethers.utils.parseEther("1")
    const letsapprove1 = await token1.approve(liquidity.address,amount)
    await letsapprove1.wait()
    const amount2 = ethers.utils.parseEther("150")
    const letsapprove2 = await token2.approve(liquidity.address,amount2)
    await letsapprove2.wait()
    console.log("hi")

    // let amounta,amountb,liq;
    // const data ={amounta,amountb,liq}
     const tx=  await liquidity._addLiquidity(token1.address,token2.address,amount,amount2);
     //const tx_receipt=
     await tx.wait()

    const events = await liquidity.queryFilter("Log", 14390010, 14390020);
    console.log(events);
    //console.log(tx_receipt)

    console.log("removing")

    const tx2= await liquidity.removeLiquidity(token1.address,token2.address);
    await tx2.wait()

    const events2 = await liquidity.queryFilter("Log",14390010, 14390020);
    console.log(events2);

    //const tra =  await 


}

main()