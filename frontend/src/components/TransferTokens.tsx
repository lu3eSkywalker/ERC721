import React, { useState } from "react";
import { ethers } from "ethers";

const TransferTokens = () => {
  const [senderAddress, setSenderAddress] = useState<string>(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );
  const [receiverAddress, setReceiverAddress] = useState<string>(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );
  const [tokenId, setTokenId] = useState<number>();
  const [contractAddress, setContractAddress] = useState<string>(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );

  const ABI = ["function transferFrom(address, address, uint256) public"];

  async function transferToken() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress || "",
          ABI,
          signer
        );

        const sendToken = await contract.transferFrom(
          senderAddress,
          receiverAddress,
          tokenId
        );

        const response = await sendToken.wait();
        console.log(response.toString());
      } catch (error: any) {
        console.error("Error launching token:", error);
        alert(
          "An error occurred while launching the token. Check console for details."
        );
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-80">
        <div>
          <input
            type="text"
            placeholder="sender Address"
            onChange={(e) => setSenderAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Receiver Address"
            onChange={(e) => setReceiverAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="contractAddress"
            onChange={(e) => setContractAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="token Id"
            onChange={(e) => setTokenId(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button onClick={() => transferToken()}>Transfer Token</button>
        </div>
      </div>
    </div>
  );
};

export default TransferTokens;
