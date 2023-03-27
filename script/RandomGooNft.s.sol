// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/RandomGooNft.sol";

contract RandomGooNftScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        RandomGooNft randomGooNft = new RandomGooNft(
            [
                "ipfs://QmQUsTg5ZUp6EpGY5iaPZkH7hAfVcxs6dLcPBPLuEz9U4W",
                "ipfs://QmYPgXqcJ38sSw8hGS2SVEzp3A7gN2jZqT9LAmbJFHztbE",
                "ipfs://QmXqJBLavbwSZsXzmzCH2T86NnTydornrteBNDPzH9VBxs",
                "ipfs://QmS5XTFUzsCaPWaw5nubDvr4hFWhMaCAZa5hXLTDJdHpBv",
                "ipfs://QmWVNNJ6FXwaaxECpTGBV23sS2xMjLYuV97aK8UQD8F4qy",
                "ipfs://QmY5HpKsoYhQkAzpXCTe9YNBF7TrAPFT9rrs4NCqo1X2x3",
                "ipfs://Qmc5dspA77io3gSmqMXoYAyxaPwJ815C7csQvXWWvmbFay",
                "ipfs://QmUCQ41Q5B3hTrnmod6ZhWex8cHt3RXwyMMR5WKYu7GZJg",
                "ipfs://QmdAoXxZF8EXDRNzGgxMfd6SNUKtiQWpFVgCT3zDpjm8o6",
                "ipfs://QmQ8E69NsydFkxRJXw9ud3pgvhfU9j5NnYLgsUm7T9sgmn",
                "ipfs://QmXNUZ8tWuX3eMqAMKFw7TL1Fm7bGy12Z588AV25xMo8LW",
                "ipfs://QmcUCUtZrCJm6z65sTnVa2p21f2NPxZcty5zZ7nizkV3ZT",
                "ipfs://QmTjk1twsju1dLN9qHt1Ajs4bZAhenSmmsPuRoQFFBABXY",
                "ipfs://QmT7odeH7US7YGwz4NKCwYKvax5ssefmxrqTDRxV2cKmJ9",
                "ipfs://QmNa4f1WTtVrPsLuqirBiW2bwDWQWvfqwVDA4gSaXGEzRK"
            ]
        );

        vm.stopBroadcast();
    }
}
