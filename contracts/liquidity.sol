// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";



interface IUniswapV2Router {

  function addLiquidity(
    address tokenA,
    address tokenB,
    uint amountADesired,
    uint amountBDesired,
    uint amountAMin,
    uint amountBMin,
    address to,
    uint deadline
  )
    external
    returns (
      uint amountA,
      uint amountB,
      uint liquidity
    );

  function removeLiquidity(
    address tokenA,
    address tokenB,
    uint liquidity,
    uint amountAMin,
    uint amountBMin,
    address to,
    uint deadline
  ) external returns (uint amountA, uint amountB);
}



interface IUniswapV2Factory {

  function getPair(address tokenA, address tokenB) external view returns (address pair);

  
}

interface IUniswapV2ERC20 {
    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);
    function name() external pure returns (string memory);
    function symbol() external pure returns (string memory);
    function decimals() external pure returns (uint8);
    function totalSupply() external view returns (uint);
    function balanceOf(address owner) external view returns (uint);
    function allowance(address owner, address spender) external view returns (uint);
    function approve(address spender, uint value) external returns (bool);
    function transfer(address to, uint value) external returns (bool);
    function transferFrom(address from, address to, uint value) external returns (bool);
    function DOMAIN_SEPARATOR() external view returns (bytes32);
    function PERMIT_TYPEHASH() external pure returns (bytes32);
    function nonces(address owner) external view returns (uint);
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;
}

contract TestUniswapLiquidity {
  address private constant _FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
  address private constant _ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  address private constant _WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
  address private _Uniswaperc20 = 0xEce5022B744D87071FE96E599CC4Bebc977BC260;


  IUniswapV2Router public UniswapV2Router = IUniswapV2Router(_ROUTER);
  IUniswapV2Factory public UniswapFactory = IUniswapV2Factory(_FACTORY);
  IUniswapV2ERC20 public  UniswapERC20 = IUniswapV2ERC20(_Uniswaperc20);
  event Log(string message, uint val);

  function _addLiquidity(
    address _tokenA,
    address _tokenB,
    uint _amountA,
    uint _amountB
  ) external {
    IERC20(_tokenA).transferFrom(msg.sender, address(this), _amountA);
    IERC20(_tokenB).transferFrom(msg.sender, address(this), _amountB);

    IERC20(_tokenA).approve(_ROUTER, _amountA);

    IERC20(_tokenB).approve(_ROUTER, _amountB);

    (uint amountA, uint amountB, uint liquidity) =
      UniswapV2Router.addLiquidity(
        _tokenA,
        _tokenB,
        _amountA,
        _amountB,
        1,
        1,
        address(this),
        block.timestamp
      );

    emit Log("amountA", amountA);
    emit Log("amountB", amountB);
    emit Log("liquidity", liquidity);
  }

  function removeLiquidity(address _tokenA, address _tokenB) external {
    address pair = IUniswapV2Factory(_FACTORY).getPair(_tokenA, _tokenB);

    uint liquidity = IERC20(pair).balanceOf(address(this));
    IERC20(pair).approve(_ROUTER, liquidity);

    (uint amountA, uint amountB) =
      IUniswapV2Router(_ROUTER).removeLiquidity(
        _tokenA,
        _tokenB,
        liquidity,
        1,
        1,
        address(this),
        block.timestamp
      );



    emit Log("amountA", amountA);
    emit Log("amountB", amountB);
  }
}
