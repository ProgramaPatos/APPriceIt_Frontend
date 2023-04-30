import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import SearchIcon from "@mui/icons-material/Search";
import LocalGroceryStoreSharpIcon from "@mui/icons-material/LocalGroceryStoreSharp";

export default function CustomizedInputBase() {
  return (
    <Paper
      component="form"
      sx={{
        p: "0.1rem 0.3rem",
        display: "flex",
        alignItems: "center",
        width: 600,
        background: "#EEE9DA",
        boxShadow: "0rem 0.1rem 0.2rem -0.1rem rgba(0, 0, 0, 0.2)",
      }}
    >
      <Icon sx={{ p: "0.7rem" }} aria-label="menu"></Icon>
      <InputBase
        sx={{ ml: 3, flex: 1 }}
        placeholder="A comprar"
        inputProps={{ "aria-label": "search google maps" }}
      />

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: "0.7rem" }} aria-label="directions">
        <LocalGroceryStoreSharpIcon />
      </IconButton>
    </Paper>
  );
}
