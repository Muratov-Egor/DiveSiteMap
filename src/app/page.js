"use client";
import DiveSitesMap from "./components/DiveSitesMap";
import SideBar from "./components/SideBar";

export default function Home() {

  return (
    <div className="flex flex-row" >
      <DiveSitesMap />
      <SideBar />
    </div>
  );
}
