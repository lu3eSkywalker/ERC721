import ApprovalForAllNFTs from "@/components/ApprovalForAllNFTsOfContract";
import Footer from "@/components/Design/Footer";
import Navbar from "@/components/Design/Navbar";
import React from "react";

const approveallnfts = () => {
  return (
    <div>
      <Navbar />
      <ApprovalForAllNFTs />
      <Footer />
    </div>
  );
};

export default approveallnfts;
