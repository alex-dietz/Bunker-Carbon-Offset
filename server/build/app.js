"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const web3_1 = __importDefault(require("web3"));
const app = (0, express_1.default)();
const PORT = 3000;
const RPC_URL = "https://intensive-flashy-morning.matic-testnet.discover.quiknode.pro/8206d52b4c4e2a29f905f5e3c5cb8d58dd3371d7/";
const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(RPC_URL));
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
app.use(express_1.default.json()); // for parsing application/json
app.get("/store", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fromAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
        const value = 3;
        //store number in contract
        // @ts-ignore
        // Call the 'retrieve' function of the contract to get the stored value
        const retrievedValue = yield contract.methods.retrieve().call();
        console.log("Retrieved value:", retrievedValue);
        res.send(retrievedValue);
    }
    catch (error) {
        res.status(500).send(`Error calling store function: ${error.message}`);
    }
}));
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
