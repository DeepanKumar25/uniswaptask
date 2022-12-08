// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token1 is ERC20, Ownable {
    constructor() ERC20("token1", "t1") {
        _mint(msg.sender,10*10**18);
        }

     function mint(address to, uint256 amount) public  {
        require(checkadd(to),"it is a contract");
        _mint(to, amount);
    }


function checkadd(address to )public view  returns(bool){
        uint codelength;
        assembly{codelength := extcodesize(to)}
        return codelength ==0 ? true : false ;
        }


   
}