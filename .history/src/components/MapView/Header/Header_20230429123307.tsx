import React from "react";
import { Avatar, Button } from "@mui/material";
import SearchBar from "../SearchBar/Search";
import "./Header.scss";

const Header = () => {
  return (
    <>
      <div className="HeaderStyle">
        <SearchBar />
        <Button>
          <Avatar
            alt="The user pretty face"
            src="https://play-lh.googleusercontent.com/i-0HlK6I-K5ZVI28HFa4iXz0T22Mg2WjQ4gMsEYvqmSNdifp2NE41ZiaUCavmbIimQ=w600-h300-pc0xffffff-pd"
          />
        </Button>
      </div>
    </>
  );
};

export default Header;
