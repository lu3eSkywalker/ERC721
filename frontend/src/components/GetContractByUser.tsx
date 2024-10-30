import React, { useState } from "react";
import { ethers } from "ethers";
import GetContractsByUser from "./Walkthrough/GetContractsByUser";

const GetContractByUser = () => {
  const [userAddress, setUserAddress] = useState<string>(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );
  const [nftContractAddress, setNFTContractAddress] = useState<string>("");

  const [contractFetchResponse, setContractFetchResponse] =
    useState<string>("");

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const ABI = [
    "function getUserContracts(address) public view returns (address[] memory)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(CONTRACT_ADDRESS || "", ABI, provider);

  async function getContractByUser() {
    const getContracts = await contract.getUserContracts(userAddress);
    const response = await getContracts.wait();
    setNFTContractAddress(response);

    if (response.status == 1) {
      setContractFetchResponse("");
    } else {
      setContractFetchResponse("Error Fetching the Contracts");
    }
  }

  return (
    <div>
      <div className="bg-gray-100">
        <br />
        <br />
        <br />
        <div className="flex justify-center bg-gray-100">
          <GetContractsByUser />
        </div>

        <div>
          <div
            className="flex flex-col justify-center items-center bg-gray-100"
            style={{ height: "75vh" }}
          >
            <div className="bg-white shadow-md rounded-lg p-8 w-[450px] mb-6">
              <div>
                <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl">
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
              <br />

              <button
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
                onClick={() => getContractByUser()}
              >
                Get Contracts
              </button>

              <br />

              <div className="min-h-8">
                {nftContractAddress.split(",").map((data) => (
                  <div className="text-lg font-semibold text-center break-words">
                    {data}
                    <br />
                    <br />
                  </div>
                ))}
              </div>
              {<div className="text-xl">{contractFetchResponse}</div>}
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
