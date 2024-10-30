import { ethers } from "ethers";
import React, { useState } from "react";
import LaunchERC721Info from "./Walkthrough/LaunchERC721Info";

declare global {
  interface Window {
    ethereum: any;
  }
}

const LaunchERC721 = () => {
  const [NFTName, setNFTName] = useState<string>("");
  const [NFTSymbol, setNFTSymbol] = useState<string>("");
  const [erc721Created, setERC721Created] = useState<string>("");

  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const ABI = ["function createERC721(string, string) public"];

  async function createERC721() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS || "",
          ABI,
          signer
        );

        const createContract = await contract.createERC721(NFTName, NFTSymbol);

        const receipt = await createContract.wait();
        console.log(receipt);

        if (receipt.status == 1) {
          setERC721Created("NFT created Successfully");
        } else {
          setERC721Created("Error creating NFTs");
        }
      } catch (error: any) {
        console.error("Error launching ERC721:", error);
        alert(
          "An error occurred while launching ERC721. Check console for details."
        );
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  return (
    <div>
      <div className="bg-gray-100">
        <br />
        <br />
        <br />
        <div className="flex justify-center bg-gray-100">
          <LaunchERC721Info />
        </div>

        <div>
          <div
            className="flex flex-col justify-center items-center bg-gray-100"
            style={{ height: "85vh" }}
          >
            <div className="bg-white shadow-md rounded-lg p-8 w-[450px] mb-6">
              <div>
                <label className="input input-bordered flex items-center gap-2 font-black text-xl">
                  NFT_Name
                  <input
                    type="text"
                    className="grow"
                    placeholder="MadLads"
                    onChange={(e) => setNFTName(e.target.value)}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl">
                  NFT_Symbol:
                  <input
                    type="text"
                    className="grow"
                    placeholder="MLADS"
                    onChange={(e) => setNFTSymbol(e.target.value)}
                  />
                </label>
              </div>

              <br />

              <button
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
                onClick={() => createERC721()}
              >
                Initialize the contract
              </button>

              <br />
              <br />
              {<div className="text-xl">{erc721Created}</div>}
            </div>

            <br />
            <br />
            <br />
            <br />

            <div className="text-center text-gray-700 font-medium">
              <ul className="steps text-xl">
                <li className="step step-primary">
                  <a href="./launcherc721">Deploy ERC721 Contract</a>
                </li>
                <li className="step">
                  <a href="./getcontractsbyuser">
                    Get the ERC721 contract Address
                  </a>
                </li>
                <li className="step">
                  <a href="./mintnft">Mint the NFTs</a>
                </li>
                <li className="step">
                  <a href="./approve">Approve NFTs (optional)</a>
                </li>
                <li className="step">
                  <a href="./approveallnfts">Approve all NFTs (optional)</a>
                </li>
                <li className="step">
                  <a href="./transfertoken">Transfer NFTs</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchERC721;
