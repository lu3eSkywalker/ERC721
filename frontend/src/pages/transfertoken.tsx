import Footer from "@/components/Design/Footer";
import Navbar from "@/components/Design/Navbar";
import TransferTokens from "@/components/TransferTokens";
import React from "react";

const transferToken = () => {
  return (
    <div>
      <Navbar />
      <TransferTokens />
      <Footer />
    </div>
  );
};

export default transferToken;
