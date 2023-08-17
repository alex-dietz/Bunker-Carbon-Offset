// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./MainContract.sol";

contract CarbonCreditsToken is ERC20 {
    address public admin;
    address public carbonCreditSupplier;
    MainContract public mainContract;
    mapping(address => uint256) public pendingCredits;

    constructor(address _mainContract) ERC20("CarbonCreditsToken", "CC") {
        admin = msg.sender;
        mainContract = MainContract(_mainContract);
    }

   function setCarbonCreditSupplier(address _carbonCreditSupplier) public{
        require(msg.sender == address(admin), "Only the admin can call this.");
        carbonCreditSupplier = _carbonCreditSupplier;
    }

    function requestCarbonCredits(address buyer, uint256 euroAmount) external {
        require(msg.sender == address(mainContract), "Only the MainContract can call this.");
        pendingCredits[buyer] = euroAmount; // Store the amount of EuroToken received.
    }

    modifier onlyCarbonCreditSupplier() {
        require(msg.sender == address(carbonCreditSupplier), "Only CarbonCreditSupplier can call this");
        _;
    }

    function agreeToProvideCarbon(address buyer) public onlyCarbonCreditSupplier {
        uint256 euroAmount = pendingCredits[buyer];
        require(euroAmount > 0, "No pending credits found");

        // Send the carbon credits amount back to the MainContract
        uint256 carbonCreditsAmount = euroAmount; // Assuming a 1:1 ratio for simplicity.
        _mint(address(mainContract), carbonCreditsAmount);
        pendingCredits[buyer] = 0;
        mainContract.finalizeCarbonAgreement(buyer, carbonCreditsAmount);
    }
}
