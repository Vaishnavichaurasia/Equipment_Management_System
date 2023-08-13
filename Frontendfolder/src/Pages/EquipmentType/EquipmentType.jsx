import React, { useEffect, useState } from "react";
import style from "./equipment.module.css";
import { Pagination } from "antd";
import { equipmentTypeCount, equipmentTypeList } from "../../Api/services";
import { useNavigate } from "react-router-dom";
import {
    BsSortAlphaDownAlt,
    BsSortAlphaDown,
} from "react-icons/bs";

import { MdArrowDropUp,} from "react-icons/md";
import { Input, Space } from "antd";
import { enableHeader } from "../../App";

const EquipmentType = () => {
    const [backendMenuCount, setBackendMenuCount] = useState(0);
    const [eqipmentList, setEquipmentTypeList] = useState([]);
    const [listPerPage, setListPerPage] = useState(localStorage.getItem("listPerPage"));

    const [columnToSort, setColumnToSort] = useState("name");
    const [columnSortingOrder, setColumnSortingOrder] = useState("ascending");
    const [showSortingIcon, setShowSortingIcon] = useState(false);
    var [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");

    const { Search } = Input;

    const navigate = useNavigate();

    useEffect(() => {

        enableHeader()

        if (localStorage.getItem("globalPageIndex")) {
            currentPage = parseInt(localStorage.getItem("globalPageIndex"))
            setCurrentPage(parseInt(localStorage.getItem("globalPageIndex")))
        }

        getCountOfMenu();
        getListOfMenu();

    }, []);


    useEffect(() => {
        getListOfMenu();

    }, [columnToSort, columnSortingOrder, currentPage, searchText, listPerPage]);

    const getCountOfMenu = async () => {
        const response = await equipmentTypeCount();
        setBackendMenuCount(response.equipmentTypeCount);
    };

    const getListOfMenu = async () => {
        const paginationDetails = {
            currentPage: currentPage,
            listPerPage: listPerPage,
        };
        const filteringCriteria = {
            paginationDetails: paginationDetails,
            columnToSort: columnToSort,
            columnSortingOrder: columnSortingOrder,
            searchText: searchText.trim(),

        };
        const response = await equipmentTypeList(filteringCriteria);
        setEquipmentTypeList(response.equipmentTypeList);
        setBackendMenuCount(response.equipmentTypeListCount);

    };
   
    const handlePageChange = async (pageNumber) => {
        
        localStorage.setItem("globalPageIndex", pageNumber)
        setCurrentPage(pageNumber);
    };

    const sortMenuList = (columnName) => {
        if (columnToSort == columnName) {
            if (columnSortingOrder == "ascending") {
                setColumnSortingOrder("descending");
            } else {
                setColumnSortingOrder("ascending");
            }
        }
        setColumnToSort(columnName);
    };

    const openMenuDetails = (id) => {

        //  navigate("/MenuForm", { state: { id: id } });

    };

    function toggelDropdown() {
        if (document.getElementById("dropdown").style.display.length == 0)
            document.getElementById("dropdown").style.display = "block"
        else
            document.getElementById("dropdown").style.display = ""
    }

    function hideDropdown() {
        document.getElementById("dropdown").style.display = ""
    }

    return (
        
        <div className={style.container}>
            <div className={`${style.pageTitleContainer}`}>
                <div className={style.pageTitle}>Equipment-type List</div>
            </div>

            <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "white",
                                padding: "4px",
                                width: "100%",
                                paddingTop:"1.5%"
                            }}
                        >
                            <Search

                                placeholder="Search by Equipment-type"

                                allowClear
                                enterButton
style={{width:'30%'}}
                                onSearch={(value) => {
                                    setCurrentPage(1);
                                    setSearchText(value);
                                }}

                                className={style.searchBox}
                          
                            />

                           
                            <div
                                className={`${style.primaryButton}`}
                                onClick={() => openMenuDetails()}
                                style={{ marginLeft: "10px", minWidth: "100px", textAlign: "center" }}
                            >
                                Add Equipment-type
                            </div>
                           
                        </div>

            <div className={style.menuListSection}>
                <div className={style.tableContainer}>
                    <div className={style.table}>
                        

                        <div className={style.tableHeadingContainer}
                          
                            onClick={hideDropdown}
                            onTouchStart={hideDropdown}
                        >
                            <div className={style.commonColumnTitle}>SNo. </div>
 
                            <div
                                className={style.commonColumnTitle}>
                                <span onClick={(e) => {
                                    setShowSortingIcon(false);
                                    sortMenuList("name");
                                }}
                                    onMouseEnter={(e) => {
                                        if (columnToSort != "name") {
                                            setShowSortingIcon(true);
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (columnToSort != "name") {
                                            setShowSortingIcon(false);
                                        }
                                    }}
                                    style={{ wordBreak: "break-word" }}>Name{" "}</span>
                                <span onClick={(e) => {
                                    setShowSortingIcon(false);
                                    sortMenuList("name");
                                }}
                                    onMouseEnter={(e) => {
                                        if (columnToSort != "name") {
                                            setShowSortingIcon(true);
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (columnToSort != "name") {
                                            setShowSortingIcon(false);
                                        }
                                    }}>
                                    {columnToSort == "name" &&
                                        columnSortingOrder == "ascending" && (
                                            <BsSortAlphaDown className={style.sortingIcon} />
                                        )}
                                    {columnToSort == "name" &&
                                        columnSortingOrder == "descending" && (
                                            <BsSortAlphaDownAlt className={style.sortingIcon} />
                                        )}
                                    {columnToSort != "name" && showSortingIcon && (
                                        <BsSortAlphaDown
                                            color="grey"
                                            className={style.sortingIcon}
                                        />
                                    )}
                                </span>
                            </div>

                            <div className={style.commonColumnTitle}> Action </div>

                        </div>

                        <div
                            className={style.tableDataContainer}
                            style={{
                                backgroundColor: "#efefef",
                            }}
                           
                            onClick={hideDropdown}
                            onTouchStart={hideDropdown}
                        >
                            {eqipmentList != null && eqipmentList.length > 0 ? (
                                eqipmentList.map((menuDetails, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={style.tableData}
                                            style={{
                                                padding: "2px",
                                                marginTop: "2px",
                                                marginBottom:
                                                    eqipmentList.length == index + 1 ? "2px" : "0px",
                                            }}
                                        >
                                            <div className={style.commonColumnData}>
                                               
                                                {(currentPage * listPerPage - listPerPage) + index + 1}

                                            </div>
                                            <div className={style.commonColumnData} style={{ wordBreak: "break-word" }}>
                                                {menuDetails.name}

                                            </div>

                                            <div
                                                className={`${style.commonColumnData}`}
                                                style={{ display: "flex", justifyContent: "center" }}
                                            >
                                                <div
                                                    className={` ${style.primaryButton}`}
                                                >
                                                    View
                                                </div>
                                            </div>

                                        </div>
                                    );
                                })
                            ) : (
                                <div style={{ textAlign: "center" }}>No records found!</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.paginationContainer}>
                {eqipmentList && eqipmentList.length > 0 ? (

                    < div className={style.paginationContent}>

                        <Pagination
                            
                            defaultCurrent={currentPage}

                            current={currentPage}
                            total={backendMenuCount}
                            defaultPageSize={listPerPage}
                            pageSize={listPerPage}
                            onChange={handlePageChange}
                            simple
                        />

                        <div className={style.dropdown} onClick={toggelDropdown}>
                            <button className={style.dropbtn}> {listPerPage} / Page <MdArrowDropUp style={{ margin: "5px 0" }} /></button>
                            <div className={style.dropdown_content} id="dropdown">

                                {backendMenuCount > 40 ? <span href="#" onClick={e => { setListPerPage(50); setCurrentPage(1); localStorage.setItem("listPerPage", 50) }} >50 / Page</span> : null}
                                {backendMenuCount > 30 ? <span href="#" onClick={e => { setListPerPage(40); setCurrentPage(1); localStorage.setItem("listPerPage", 40) }} >40 / Page</span> : null}
                                {backendMenuCount > 20 ? <span href="#" onClick={e => { setListPerPage(30); setCurrentPage(1); localStorage.setItem("listPerPage", 30) }} >30 / Page</span> : null}
                                <span href="#" onClick={e => { setListPerPage(20); setCurrentPage(1); localStorage.setItem("listPerPage", 20) }}>20 / Page</span>
                                <span href="#" onClick={e => { setListPerPage(10); localStorage.setItem("listPerPage", 10) }}>10 / Page</span>
                            </div>
                        </div>
                    </div>

                ) : null}
            </div>
        </div>
    );
};

export default EquipmentType;
