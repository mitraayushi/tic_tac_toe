const { ethers } = require("ethers");
const dotenv = require("dotenv")
dotenv.config();

// Replace these with your own values
const providerUrl = `https://open-campus-codex-sepolia.drpc.org`; // E.g., Infura, Alchemy
const privateKey = process.env.PRIVATE_KEY; // The private key of the wallet that owns the contract
const contractAddress = process.env.CONTRACT_ADDRESS; // The address where your contract is deployed

// Create a provider and a wallet
const provider = new ethers.providers.JsonRpcProvider(providerUrl);
const wallet = new ethers.Wallet(privateKey, provider);

// ABI of the MyCustomToken contract
// const {abi} =require("../artifacts/contracts/CBToken.sol/MyCustomToken.json")
const abi = [
    "function mint(address to, uint256 amount) public",
    "function transfer(address to, uint amount) public returns (bool)"
];


// Create a contract instance
const contract = new ethers.Contract(contractAddress, abi, wallet);

async function mintTokens(toAddress, amount, times) {
    try {
        for (let i = 0; i < times; i++) {
            const tx = await contract.mint(toAddress, amount);
            console.log(`Minting ${amount} tokens to ${toAddress}. Transaction hash: ${tx.hash}`);
            await tx.wait();
            console.log(`Minted ${amount} tokens successfully.`);
        }
    } catch (error) {
        console.error("An error occurred while minting tokens:", error);
    }
}

// Example usage: Mint 1000 tokens to a specific address 5 times
const recipientAddress = "RECIPIENT_ADDRESS"; // Replace with the address where tokens will be minted
const mintAmount = ethers.utils.parseUnits("1000", 18); // Assuming 18 decimals
const mintTimes = 5;

mintTokens(recipientAddress, mintAmount, mintTimes);
