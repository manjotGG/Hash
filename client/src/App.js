import { ethers } from "ethers";
import { useState } from "react";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "did",
        "type": "string"
      }
    ],
    "name": "DIDRegistered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getDID",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_did",
        "type": "string"
      }
    ],
    "name": "registerDID",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

function App() {
  const [account, setAccount] = useState("");
  const [did, setDid] = useState("");

  // 🔗 CONNECT WALLET
  async function connectWallet() {
    try {
      if (!window.ethereum) {
        alert("Install MetaMask");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setAccount(address);

      alert("Wallet Connected: " + address);
      console.log("Connected:", address);

    } catch (err) {
      console.log("CONNECT ERROR:", err);
      alert(err.message || "Connection failed");
    }
  }

  // 🪪 REGISTER DID
  async function registerDID() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(contractAddress, abi, signer);

      const tx = await contract.registerDID("did:hash:manjot");

      await tx.wait();

      alert("✅ DID Registered!");

    } catch (err) {
      console.log("REGISTER ERROR:", err);
      alert(err.reason || err.message || "Registration failed");
    }
  }

  // 🔍 GET DID
  async function getDID() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);

      const contract = new ethers.Contract(contractAddress, abi, provider);

      const result = await contract.getDID(account);

      setDid(result);

    } catch (err) {
      console.log("GET ERROR:", err);
      alert(err.message || "Failed to fetch DID");
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🪪 Hash Identity</h1>

      <button onClick={connectWallet}>Connect Wallet</button>
      <p>{account}</p>

      <br />

      <button onClick={registerDID}>Register DID</button>
      <button onClick={getDID}>Get DID</button>

      <h3>{did}</h3>
    </div>
  );
}

export default App;