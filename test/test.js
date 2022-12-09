const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Liquidity", function () {
  async function deploy(){
    const [deployer] = await ethers.getSigners()
    const token1contract = await ethers.getContractFactory("Token1")
    const token1 = await token1contract.deploy()
    await token1.deployed()
    const token2contract = await ethers.getContractFactory("Token2")
    const token2 = await token2contract.deploy()
    await token2.deployed()
    const liquiditycontract = await ethers.getContractFactory("TestUniswapLiquidity")
    const liquidity = await liquiditycontract.deploy()
    await liquidity.deployed()
    return {token1,token2,liquidity,deployer}
  }

  
  it("token1 should be able to mint",async()=>{
    const {token1,token2,deployer} = await loadFixture(deploy)
    const amount = ethers.utils.parseEther("1")
    const abletomint = await token1.mint(deployer.address,amount)
    await abletomint.wait()
    expect(token1.balanceOf(deployer.address), 11000000000000000000)
  })

  it("token2 should be able to mint",async()=>{
    const {token1,token2,deployer} = await loadFixture(deploy)
    const amount = ethers.utils.parseEther("1")
    const abletomint = await token2.mint(deployer.address,amount)
    await abletomint.wait()
    expect(token2.balanceOf(deployer.address), 1501000000000000000000)
  })

  it("token1 should revert if contract calls mint fn",async()=>{
    const {token1,token2,deployer} = await loadFixture(deploy)
    const amount = ethers.utils.parseEther("1")
    expect(token1.mint(token1.address,amount)).to.be.reverted;
  })

  it("token2 should revert if contract calls mint fn",async()=>{
    const {token1,token2,deployer} = await loadFixture(deploy)
    const amount = ethers.utils.parseEther("1")
    expect(token2.mint(token2.address,amount)).to.be.reverted;
  })

  it("should approve liquidity contract", async () => {
    const{token1,token2,liquidity,deployer} = await loadFixture(deploy)
    const amount = ethers.utils.parseEther("1")
    const letsapprove1 = await token1.approve(liquidity.address,amount)
    await letsapprove1.wait()
    const amount2 = ethers.utils.parseEther("150")
    const letsapprove2 = await token2.approve(liquidity.address,amount2)
    await letsapprove2.wait()
    expect(token1.allowance(token1.address,liquidity.address),(amount))
    expect(token2.allowance(token2.address,liquidity.address),(amount2))
  });

  it("check owner balance", async function () {
    const{token1,token2,liquidity,deployer} = await loadFixture(deploy)
    expect(await token1.totalSupply(),(10000000000000000000));
    expect(await token2.totalSupply(),(1500000000000000000000));
  });

  it("adds liquidity", async function () {
    const{token1,token2,liquidity,deployer} = await loadFixture(deploy)
    const amount = ethers.utils.parseEther("1")
    const letsapprove1 = await token1.approve(liquidity.address,amount)
    await letsapprove1.wait()
    const amount2 = ethers.utils.parseEther("150")
    const letsapprove2 = await token2.approve(liquidity.address,amount2)
    await letsapprove2.wait()
    const tx = await liquidity.addLiquidity(token1.address, token2.address,amount,amount2);
    await tx.wait();
    const events = await liquidity.queryFilter("Log", 14390010, 14390020);
    //console.log(events);

    //check if liquiditytokens are minted
    expect(events[2].args.val).not.equals(0);
  });

  it("removes liquidity", async function () {
    const{token1,token2,liquidity,deployer} = await loadFixture(deploy)
    const amount = ethers.utils.parseEther("1")
    const letsapprove1 = await token1.approve(liquidity.address,amount)
    await letsapprove1.wait()
    const amount2 = ethers.utils.parseEther("150")
    const letsapprove2 = await token2.approve(liquidity.address,amount2)
    await letsapprove2.wait()
    const tx = await liquidity.addLiquidity(token1.address, token2.address,amount,amount2);
    await tx.wait();
    const tx2 = await liquidity.removeLiquidity(token1.address, token2.address)
    await tx2.wait();

    
  });



});