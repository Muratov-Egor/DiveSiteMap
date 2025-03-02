"use client";

import { useState, useEffect } from "react";
import { useDiveSites } from "../context/DiveSitesContext";
import Button from "../ui/Button";

const DiveSiteInfo = ({ siteId, onClose }) => {
  const { getDiveSiteById, toggleVisited } = useDiveSites();
  const [site, setSite] = useState(null);

  useEffect(() => {
    const fetchSite = async () => {
      const data = await getDiveSiteById(siteId);
      setSite(data);
    };
    fetchSite();
  }, [siteId, getDiveSiteById]);

  if (!site) {
    return <div className="p-4">Загрузка...</div>;
  }

  const handleToggleVisited = () => {
    toggleVisited(site.id, site.visited);
    setSite((prev) => ({ ...prev, visited: !prev.visited }));
  };

  return (
    <div className="w-[25%] min-w-[400px] p-4 bg-white shadow-md h-screen fixed right-0 top-0 flex flex-col">
      <h2 className="text-lg font-semibold mb-4">{site.name}</h2>
      <p><strong>Страна:</strong> {site.country}</p>
      <p><strong>Координаты:</strong> {site.latitude}, {site.longitude}</p>
      <p><strong>Описание:</strong> {site.description || "Нет описания"}</p>
      <p><strong>Статус:</strong> {site.visited ? "Посещён" : "Не посещён"}</p>
      <Button text={site.visited ? "Снять отметку" : "Отметить как посещённый"} onClick={handleToggleVisited} />
      <Button text="Закрыть" onClick={onClose} />
    </div>
  );
};

export default DiveSiteInfo;
