import React, { useState } from "react";
import { ethers } from "ethers";
import TransferTokensInfo from "./Walkthrough/TransferTokensInfo";
import Image from "next/image";
import asset1 from "../assets/asset1.png";
import asset2 from "../assets/asset2.jpeg";
import asset4 from "../assets/asset4.jpg";
import cryptoPunks from "../assets/cryptoPunks.png";
import pattern_randomized from "../assets/pattern-randomized.svg"

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

  const [loadingBar, setLoadingBar] = useState<boolean>(false);

  const [nftTransferResponse, setNFTTransferResponse] = useState<string>("");

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

        setLoadingBar(true);
        const response = await sendToken.wait();
        setLoadingBar(false);

        console.log(response.toString());

        if (response.status == 1) {
          setNFTTransferResponse("NFT Transferred Successfully");
        } else {
          setNFTTransferResponse("Error Transferring the NFT");
        }
      } catch (error) {
        console.error("Error Transferring NFT:", error);
        alert(
          "An error occurred while transferring the nft. Check console for details."
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
              <TransferTokensInfo />
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
        <div>
          <div className="absolute left-0" style={{ marginTop: "1px" }}>
            <Image src={asset4} alt="Ethereum Logo" width={400} height={200} />
          </div>

          <div
            className="absolute right-0 rounded-full mx-[80px]"
            style={{ marginTop: "35px" }}
          >
            <Image
              src={cryptoPunks}
              alt="cryptoPunks"
              width={300}
              height={150}
            />
          </div>

          <div
            className="flex flex-col justify-center items-center"
            style={{ height: "40vh" }}
          >
            <div className="absolute w-[600px] h-[450px] bg-blue-500 rounded-lg transform -rotate-6 opacity-50 my-[500px] top-[-80px]"></div>

            <div className="relative bg-white shadow-md rounded-lg p-8 w-[450px] mb-6">
              <div>
                <label className="input input-bordered flex items-center gap-2 font-black text-xl my-2 border-4">
                  Address:
                  <input
                    className="grow"
                    type="text"
                    placeholder="sender Address"
                    onChange={(e) => setSenderAddress(e.target.value)}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 font-black text-xl border-4">
                  Address:
                  <input
                    className="grow"
                    type="text"
                    placeholder="Receiver Address"
                    onChange={(e) => setReceiverAddress(e.target.value)}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl border-4">
                  Address:
                  <input
                    className="grow"
                    type="text"
                    placeholder="contractAddress"
                    onChange={(e) => setContractAddress(e.target.value)}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl border-4">
                  Token_ID:
                  <input
                    className="grow"
                    type="text"
                    placeholder="token Id"
                    onChange={(e) => setTokenId(parseInt(e.target.value))}
                  />
                </label>
              </div>

              <button
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
                onClick={() => transferToken()}
              >
                Transfer Token
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
              {<div className="text-xl">{nftTransferResponse}</div>}
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
                <li className="step step-primary">
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

export default TransferTokens;
