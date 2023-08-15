// 사이드바 메뉴

import React, {useEffect} from "react";
import style from "./SideMenu.module.css";
import CustomMainPageP from "../component/CustomMainPageP";
import { NavLink } from "react-router-dom";

function SideMenu(props){

    return(
        <div className={style.SideNavBar}>
            <div className={style.NavTop}>
                <div className={style.Logo}>
                    <img src={ "/asset/img/LogoIcon.svg" }/>
                </div>
                <div className={style.NavMain}>
                    <div className={style.NavMenu}>

                       <NavLink to="/listday"><div className={style.NavItem} >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_311_2491)">
                                    <path d="M3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3ZM20 7.238L12.072 14.338L4 7.216V19H20V7.238ZM4.511 5L12.061 11.662L19.502 5H4.511Z" fill="#B2BEC3"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_311_2491">
                                        <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <CustomMainPageP $navmenu>List Day</CustomMainPageP>
                        </div></NavLink>

                        <NavLink to="/calendarp"><div className={style.NavItem} >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_311_2491)">
                                    <path d="M3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3ZM20 7.238L12.072 14.338L4 7.216V19H20V7.238ZM4.511 5L12.061 11.662L19.502 5H4.511Z" fill="#B2BEC3"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_311_2491">
                                        <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <CustomMainPageP $navmenu>Calendar</CustomMainPageP>
                            </div>
                        </NavLink>

                        <NavLink to="/dday"><div className={style.NavItem} >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_311_2491)">
                                    <path d="M3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3ZM20 7.238L12.072 14.338L4 7.216V19H20V7.238ZM4.511 5L12.061 11.662L19.502 5H4.511Z" fill="#B2BEC3"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_311_2491">
                                        <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <CustomMainPageP $navmenu>목표 달성 D-day</CustomMainPageP>
                        </div></NavLink>

                        <NavLink to="/graphp"><div className={style.NavItem} >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_311_2491)">
                                    <path d="M3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3ZM20 7.238L12.072 14.338L4 7.216V19H20V7.238ZM4.511 5L12.061 11.662L19.502 5H4.511Z" fill="#B2BEC3"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_311_2491">
                                        <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <CustomMainPageP $navmenu>그래프로 한 눈에 보기</CustomMainPageP>
                        </div></NavLink>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideMenu;