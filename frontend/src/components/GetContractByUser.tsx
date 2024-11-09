import React, { useState } from "react";
import { ethers } from "ethers";
import GetContractsByUser from "./Walkthrough/GetContractsByUser";
import Image from "next/image";
import asset1 from "../assets/asset1.png";
import asset2 from "../assets/asset2.jpeg";
import asset4 from "../assets/asset4.jpg";
import cryptoPunks from "../assets/cryptoPunks.png";
import pattern_randomized from "../assets/pattern-randomized.svg"

const GetContractByUser = () => {
  const [userAddress, setUserAddress] = useState<string>(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );
  const [nftContractAddress, setNFTContractAddress] = useState<string[]>([]);

  const [contractFetchResponse, setContractFetchResponse] =
    useState<string>("");

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const ABI = [
    "function getUserContracts(address) public view returns (address[] memory)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(CONTRACT_ADDRESS || "", ABI, provider);

  async function getContractByUser() {
    const getContracts = await contract.getUserContracts(userAddress);
    const response = getContracts;
    console.log(response);
    setNFTContractAddress(response);

    if (response.length > 0) {
      setContractFetchResponse("");
    } else {
      setContractFetchResponse("Error Fetching the Contracts");
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
      <div className="">
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
            <GetContractsByUser />
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

        <div className="absolute left-0" style={{ marginTop: "1px" }}>
          <Image src={asset4} alt="Ethereum Logo" width={400} height={200} />
        </div>

        <div
          className="absolute right-0 rounded-full"
          style={{ marginTop: "20px" }}
        >
          <Image src={cryptoPunks} alt="cryptoPunks" width={300} height={150} />
        </div>

        <div>
          <div
            className="flex flex-col justify-center items-center"
            style={{ height: "35vh" }}
          >
            <div className="absolute w-[600px] h-[350px] bg-blue-500 rounded-lg transform -rotate-6 opacity-50 my-[500px] top-[-50px]"></div>

            <div className="relative bg-white shadow-md rounded-2xl p-8 w-[550px] mb-6">
              <div>
                <label className="input input-bordered flex items-center gap-2 font-black text-xl border-4">
                  Address:
                  <input
                    className="grow"
                    type="text"
                    placeholder="user address"
                    onChange={(e) => setUserAddress(e.target.value)}
                  />
                </label>
              </div>
              <br />

              <button
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
                onClick={() => getContractByUser()}
              >
                Get Contracts
              </button>

              <br />
              <br />

              <div className="min-h-8">
                {nftContractAddress?.map((data, index) => (
                  <div className="font-semibold text-xl" key={data || index}>
                    {data}
                  </div>
                ))}
              </div>
              {<div className="text-xl">{contractFetchResponse}</div>}
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

export default GetContractByUser;
