import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const useDiveSites = () => {
  const [diveSites, setDiveSites] = useState([]);

  // Получаем список дайв-сайтов из Supabase
  useEffect(() => {
    const fetchDiveSites = async () => {
      const { data, error } = await supabase.from("dive_sites").select("*");
      if (error) console.error("Ошибка загрузки:", error);
      else setDiveSites(data);
    };

    fetchDiveSites();
  }, []);

  // Функция переключения статуса посещения
  const toggleVisited = async (id, visited) => {
    const { error } = await supabase
      .from("dive_sites")
      .update({ visited: !visited })
      .eq("id", id);

    if (!error) {
      setDiveSites(
        diveSites.map((site) =>
          site.id === id ? { ...site, visited: !visited } : site
        )
      );
    } else {
      console.error("Ошибка обновления:", error);
    }
  };

  // Функция добавления нового дайв-сайта
  const addDiveSite = async (newSite) => {
    const { data, error } = await supabase.from("dive_sites").insert([newSite]).select();

    if (error) {
      console.error("Ошибка добавления:", error);
    } else {
      setDiveSites([...diveSites, ...data]);
    }
  };

  // Функция получения информации о дайв-сайте
  const getDiveSiteById = async (id) => {
    const { data, error } = await supabase
      .from("dive_sites")
      .select("*")
      .eq("id", id)
      .single(); // Берём только одну запись
  
    if (error) {
      console.error("Ошибка загрузки сайта:", error);
      return null;
    }
  
    return data; // Возвращаем данные о сайте
  };
  

  return { diveSites, toggleVisited, addDiveSite, setDiveSites, getDiveSiteById };
};
