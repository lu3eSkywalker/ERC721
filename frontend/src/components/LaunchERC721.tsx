import { ethers } from "ethers";
import React, { useState } from "react";
import LaunchERC721Info from "./Walkthrough/LaunchERC721Info";
import { MetaMaskInpageProvider } from "@metamask/providers";
import Image from "next/image";
import asset1 from "../assets/asset1.png";
import asset2 from "../assets/asset2.jpeg";
import asset4 from "../assets/asset4.jpg";
import cryptoKitties from "../assets/cryptoKitties.jpg";
import pattern_randomized from "../assets/pattern-randomized.svg"

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const LaunchERC721 = () => {
  const [NFTName, setNFTName] = useState<string>("");
  const [NFTSymbol, setNFTSymbol] = useState<string>("");
  const [erc721Created, setERC721Created] = useState<string>("");
  const [loadingBar, setLoadingBar] = useState<boolean>(false);

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

        setLoadingBar(true);
        const receipt = await createContract.wait();
        setLoadingBar(false);
        console.log(receipt);

        if (receipt.status == 1) {
          setERC721Created("NFT created Successfully");
        } else {
          setERC721Created("Error creating NFTs");
        }
      } catch (error) {
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
    <div
      className="bg-container"
      style={{
        backgroundImage: `url(${pattern_randomized.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "90vh",
      }}
    >
      <div>
        <div className="flex justify-between items-center">
          <div className="flex justify-end">
            <Image
              src={asset2}
              alt="Description of the image"
              width={290}
              // height={100}
            />
          </div>

          <div className="flex justify-center flex-grow ml-[200px]">
            <LaunchERC721Info />
          </div>

          <div className="flex justify-start">
            <Image
              src={asset1}
              alt="Description of the image"
              width={500}
              height={300}
            />
          </div>
        </div>

        <div className="absolute left-0" style={{ marginTop: "10px" }}>
          <Image src={asset4} alt="Ethereum Logo" width={400} height={200} />
        </div>

        <div
          className="absolute right-0 rounded-full"
          style={{ marginTop: "20px" }}
        >
          <Image
            src={cryptoKitties}
            alt="cryptoKitties"
            width={300}
            height={150}
          />
        </div>

        <div>
          <div
            className="flex flex-col justify-center items-center"
            style={{ height: "15vh" }}
          >
            {/* Background tilted card */}
            <div className="absolute w-[550px] h-[400px] bg-blue-500 rounded-lg transform -rotate-6 opacity-50"></div>

            {/* Form Container */}
            <div className="relative bg-white shadow-md rounded-2xl p-8 w-[450px] mb-6">
              <div>
                <label className="input input-bordered flex items-center gap-2 font-black text-xl border-4">
                  NFT_Name
                  <input
                    type="text"
                    className="grow"
                    placeholder="MadLads"
                    onChange={(e) => setNFTName(e.target.value)}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 my-4 font-black text-xl border-4">
                  NFT_Symbol:
                  <input
                    type="text"
                    className="grow"
                    placeholder="MLADS"
                    onChange={(e) => setNFTSymbol(e.target.value)}
                  />
                </label>
              </div>

              <button
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
                onClick={() => createERC721()}
              >
                Initialize the contract
              </button>

              <br />
              <br />

              {loadingBar ? (
                <div>
                  <div className="font-bold mx-[90px]">
                    Transaction Processing...
                  </div>
                  <div className="mx-[85px]">
                    <progress className="progress w-56"></progress>
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              {<div className="text-xl">{erc721Created}</div>}
            </div>
          </div>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />


          {/* <div className="bg-purple-200 rounded-2xl p-5"> */}
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
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default LaunchERC721;
