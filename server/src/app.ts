import express from "express";
import Web3 from "web3";
const app = express();
const PORT = 3000;
const RPC_URL = "http://192.168.215.184:7545";
const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
// Contract details
const CONTRACT_ADDRESS = "0x9feb458a1035aeD7071F6a21FA38B90B00cD3D7A";
const CONTRACT_ABI = [
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256"
      }
    ],
    name: "set",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "get",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

// Create contract instance
let contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
app.use(express.json()); // for parsing application/json

app.get("/store", async (req, res) => {
  try {
    const fromAddress = "0xD9B281Bb7B005f538797F648d213a0625dE1ae14";
    const value: any = 3;
    //store number in contract
    // @ts-ignore
    // Call the 'retrieve' function of the contract to get the stored value
    const retrievedValue = await contract.methods.get().call();

    console.log("Retrieved value:", retrievedValue);

    res.send(retrievedValue);
  } catch (error: any) {
    res.status(500).send(`Error calling store function: ${error.message}`);
  }
});
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
