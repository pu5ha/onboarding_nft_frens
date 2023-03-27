// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

error RandomIpfsNft__AlreadyInitialized();
error RandomIpfsNft__NeedMoreETHSent();
error RandomIpfsNft__TransferFailed();

contract RandomGooNft is ERC721URIStorage, Ownable {
    // Types
    enum Person {
        MAMS,
        GREG,
        GRAY,
        WILL,
        RYDER,
        SEMEN,
        MIKE,
        JREIN,
        CION,
        PETE,
        SERGIO,
        BRAD,
        MRINAL,
        WILLIE,
        HOB
    }

    // NFT Variables
    uint256 private immutable i_mintFee = 0.001 ether;
    uint256 private s_tokenCounter;
    string[] internal s_peopleTokenUris;
    bool private s_initialized;

    // Events
    event NftMinted(Person person, address minter);

    constructor(
        string[15] memory peopleTokenUrils
    ) ERC721("Random Goo NFT", "RGN") {
        _initializeContract(peopleTokenUrils);
        s_tokenCounter = 0;
    }

    function mintNft() public payable {
        if (msg.value < i_mintFee) {
            revert RandomIpfsNft__NeedMoreETHSent();
        }
        uint256 newItemId = s_tokenCounter;
        s_tokenCounter = s_tokenCounter + 1;
        uint256 randomNumber = block.timestamp % 15;
        Person person = Person(randomNumber);
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, s_peopleTokenUris[uint256(person)]);
        emit NftMinted(person, msg.sender);
    }

    function _initializeContract(string[15] memory peopleTokenUrils) internal {
        if (s_initialized) {
            revert RandomIpfsNft__AlreadyInitialized();
        }
        s_peopleTokenUris = peopleTokenUrils;
        s_initialized = true;
    }

    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (!success) {
            revert RandomIpfsNft__TransferFailed();
        }
    }

    function getMintFee() public view returns (uint256) {
        return i_mintFee;
    }

    function getPeopleTokenUris(
        uint256 index
    ) public view returns (string memory) {
        return s_peopleTokenUris[index];
    }

    function getInitialized() public view returns (bool) {
        return s_initialized;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
