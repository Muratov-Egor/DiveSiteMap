"use client";

import { useState } from "react";
import DiveSitesMap from "./components/DiveSitesMap";
import SideBar from "./components/SideBar";

export default function Home() {
  const [selectedSiteId, setSelectedSiteId] = useState(null);

  return (
    <div className="flex">
      <DiveSitesMap onSelectSite={setSelectedSiteId} />
      <SideBar selectedSiteId={selectedSiteId} onCloseSite={() => setSelectedSiteId(null)} />
    </div>
  );
}