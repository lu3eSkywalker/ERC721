import React, { useState } from "react";
import { ethers } from "ethers";
import ApproveForAllNFTsOfContractInfo from "./Walkthrough/ApproveForAllNFTsOfContractInfo";
import Image from "next/image";
import asset1 from "../assets/asset1.png";
import asset2 from "../assets/asset2.jpeg";
import asset4 from "../assets/asset4.jpg";
import cryptoKitties from "../assets/cryptoKitties.jpg";
import pattern_randomized from "../assets/pattern-randomized.svg"


const ApprovalForAllNFTs = () => {
  const [recepientAddress, setRecepientAddress] = useState<string>(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );
  const [nftContractAddress, setNFTContractAddress] = useState<string>(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );
  const [trueBoolean, setTrueBoolean] = useState<boolean>(false);
  const [approvalResponse, setApprovalResponse] = useState<string>("");

  const ABI = ["function setApprovalForAll(address, bool) public"];

  async function approveAllNFTs() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          nftContractAddress || "",
          ABI,
          signer
        );

        const approveUser = await contract.setApprovalForAll(
          recepientAddress,
          trueBoolean
        );

        const response = await approveUser.wait();
        console.log(response.toString());

        if (response.status == 1) {
          setApprovalResponse("Approved The Request Successfully");
        } else {
          setApprovalResponse("Error Approving The Request");
        }
      } catch (error) {
        console.error("Error Approving NFTs:", error);
        alert(
          "An error occurred while approving the nfts. Check console for details."
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
        <div>
          <div className="flex justify-between items-center">
            <div className="flex justify-end">
              <Image src={asset2} alt="Description of the image" width={290} />
            </div>

            <div className="flex justify-center flex-grow ml-[200px]">
              <ApproveForAllNFTsOfContractInfo />
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
        </div>

        <div className="absolute left-0" style={{ marginTop: "1px" }}>
          <Image src={asset4} alt="Ethereum Logo" width={400} height={200} />
        </div>

        <div
          className="absolute right-0 rounded-full mx-[80px]"
          style={{ marginTop: "35px" }}
        >
          <Image src={cryptoKitties} alt="cryptoKitties" width={300} height={150} />
        </div>


        <div className="flex justify-center"></div>

        <div>
          <div
            className="flex flex-col justify-center items-center"
            style={{ height: "40vh" }}
          >
            <div className="absolute w-[500px] h-[350px] bg-blue-500 rounded-lg transform -rotate-6 opacity-50 my-[500px] top-[-20px]"></div>

            <div className="relative bg-white shadow-md rounded-lg p-8 w-[450px] mb-6">
              <div>
                <label className="input input-bordered flex items-center gap-2 font-black text-xl border-4">
                  Address:
                  <input
                    className="grow"
                    type="text"
                    placeholder="recepient address"
                    onChange={(e) => setRecepientAddress(e.target.value)}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 my-4 font-black text-xl border-4">
                  Address:
                  <input
                    className="grow"
                    type="text"
                    placeholder="NFT contract address"
                    onChange={(e) => setNFTContractAddress(e.target.value)}
                  />
                </label>
              </div>

              <button
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
                onClick={() => {
                  setTrueBoolean(true);
                  approveAllNFTs();
                }}
              >
                Approve All NFTs
              </button>

              <br />
              <br />
              {<div className="text-xl">{approvalResponse}</div>}
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div className="text-center text-gray-700 font-medium">
              <ul className="steps text-xl">
                <li className="step step-primary">
                  <a href="./launcherc721">Deploy ERC721 Contract</a>
                </li>
                <li className="step step-primary">
                  <a href="./getcontractsbyuser">
                    Get the ERC721 contract Address
                  </a>
                </li>
                <li className="step step-primary">
                  <a href="./mintnft">Mint the NFTs</a>
                </li>
                <li className="step step-primary">
                  <a href="./approve">Approve NFTs (optional)</a>
                </li>
                <li className="step step-primary">
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

export default ApprovalForAllNFTs;
