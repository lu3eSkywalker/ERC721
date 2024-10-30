import Footer from "@/components/Design/Footer";
import Navbar from "@/components/Design/Navbar";
import GetContractByUser from "@/components/GetContractByUser";
import React from "react";

const getcontractsbyuser = () => {
  return (
    <div>
      <Navbar />
      <GetContractByUser />
      <Footer />
    </div>
  );
};

export default getcontractsbyuser;
