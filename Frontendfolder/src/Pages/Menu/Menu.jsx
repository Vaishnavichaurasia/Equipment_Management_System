 /**
 * Created by - Ashish Dewangan on 12-06-2023
 * Reason - To have menu details section
 */

import React, { useEffect, useState } from "react";
import style from "./menu.module.css";
import Header from "../GlobalComponent/Header";
import { Pagination } from "antd";
import { getMenuCount, getMenuList } from "../../Api/services";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  BsSortAlphaDownAlt,
  BsSortAlphaDown,
  BsSortNumericDownAlt,
  BsSortNumericDown,
} from "react-icons/bs"; 

import { MdArrowDropUp, MdCancel, MdCheckCircle } from "react-icons/md";

import { Input, Space } from "antd";
import config from "../../Api/config";
import { enableHeader } from "../../App";

const Menu = () => {
  const [backendMenuCount, setBackendMenuCount] = useState(0);
  const [menuList, setMenuList] = useState([]);
  // Modified by Rohan Kansari - 22/6/23 - To Get Selected List page from localstorage on Reload 
  // const [listPerPage, setListPerPage] = useState(localStorage.getItem(10));
  const [listPerPage, setListPerPage] = useState(localStorage.getItem("listPerPage"));
  // End of code - ROhan kansari - 22/6/23

  const [columnToSort, setColumnToSort] = useState("name");
  const [columnSortingOrder, setColumnSortingOrder] = useState("ascending");
  const [showSortingIcon, setShowSortingIcon] = useState(false);
  var [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { Search } = Input;

  /**
   * Added by - Ashish Dewangan on 16-06-2023
   * Reason - To add navigation feature on this page
   */
  const navigate = useNavigate();
  /**
   * End of code addition by - Ashish Dewangan on 16-06-2023
   * Reason - To add navigation feature on this page
   */

  /**
   * Added by - Ashish Dewangan on 12-06-2023
   * Reason - method that will execute when page loads. this method will call menu list api
   */
  useEffect(() => {
    // Added By Rohan Kansari - 25/6/23
    // Reason - To enable headerSiderbar
    enableHeader()
    // End of code - Rohan kansari - 25/6/23
    // Added By Rohan Kansari - 22/6/23
    // Reason - To set global Page index Whenever its index updated
  
    if (localStorage.getItem("globalPageIndex")){
      currentPage =parseInt(localStorage.getItem("globalPageIndex"))
      setCurrentPage(parseInt(localStorage.getItem("globalPageIndex")))
    }

// End of code - Rohan kansari - 22/6/23
    getCountOfMenu();
    getListOfMenu();
  
  }, []);

  

  /**
   * End of code addition by - Ashish Dewangan on 12-06-2023
   * Reason - method that will execute when page loads. this method will call menu list api
   */

  /**
   * Added by - Ashish Dewangan on 12-06-2023
   * Reason - method that will execute when sorting on column is applied or page number is changed.
   *  this method will call menu list api
   */
  useEffect(() => {
    getListOfMenu();
     // Modified by ROhan KAnsari - 22/6/23 - To add listPerPage Change call
  // }, [columnToSort, columnSortingOrder, currentPage, searchText]);
}, [columnToSort, columnSortingOrder, currentPage, searchText,listPerPage]);

  /**
   * End of code addition by - Ashish Dewangan on 12-06-2023
   * Reason - method that will execute when sorting on column is applied or page number is changed.
   *  this method will call menu list api
   */

  /**
   * Added by - Ashish Dewangan on 12-06-2023
   * Reason - created api to get count of menu
   */
  const getCountOfMenu = async () => {
    const tenant = JSON.parse(localStorage.getItem("tenantInfo")).tenant_name;
    const response = await getMenuCount(tenant);
    setBackendMenuCount(response.menuCount);
  };
  /**
   * Added by - Ashish Dewangan on 12-06-2023
   * Reason - created api to get count of menu
   */

  /**
   * Added by - Ashish Dewangan on 12-06-2023
   * Reason - created api to get list of menu
   */
  const getListOfMenu = async () => {
    const tenant = JSON.parse(localStorage.getItem("tenantInfo")).tenant_name;
    const paginationDetails = {
      currentPage: currentPage,
      listPerPage: listPerPage,
    };
    const filteringCriteria = {
      paginationDetails: paginationDetails,
      columnToSort: columnToSort,
      columnSortingOrder: columnSortingOrder,
      /**
       * Commented and modified by - Ashish Dewangan on 17-06-2023
       * Reason - To trim search text before sending it to backend
       */
      // searchText: searchText,
      searchText: searchText.trim(),
      /**
       * End of code modification and modified by - Ashish Dewangan on 17-06-2023
       * Reason - To trim search text before sending it to backend
       */
    };
    const response = await getMenuList(tenant, filteringCriteria);
    setMenuList(response.menuList);

    /**
     * Added by - Ashish Dewangan on 14-06-2023
     * Reason - To recalculate page numbers
     */
    setBackendMenuCount(response.menuListCount);
    /**
     * End of code addition by - Ashish Dewangan on 14-06-2023
     * Reason - To recalculate page numbers
     */
  };
  /**
   * End of code addition by - Ashish Dewangan on 12-06-2023
   * Reason - created api to get list of menu
   */

  /**
   * Added by - Ashish Dewangan on 12-06-2023
   * Reason -  When user changes page number, this method will set page number which will be sent to backend.
   */
  const handlePageChange = async (pageNumber) => {
    //Added by ROhan KAnsari - 22/6/23
    // Reason - to set currentpage to global
    localStorage.setItem("globalPageIndex", pageNumber)
    // End of code - Rohan Kansari - 22/6/23
    setCurrentPage(pageNumber);
  };
  /**
   * End of code addition by - Ashish Dewangan on 12-06-2023
   * Reason -  When user changes page number, this method will set page number which will be sent to backend.
   */

  /**
   * Added by - Ashish Dewangan on 12-06-2023
   * Reason - Method that will set sorting criteria
   */
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
  /**
   * End of code addition by - Ashish Dewangan on 12-06-2023
   * Reason - Method that will set sorting criteria
   */

  /**
   * Added by - Ashish Dewangan on 14-06-2023
   * Reason - Method that will open edit menu form of selected menu
   */
  const openMenuDetails = (id) => {
    /**
     * Added by - Ashish Dewangan on 16-06-2023
     * Reason - To navigate to menu form
     */
    navigate("/MenuForm", { state: { id: id } });
    /**
     * End of code addition by - Ashish Dewangan on 16-06-2023
     * Reason - To navigate to menu form
     */
  };
  /**
   * Added by - Ashish Dewangan on 14-06-2023
   * Reason - Method that will open edit menu form of selected menu
   */

  // Added by Rohan kansari - 22/6/23
  // Reason - To toggle dropdown visiblity on click
  function toggelDropdown(){
    if(document.getElementById("dropdown").style.display.length==0 )
    document.getElementById("dropdown").style.display="block"
    else
    document.getElementById("dropdown").style.display=""
   }
 
   function hideDropdown(){
     document.getElementById("dropdown").style.display=""
   }
   // End of code - Rohan Kansari - 22/6/23

  return (
   // Modified by Rohan Kansari - 25/6/23
    // Reason - removing header from each page and making it global
    // <Header>
    <div className={style.container}>
      <div className={`${style.pageTitleContainer}`}>
        <div className={style.pageTitle}>Menu List</div>
      </div>

        <div className={style.menuListSection}>
          <div className={style.tableContainer}>
            <div className={style.table}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  padding: "4px",
                  width: "100%",
                }}
              >
                <Search
                /**
                 * Commented and modified by - Ashish Dewangan on 17-06-2023
                 * Reason - To change placeholder of search box
                 */
                  // placeholder="input search text"
                  placeholder="Search menu name"
                   /**
                 * End of code modification by - Ashish Dewangan on 17-06-2023
                 * Reason - To change placeholder of search box
                 */
                  allowClear
                  enterButton
                  
                  // onChange={(e)=>{e.target.value.length>=3 && setSearchText(e.target.value);}}
                  /**
                   * Commented and modified by - Ashish Dewangan on 14-06-2023
                   * Reason - To set selected page to 1 when we search something
                   */
                  // onSearch={(value)=>{value.length>=3 && setSearchText(value);}}
                  onSearch={(value) => {
                    setCurrentPage(1);
                    setSearchText(value);
                  }}
                  /**
                   * End of code modification by - Ashish Dewangan on 14-06-2023
                   * Reason - To set selected page to 1 when we search something
                   */

                  /**
                   * Commented and modified by - Ashish Dewangan on 16-06-2023
                   * Reason - To move styling to css page
                   */
                  // style={{
                  //   width: "60%",
                  // }}
                  className={style.searchBox}
                  /**
                   * End of code modification by - Ashish Dewangan on 16-06-2023
                   * Reason - To move styling to css page
                   */
                />
                
                {/* Added by - Ashish Dewangan on 1-06-2023
                Reason - Added a button to create new menu */}
                  <div
                    className={`${style.primaryButton}`}
                    onClick={() => openMenuDetails()}
                    style={{ marginLeft: "10px",minWidth:"100px",textAlign:"center" }}
                  >
                    Add Menu
                  </div>
               {/* End of code addition by - Ashish Dewangan on 1-06-2023
                Reason - Added a button to create new menu */}
              </div>

              <div className={style.tableHeadingContainer}
               // Added by Rohan Kansari - 22/6/23
                // Reason- To hide page size dropdown on outer click
                onClick={hideDropdown}
                onTouchStart={hideDropdown}
                // End of code - ROhan KAnsari - 22/6/23
              >
                <div className={style.commonColumnTitle}>Icon </div>

                {/* Commented and modified by - Ashish Dewangan on - 17-06-2023
                Reason - To sort only when we click on label */}
                {/* <div
                  className={style.commonColumnTitle}
                  onClick={(e) => {
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
                >
                  Name{" "} 
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
                  </div>
                  */}

                 <div
                  className={style.commonColumnTitle}>
                  <span  onClick={(e) => {
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
                  style={{wordBreak:"break-word"}}>Name{" "}</span>
                  <span   onClick={(e) => {
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
                 {/* End of code modification by - Ashish Dewangan on - 17-06-2023
                Reason - To sort only when we click on label */}

                {/* Commented and modified by - Ashish Dewangan on - 17-06-2023
                Reason - To sort only when we click on label */}
                {/* <div
                  className={style.commonColumnTitle}
                  onClick={(e) => {
                    setShowSortingIcon(false);
                    sortMenuList("is_active");
                  }}
                  onMouseEnter={(e) => {
                    if (columnToSort != "is_active") {
                      setShowSortingIcon(true);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (columnToSort != "is_active") {
                      setShowSortingIcon(false);
                    }
                  }}
                >
                  Is Available{" "}
                  {columnToSort == "is_active" &&
                    columnSortingOrder == "ascending" && (
                      <MdCancel className={style.sortingIcon} />
                    )}
                  {columnToSort == "is_active" &&
                    columnSortingOrder == "descending" && (
                      <MdCheckCircle className={style.sortingIcon} />
                    )}
                  {columnToSort != "is_active" && showSortingIcon && (
                    <MdCancel color="grey" className={style.sortingIcon} />
                  )}
                </div>
                <div className={style.commonColumnTitle}> Action </div>
              </div> */}
                <div
                  className={style.commonColumnTitle}
                >
                  <span onClick={(e) => {
                    setShowSortingIcon(false);
                    sortMenuList("is_active");
                  }}
                  onMouseEnter={(e) => {
                    if (columnToSort != "is_active") {
                      setShowSortingIcon(true);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (columnToSort != "is_active") {
                      setShowSortingIcon(false);
                    }
                  }} style={{wordBreak:"break-word"}}>Is Available{" "}</span>
                  <span onClick={(e) => {
                    setShowSortingIcon(false);
                    sortMenuList("is_active");
                  }}
                  onMouseEnter={(e) => {
                    if (columnToSort != "is_active") {
                      setShowSortingIcon(true);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (columnToSort != "is_active") {
                      setShowSortingIcon(false);
                    }
                  }}>
                  {columnToSort == "is_active" &&
                    columnSortingOrder == "ascending" && (
                      <MdCancel className={style.sortingIcon} />
                    )}
                  {columnToSort == "is_active" &&
                    columnSortingOrder == "descending" && (
                      <MdCheckCircle className={style.sortingIcon} />
                    )}
                  {columnToSort != "is_active" && showSortingIcon && (
                    <MdCancel color="grey" className={style.sortingIcon} />
                  )}
                  </span>
                </div>

                <div className={style.commonColumnTitle}> Action </div>
                
              </div>
              {/* End of code modification by - Ashish Dewangan on - 17-06-2023
                Reason - To sort only when we click on label */}

              <div
                className={style.tableDataContainer}
                style={{
                  backgroundColor: "#efefef",
                }}
                 // Added by Rohan Kansari - 22/6/23
                // Reason- To hide page size dropdown on outer click
                onClick={hideDropdown}
                onTouchStart={hideDropdown}
                // End of code - ROhan KAnsari - 22/6/23
              >
                {menuList != null && menuList.length > 0 ? (
                  menuList.map((menuDetails, index) => {
                    return (
                      <div
                        key={index}
                        className={style.tableData}
                        style={{
                          padding: "2px",
                          marginTop: "2px",
                          marginBottom:
                            menuList.length == index + 1 ? "2px" : "0px",
                        }}
                      >
                        <div className={style.commonColumnData}>
                          <img
                            className={style.menuImage}
                            src={config.staticBaseURL + menuDetails.icon}
                          />
                        </div>
                        <div className={style.commonColumnData} style={{wordBreak:"break-word"}}>
                          {menuDetails.name}
                        </div>

                        {menuDetails.is_active == true ? (
                          <div className={style.commonColumnData}>
                            <MdCheckCircle className={style.yesIcon} />
                          </div>
                        ) : (
                          <div className={style.commonColumnData}>
                            <MdCancel className={style.noIcon} />
                          </div>
                        )}

                        {/* Added by - Ashish Dewangan on 14-06-2023
                    Reason - To add view button */}
                        <div
                          className={`${style.commonColumnData}`}
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <div
                            className={` ${style.primaryButton}`}
                            onClick={() => openMenuDetails(menuDetails.id)}
                          >
                            View
                          </div>
                        </div>
                        {/* End of code addition by - Ashish Dewangan on 14-06-2023
                    Reason - T add view button */}
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
          {menuList && menuList.length > 0 ? (
            // Modified by Rohan kansari - 22/6/23 
            // Reason - To divide container into two part for page selector
            < div className={style.paginationContent}>

              <Pagination
                // Modified by Rohan Kansari - 22/6/23
                // Reason - To set update current page in default in first time
                // defaultCurrent={1}
                defaultCurrent={currentPage}

                /**
                 * Added by - Ashish Dewangan on 14-06-2023
                 * Reason - To set current selected page number
                 */
                current={currentPage}
                /**
                 * End of code addition by - Ashish Dewagnan on 14-06-2023
                 * Reason - To set current selected page number
                 */
                total={backendMenuCount}
                defaultPageSize={listPerPage}
                pageSize={listPerPage}
                onChange={handlePageChange}
                simple
              />

              <div className={style.dropdown} onClick={toggelDropdown}>
                <button className={style.dropbtn}> {listPerPage} / Page <MdArrowDropUp style={{ margin: "5px 0" }} /></button>
                <div className={style.dropdown_content} id="dropdown">
                {/* Modified by ROhan kansari - 26/6/23 
                      Reason - To change condition for showing list */}
                {backendMenuCount > 40 ? <span href="#" onClick={e => { setListPerPage(50); setCurrentPage(1); localStorage.setItem("listPerPage", 50) }} >50 / Page</span> : null}
                  {backendMenuCount > 30 ? <span href="#" onClick={e => { setListPerPage(40); setCurrentPage(1); localStorage.setItem("listPerPage", 40) }} >40 / Page</span> : null}
                  {backendMenuCount > 20 ? <span href="#" onClick={e => { setListPerPage(30); setCurrentPage(1); localStorage.setItem("listPerPage", 30) }} >30 / Page</span> : null}
                  <span href="#" onClick={e => { setListPerPage(20); setCurrentPage(1); localStorage.setItem("listPerPage", 20) }}>20 / Page</span> 
                  <span href="#" onClick={e => { setListPerPage(10); localStorage.setItem("listPerPage", 10) }}>10 / Page</span>
                {/* End of code - Rohan kansari - 26/6/23 */}
                </div>
              </div>
            </div>
            // End of code - Modification - 22/6/23 - Rohan Kansari
            // Reason - To separate div and add Selection box for page item size 

          ) : null}
        </div>
      </div>
    // </Header>
  );
};

export default Menu;
