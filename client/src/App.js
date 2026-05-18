import { ethers } from "ethers";
import { useState } from "react";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_did",
        type: "string",
      },
    ],
    name: "registerDID",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getDID",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

function App() {
  const [account, setAccount] = useState("");
  const [did, setDid] = useState("");
  const [inputDid, setInputDid] = useState("");
  const [loading, setLoading] = useState(false);

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
    } catch (err) {
      console.log(err);
      alert("Wallet connection failed");
    }
  }

  async function registerDID() {
    try {
      if (!inputDid) {
        alert("Enter DID");
        return;
      }

      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );

      const tx = await contract.registerDID(inputDid);

      await tx.wait();

      alert("✅ DID Registered Successfully");

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);

      if (err.message) {
        alert(err.message);
      }
    }
  }

  async function getDID() {
    try {
      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);

      const contract = new ethers.Contract(
        contractAddress,
        abi,
        provider
      );

      const result = await contract.getDID(account);

      setDid(result);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        color: "white",
      }}
    >
      <div
        style={{
          background: "#111827",
          padding: "40px",
          borderRadius: "20px",
          width: "420px",
          boxShadow: "0 0 25px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "38px",
          }}
        >
          🪪 Hash Identity
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#9ca3af",
            marginBottom: "30px",
          }}
        >
          Decentralized Identity System
        </p>

        <button
          onClick={connectWallet}
          style={{
            width: "100%",
            padding: "14px",
            background: "#2563eb",
            border: "none",
            borderRadius: "12px",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          {account ? "✅ Wallet Connected" : "Connect Wallet"}
        </button>

        {account && (
          <div
            style={{
              background: "#1f2937",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "20px",
              wordBreak: "break-all",
              fontSize: "14px",
            }}
          >
            {account}
          </div>
        )}

        <input
          type="text"
          placeholder="Enter DID"
          value={inputDid}
          onChange={(e) => setInputDid(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            marginBottom: "20px",
            fontSize: "15px",
            outline: "none",
          }}
        />

        <button
          onClick={registerDID}
          style={{
            width: "100%",
            padding: "14px",
            background: "#16a34a",
            border: "none",
            borderRadius: "12px",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "15px",
          }}
        >
          {loading ? "Processing..." : "Register DID"}
        </button>

        <button
          onClick={getDID}
          style={{
            width: "100%",
            padding: "14px",
            background: "#9333ea",
            border: "none",
            borderRadius: "12px",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Get My DID
        </button>

        {did && (
          <div
            style={{
              marginTop: "25px",
              background: "#1f2937",
              padding: "15px",
              borderRadius: "12px",
            }}
          >
            <p
              style={{
                color: "#9ca3af",
                marginBottom: "8px",
              }}
            >
              Your DID
            </p>

            <h3>{did}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;