"use client";

import { useState } from "react";
import DiveSiteInfo from "./DiveSiteInfo";
import AddDiveSiteForm from "./AddDiveSiteForm";

const SideBar = ({ selectedSiteId, onCloseSite }) => {
  return (
    <div className="w-[25%] min-w-[400px] p-4 bg-white shadow-md h-screen fixed right-0 top-0 flex flex-col">
      {selectedSiteId ? (
        <DiveSiteInfo siteId={selectedSiteId} onClose={onCloseSite} />
      ) : (
        <AddDiveSiteForm />
      )}
    </div>
  );
};

export default SideBar;