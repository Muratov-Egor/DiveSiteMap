"use client";
import { useDiveSites } from "./context/DiveSitesContext"

export default function Home() {
  const { diveSites } = useDiveSites();

  return (
    <div>
      {diveSites.map((site) => (
        <div key={site.id}>
          {site.name}
        </div>
      ))}
    </div>
  );
}
