import { ethers } from "ethers";
import React, { useState } from "react";

const LaunchERC721 = () => {
  const [NFTName, setNFTName] = useState<string>("");
  const [NFTSymbol, setNFTSymbol] = useState<string>("");

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const ABI = ["function createERC721(string, string) public"];

    async function createERC721() {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(CONTRACT_ADDRESS || "", ABI, signer);

          const createContract = await contract.createERC721(
              NFTName,
              NFTSymbol
          );

          const receipt = await createContract.wait();
          console.log(receipt);

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
            placeholder="NFT name"
            onChange={(e) => setNFTName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <br />

          <input
            type="text"
            placeholder="NFT symbol"
            onChange={(e) => setNFTSymbol(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button onClick={() => createERC721()}>Initialize the contract</button>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default LaunchERC721;