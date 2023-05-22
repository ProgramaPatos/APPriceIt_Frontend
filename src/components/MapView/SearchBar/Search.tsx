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

interface SearchProps {
  isSearch: boolean;
  setIsSearch: (value: boolean) => void;
  searchName: string;
}

export function Search({ setIsSearch, isSearch, searchName }: SearchProps) {
  const handleClick = (): void => {
    setIsSearch(!isSearch);
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
      >
        {/* <Icon sx={{ p: "0.7rem" }} aria-label="menu"></Icon> */}

        <InputBase
          sx={{ flex: 1, paddingLeft: "0.5rem" }}
          placeholder={isSearch ? searchName : "Qué estas buscando?"}
          inputProps={{ "aria-label": "search google maps" }}
        />

        <IconButton sx={{ p: "0.7rem" }} aria-label="directions">
          <SearchIcon />
        </IconButton>

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        {isSearch ? (
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
