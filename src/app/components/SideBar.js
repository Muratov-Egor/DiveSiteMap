"use client";

import { useState } from "react";
import DiveSiteInfo from "./DiveSiteInfo";
import DiveSiteForm from "./DiveSiteForm";

const SideBar = ({ selectedSiteId, onCloseSite }) => {
  return (
    <div className="w-[25%] min-w-[400px] p-4 bg-white shadow-md h-screen fixed right-0 top-0 flex flex-col">
      {selectedSiteId ? (
        <DiveSiteInfo siteId={selectedSiteId} onClose={onCloseSite} />
      ) : (
        <DiveSiteForm />
      )}
    </div>
  );
};

export default SideBar;