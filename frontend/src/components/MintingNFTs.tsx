import React, { useState } from "react";
import { ethers } from "ethers";

const MintingNFTs = () => {
  const [nftAddress, setNFTAddress] = useState<string>(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );

  const [addressToMintNFTto, setAddressToMintNFTto] = useState<string>(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );

  const [nftURI, setNFTURI] = useState<string>("");

  const ABI = ["function mintTo(address, string) public"];

  async function mintNFTs() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(nftAddress || "", ABI, signer);

        const createContract = await contract.mintTo(
          addressToMintNFTto,
          nftURI
        );
        const response = createContract.toString();
        console.log(response);
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
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-80">
          <input
            type="text"
            placeholder="address of ERC721 contract"
            onChange={(e) => setNFTAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="address to mint the NFT to"
            onChange={(e) => setAddressToMintNFTto(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="NFT URI"
            onChange={(e) => setNFTURI(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button onClick={() => mintNFTs()}>Mint NFT</button>
        </div>
      </div>
    </div>
  );
};

export default MintingNFTs;