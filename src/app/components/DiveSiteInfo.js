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
    return <div className="p-4 text-center text-gray-500">Загрузка...</div>;
  }

  const handleToggleVisited = () => {
    toggleVisited(site.id, site.visited);
    setSite((prev) => ({ ...prev, visited: !prev.visited }));
  };

  const getFaviconUrl = (url) => {
    try {
      const domain = new URL(url).origin;
      return `https://www.google.com/s2/favicons?sz=32&domain=${domain}`;
    } catch {
      return "";
    }
  };

  return (
    <div className="w-[25%] min-w-[400px] p-6 bg-white shadow-lg h-screen fixed right-0 top-0 flex flex-col border-l border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">{site.name}</h2>
      <p className="text-gray-700 mb-2"><strong>🌍 Страна:</strong> {site.country}</p>
      <p className="text-gray-700 mb-2"><strong>📍 Координаты:</strong> {site.latitude ? `${site.latitude}, ${site.longitude}` : "Не указаны"}</p>
      <p className="text-gray-700 mb-4"><strong>📝 Описание:</strong> {site.description || "Нет описания"}</p>
      <p className="text-gray-800 font-semibold mb-4"><strong>📌 Статус:</strong> <span className={site.visited ? "text-green-600" : "text-red-600"}>{site.visited ? "Посещён" : "Не посещён"}</span></p>
      {site.links && site.links.length > 0 && (
        <div className="mb-4">
          <strong className="text-gray-800">🔗 Полезные ссылки:</strong>
          <ul className="mt-2 space-y-2">
            {site.links.map((link, index) => (
              <li key={index} className="flex items-center space-x-3 p-2 bg-gray-100 rounded-lg">
                <img src={getFaviconUrl(link.url)} alt="favicon" className="w-5 h-5" />
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                  {new URL(link.url).hostname.replace("www.", "")}
                </a>
                <span className="text-gray-600">- {link.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button 
        text={site.visited ? "Снять отметку" : "Отметить как посещённый"} 
        onClick={handleToggleVisited} 
        className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg mb-3"
      />
      <Button 
        text="Закрыть" 
        onClick={onClose} 
        className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg"
      />
    </div>
  );
};

export default DiveSiteInfo;
