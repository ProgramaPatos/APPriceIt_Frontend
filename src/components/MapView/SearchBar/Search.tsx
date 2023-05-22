import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import SearchIcon from "@mui/icons-material/Search";
import { AiOutlineClose } from "react-icons/ai";
import LocalGroceryStoreSharpIcon from "@mui/icons-material/LocalGroceryStoreSharp";
import "./Search.scss";
import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import useStoreApi from "../../../hooks/useStoreApi";
import useProductApi from "../../../hooks/useProductApi";
import { useQuery } from "react-query";

interface SearchProps {
  isSearching: boolean;
  setIsSearching: (value: boolean) => void;
  setSearch: (value: number | null) => void;
}

export function Search({ setIsSearching, isSearching, setSearch }: SearchProps) {
  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState<string | null>(null);
  const { productApi } = useProductApi();
  const handleClick = (): void => {
    setIsSearching(!isSearching);
  };

  useQuery(["productSearch", searchText], async () => {
    if (searchText) {
      const { data } = await productApi.productControllerSearchProduct(searchText);
      if (data.length > 0) {
        console.log("encontrado", data[0]);
        setSearchInput(data[0].product_name);
        setSearch(data[0].product_id);
      }
      else {
        setSearch(null);
      }
    }
  }, {
    enabled: (searchText !== null)
  })
  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    console.log("Buscando", searchInput);
    setSearchText(searchInput);
  };


  return (
    <div className="searchIcon">
      <Paper
        component="form"
        sx={{
          p: "0.1rem 0.3rem",
          display: "flex",
          alignItems: "center",
          width: "25.6vw",
          height: 48,
          background: "#EEE9DA",
          boxShadow: "0rem 0.2rem 0.2rem -0.1rem rgba(0, 0, 0, 0.2)",
        }}
        onSubmit={handleSubmit}
      >

        <TextField
          id="searchInput"
          label="Busca un producto"
          placeholder="¿Qué buscas?"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton sx={{ p: "0.7rem" }} aria-label="directions" type="submit">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        {isSearching ? (
          <IconButton
            sx={{ p: "0.7rem" }}
            aria-label="directions"
            onClick={handleClick}
          >
            <AiOutlineClose />
          </IconButton>
        ) : (
          <IconButton
            sx={{ p: "0.7rem", color: "#001D4A" }}
            aria-label="directions"
          >
            <LocalGroceryStoreSharpIcon />
          </IconButton>
        )}
      </Paper>
    </div>
  );
}
