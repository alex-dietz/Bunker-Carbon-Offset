// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./CarbonCreditsToken.sol";

contract MainContract is ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    address public admin;
    IERC20 public euroToken;
    CarbonCreditsToken public carbonCreditsToken;

    struct NFTDetails {
        uint256 tokenId;
        uint256 carbonCreditsAmount;
        string title;
        address buyer;
        string creator;
        uint256 timestamp;
    }

    mapping(uint256 => NFTDetails) public nftDetails;

    constructor(address _euroToken) ERC721("TransactionNFT", "TNFT") {
        admin = msg.sender;
        euroToken = IERC20(_euroToken);
        //carbonCreditsToken = CarbonCreditsToken(_carbonCreditsToken);
    }

    function setCarbonToken(address _carbonCreditsToken) public{
        require(msg.sender == address(admin), "Only the admin can call this.");
        carbonCreditsToken = CarbonCreditsToken(_carbonCreditsToken);
    }

    function initiateTrade(uint256 euroAmount) public {
        euroToken.transferFrom(msg.sender, address(carbonCreditsToken), euroAmount);
        carbonCreditsToken.requestCarbonCredits(msg.sender, euroAmount);
    }

    function finalizeCarbonAgreement(address _buyer, uint256 _carbonCreditsAmount) external {
        require(msg.sender == address(carbonCreditsToken), "Only the CarbonCreditsToken contract can call this.");

        // Mint NFT
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _mint(_buyer, tokenId);

        // Store NFT details
        nftDetails[tokenId] = NFTDetails({
            tokenId: tokenId,
            carbonCreditsAmount: _carbonCreditsAmount,
            title: "Carbon Credit Offseting Transaction NFT",
            creator: "KPI OceanConnect",
            buyer: _buyer,
            timestamp: block.timestamp
        });
    }
}
