import { useState, useEffect } from 'react';

const useCountries = (language = 'eng') => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,cca2,translations`);
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных о странах');
        }
        const data = await response.json();
        const countryList = data.map(country => ({
          name: country.translations[language]?.common || country.name.common,
          code: country.cca2
        }));

        // Сортировка стран в алфавитном порядке
        countryList.sort((a, b) => a.name.localeCompare(b.name));

        setCountries(countryList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [language]);

  return { countries, loading, error };
};

export default useCountries;