"use client";
import DiveSitesMap from "./components/DiveSitesMap";
import { useDiveSites } from "./context/DiveSitesContext"

export default function Home() {
  const { diveSites } = useDiveSites();

  return (
    <div>
      <DiveSitesMap />
    </div>
  );
}
