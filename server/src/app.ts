import express from "express";
import Web3 from "web3";
const app = express();
const PORT = 3000;
const RPC_URL = "https://intensive-flashy-morning.matic-testnet.discover.quiknode.pro/8206d52b4c4e2a29f905f5e3c5cb8d58dd3371d7/";
const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
// Contract details
const CONTRACT_ADDRESS = "0xf8e81D47203A594245E36C48e151709F0C19fBe8";
const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "num",
        type: "uint256"
      }
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "retrieve",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

// Create contract instance
let contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
app.use(express.json()); // for parsing application/json

app.get("/store", async (req, res) => {
  try {
    const fromAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
    const value: any = 3;
    //store number in contract
    // @ts-ignore
    // Call the 'retrieve' function of the contract to get the stored value
    const retrievedValue = await contract.methods.retrieve().call();

    console.log("Retrieved value:", retrievedValue);

    res.send(retrievedValue);
  } catch (error: any) {
    res.status(500).send(`Error calling store function: ${error.message}`);
  }
});
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
