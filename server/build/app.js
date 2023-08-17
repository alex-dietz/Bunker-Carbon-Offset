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
const RPC_URL = "HTTP://127.0.0.1:7545";
const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(RPC_URL));
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
app.use(express_1.default.json()); // for parsing application/json
app.get("/store", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fromAddress = "0xD9B281Bb7B005f538797F648d213a0625dE1ae14";
        const value = 3;
        //store number in contract
        // @ts-ignore
        // Call the 'retrieve' function of the contract to get the stored value
        const retrievedValue = yield contract.methods.get().call();
        res.send(retrievedValue.toString());
    }
    catch (error) {
        res.status(500).send(`Error calling store function: ${error.message}`);
    }
}));
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
