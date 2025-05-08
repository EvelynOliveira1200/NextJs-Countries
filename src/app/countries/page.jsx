"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryCard from "../../components/CountryCard";
import CountryModal from "../../components/CountryModal";
import Loading from "../../components/Loading";
import styles from "./Countries.module.css";
import { Button, Pagination } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const regions = ["africa", "americas", "antarctic", "asia", "europe", "oceania"];

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchCountries = async (region = "") => {
    setIsLoading(true);
    try {
      const url = region
        ? `https://restcountries.com/v3.1/region/${region}`
        : "https://restcountries.com/v3.1/all";
      const response = await axios.get(url);
      setCountries(response.data);
      if (!region) {
        setAllCountries(response.data);
        toast.success("Países carregados!");
      }
    } catch (error) {
      console.error("Erro ao carregar países:", error);
      toast.error("Erro ao carregar países!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const resetFilter = () => {
    setCurrentPage(1);
    fetchCountries();
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCountries = countries.slice(startIndex, endIndex);

  const handleCardClick = (country) => {
    toast.info(`Você clicou no país: ${country.name.common}`, {
      position: "bottom-right",
      hideProgressBar: true,
    });
  };

  return (
    <div className={styles.container}>
      <ToastContainer
        position="top-right"
        autoClose={7500}
        theme="light"
        hideProgressBar = {true}
      />

      <h1>Lista de Países do Mundo</h1>
      <div>
        {regions.map((region) => (
          <Button
            key={region}
            className={styles.button}
            onClick={() => {
              setCurrentPage(1);
              fetchCountries(region);
            }}
          >
            {region.charAt(0).toUpperCase() + region.slice(1)}
          </Button>
        ))}
        <Button className={styles.buttonReset} onClick={resetFilter}>
          Mostrar Todos
        </Button>
      </div>

      <div className={styles.cardContainer}>
        {isLoading ? (
          <Loading />
        ) : (
          currentCountries.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              onClick={() => setSelectedCountry(country)}
              onCardClick={handleCardClick}
            />
          ))
        )}
      </div>

      {!isLoading && (
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={countries.length}
          onChange={(page) => setCurrentPage(page)}
          className={styles.pagination}
          style={{ marginTop: "20px" }}
        />
      )}

      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </div>
  );
}
