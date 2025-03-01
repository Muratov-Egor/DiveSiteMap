"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const DiveSitesContext = createContext();

export const DiveSitesProvider = ({ children }) => {
  const [diveSites, setDiveSites] = useState([]);

  // Загружаем список дайв-сайтов
  useEffect(() => {
    const fetchDiveSites = async () => {
      const { data, error } = await supabase.from("dive_sites").select("*");
      if (error) console.error("Ошибка загрузки сайтов:", error);
      else setDiveSites(data);
    };

    fetchDiveSites();
  }, []);

  // Отмечаем сайт как посещённый
  const toggleVisited = async (id, visited) => {
    const { error } = await supabase
      .from("dive_sites")
      .update({ visited: !visited })
      .eq("id", id);

    if (!error) {
      setDiveSites((prevSites) =>
        prevSites.map((site) =>
          site.id === id ? { ...site, visited: !visited } : site
        )
      );
    } else {
      console.error("Ошибка обновления сайта:", error);
    }
  };

  // Добавляем новый сайт
  const addDiveSite = async (newSite) => {
    const { data, error } = await supabase.from("dive_sites").insert([newSite]).select();
    if (!error) setDiveSites([...diveSites, ...data]);
    else console.error("Ошибка добавления сайта:", error);
  };

  // Получаем сайт по ID
  const getDiveSiteById = async (id) => {
    const { data, error } = await supabase
      .from("dive_sites")
      .select("*")
      .eq("id", id)
      .single();
    if (error) console.error("Ошибка загрузки сайта:", error);
    return data;
  };

  return (
    <DiveSitesContext.Provider
      value={{ diveSites, toggleVisited, addDiveSite, getDiveSiteById }}
    >
      {children}
    </DiveSitesContext.Provider>
  );
};

export const useDiveSites = () => {
  return useContext(DiveSitesContext);
};
