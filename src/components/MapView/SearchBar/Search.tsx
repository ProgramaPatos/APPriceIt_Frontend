import * as React from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import "./Search.scss";
import { useRef, useState } from "react";
import useProductApi from "../../../hooks/useProductApi";
import { useQuery } from "react-query";
import { ProductResponseDTO } from "../../../services/api";
import { AxiosError } from "axios";

interface SearchProps {
  setSearch: (value: number | null) => void;
}

export function Search({ setSearch }: SearchProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
  const [selectedResult, setSelectedResult] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { productApi } = useProductApi();
  const handleSearch = (p: ProductResponseDTO) => () => {
    setSearchInput(p.product_name);
    inputRef.current?.blur();
    setIsSearching(false);
    setSearch(p.product_id);
  };
  const handleChange = (n: string) => {
    setSearchInput(n);
    setIsSearching(true);
  }

  const { data: results, isLoading, isError, error, isFetching } = useQuery<ProductResponseDTO[], AxiosError>(["productSearch", searchInput], async () => {
    if (searchInput) {
      console.log("buscando", searchInput);
      const { data } = await productApi.productControllerSearchProduct(searchInput);
      return data;
    }
    return [];
  }, {
    enabled: (searchInput !== undefined) && isSearching,
    initialData: () => []
  })
  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (results && results.length > selectedResult) {
      handleSearch(results[selectedResult])();
    }
  };



  return (
    <div className="searchContainer">
      <form className="searchBar" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="searchInput"
          placeholder="¿Qué buscas?"
          value={searchInput}
          onChange={(e) => handleChange(e.target.value)}
        />
        <IconButton sx={{ p: "0.7rem" }} aria-label="directions" type="submit">
          <SearchIcon />
        </IconButton>
      </form>
      {isSearching && <div className="searchList">
        {isFetching && <div>Cargando...</div>}
        {isError && error?.response?.status === 404 && <div>No hay resultados :c</div>}
        {isError && error?.response?.status !== 404 && <div>Error</div>}
        {((results?.length ?? 0) > 0) && results?.map((prod, i) => {
          return (
            <div
              className={`searchListItem ${selectedResult === i ? "selected" : ""}`}
              key={prod.product_id}
              onMouseEnter={() => setSelectedResult(i)}
              onClick={handleSearch(prod)}
            >
              {prod.product_name}
            </div>
          );
        })}
      </div>
      }
    </div>
  );
}
