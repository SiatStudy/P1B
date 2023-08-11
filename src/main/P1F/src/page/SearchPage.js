import React, { useState } from "react";
import style from "./Page.module.css";
import Header from '../content/Header';
import SideMenu from '../content/SideMenu';
import UserInfo from '../content/UserInfo';
import SearchPageContainer from "../content/SearchPageContainer";
import { useParams } from "react-router-dom";

function SearchPage() {
  const [titleh, setTitleh] = useState("");
  let { word } = useParams();

  return (
    <div className={style.Page}>
      <div className={style.Side}>
      <SideMenu titleh={titleh} setTitleh={setTitleh}></SideMenu>
        <UserInfo></UserInfo>
      </div>
      <div className={style.Main}>
      <Header $titleh={titleh} />
        <SearchPageContainer key={word} word={word}></SearchPageContainer>
      </div>
    </div>
  );
}

export default SearchPage;
