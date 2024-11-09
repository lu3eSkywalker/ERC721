import React, { useState } from "react";
import { ethers } from "ethers";
import MintingNFTsInfo from "./Walkthrough/MintingNFTsInfo";
import Image from "next/image";
import asset1 from "../assets/asset1.png";
import asset2 from "../assets/asset2.jpeg";
import asset4 from "../assets/asset4.jpg";
import boredApe from "../assets/boredApe.jpg";
import pattern_randomized from "../assets/pattern-randomized.svg"


const MintingNFTs = () => {
  const [nftAddress, setNFTAddress] = useState<string>(
    "0x75537828f2ce51be7289709686A69CbFDbB714F1"
  );

  const [addressToMintNFTto, setAddressToMintNFTto] = useState<string>(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );

  const [nftURI, setNFTURI] = useState<string>("");
  const [nftMintResponse, setNFTMintResponse] = useState<string>("");
  const [loadingBar, setLoadingBar] = useState<boolean>(false);

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

        setLoadingBar(true);
        const response = await createContract.wait();
        setLoadingBar(false);

        console.log(response);

        if (response.status === 1) {
          setNFTMintResponse("NFT minted Successfully");
        } else {
          setNFTMintResponse("Error Minting NFTs");
        }
      } catch (error) {
        console.error("Error Minting NFTs:", error);
        alert(
          "An error occurred while Minting the NFTs. Check console for details."
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
      <div className="">
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
              <MintingNFTsInfo />
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

        <div className="absolute left-0" style={{ marginTop: "10px" }}>
          <Image src={asset4} alt="Ethereum Logo" width={400} height={200} />
        </div>

        <div
          className="absolute right-0 rounded-full mx-[80px]"
          style={{ marginTop: "35px" }}
        >
          <Image src={boredApe} alt="boredApe" width={400} height={200} />
        </div>

        <div>
          <div
            className="flex flex-col justify-center items-center"
            style={{ height: "30vh" }}
          >
            <div className="absolute w-[650px] h-[420px] bg-blue-500 rounded-lg transform -rotate-6 opacity-50 my-[500px] top-[-125px]"></div>

            <div className="relative bg-white shadow-md rounded-lg p-8 w-[550px] mb-6">
              <div>
                <label className="input input-bordered flex items-center gap-2 font-black text-xl my-2 border-4">
                  Contract_Address:
                  <input
                    className="grow"
                    type="text"
                    placeholder="ERC721 Contract address"
                    onChange={(e) => setNFTAddress(e.target.value)}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 font-black text-xl border-4 my-4">
                  UserAddress:
                  <input
                    className="grow"
                    type="text"
                    placeholder="address to mint NFT to"
                    onChange={(e) => setAddressToMintNFTto(e.target.value)}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl border-4">
                  NFT_URI:
                  <input
                    className="grow"
                    type="text"
                    placeholder="http://nfturi.json"
                    onChange={(e) => setNFTURI(e.target.value)}
                  />
                </label>
              </div>
              <br />

              <button
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
                onClick={() => mintNFTs()}
              >
                Mint NFT
              </button>

              <br />
              <br />

              {loadingBar ? (
                <div>
                  <div className="font-bold mx-[130px]">
                    Transaction Processing...
                  </div>
                  <div className="mx-[130px]">
                    <progress className="progress w-56"></progress>
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              {<div className="text-xl">{nftMintResponse}</div>}
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

export default MintingNFTs;