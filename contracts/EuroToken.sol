// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EuroToken is ERC20 {
    address public admin;

    constructor() ERC20("EuroToken", "EUR") {
        admin = msg.sender;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == address(admin), "Only admin can mint");
        _mint(to, amount);
    }
}