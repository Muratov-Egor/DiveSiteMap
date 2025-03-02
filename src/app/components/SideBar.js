"use client";

import { useState } from "react";
import { useDiveSites } from "../context/DiveSitesContext";
import useCountries from "@/app/hooks/useCountries";
import Input from "../ui/Input";
import SearchableDropDown from "../ui/SearchableDropDown";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";
import DiveSiteInfo from "./DiveSiteInfo";

const SideBar = ({ selectedSiteId, onCloseSite }) => {
  const { addDiveSite } = useDiveSites();
  const { countries } = useCountries('rus');
  
  const [form, setForm] = useState({
    name: "",
    country: "",
    lat: "",
    lng: "",
    description: "",
  });
  
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Введите название";
    if (!form.country) newErrors.country = "Выберите страну";
    if (!form.lat || isNaN(form.lat)) newErrors.lat = "Введите корректную широту";
    if (!form.lng || isNaN(form.lng)) newErrors.lng = "Введите корректную долготу";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const selectedCountry = countries.find(c => c.name === form.country);
    const countryCode = selectedCountry ? selectedCountry.code : "";
    
    addDiveSite({
      name: form.name,
      country: countryCode,
      lat: parseFloat(form.lat),
      lng: parseFloat(form.lng),
      description: form.description,
      visited: false,
    });

    setForm({ name: "", country: "", lat: "", lng: "", description: "" });
    setErrors({});
  };

  return (
    <div className="w-[25%] min-w-[400px] p-4 bg-white shadow-md h-screen fixed right-0 top-0 flex flex-col">
      {selectedSiteId ? (
        <DiveSiteInfo siteId={selectedSiteId} onClose={onCloseSite} />
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-4">Добавление дайв-сайта</h2>
          <div className="flex w-full">
            <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Название"
                error={errors.name}
            />
          </div>
          <div className="flex w-full">
            <SearchableDropDown
              items={countries.map(c => c.name)}
              onChange={(value) => setForm({ ...form, country: value })}
              placeholder="Выберите страну"
              error={errors.country}
            />
          </div>
          <div className="flex w-full">
            <Input
              value={form.lat}
              onChange={(e) => setForm({ ...form, lat: e.target.value })}
              placeholder="Широта"
              error={errors.lat}
            />
            <Input
              value={form.lng}
              onChange={(e) => setForm({ ...form, lng: e.target.value })}
              placeholder="Долгота"
              error={errors.lng}
            />
          </div>
          <div className="flex w-full">
            <TextArea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Описание (необязательно)"
            />
          </div>
          <Button text="Добавить" onClick={handleSubmit} />
        </>
      )}
    </div>
  );
};

export default SideBar;