/**
 * Added by - Ashish Dewangan on 15-06-2023
 * Reason - created form to get user input for menu details
 */
import { useEffect, useState } from "react";
import style from "./menuForm.module.css";
import Header from "../GlobalComponent/Header";
import { getMenuDetails, postMenuDetails } from "../../Api/services";
import { Message, enableHeader } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../../Api/config";
 
function MenuForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuData, setMenuData] = useState({});
  const [menuId, setMenuId] = useState(null);
  const [name, setName] = useState(null);
  const [icon, setIcon] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [selectedImageName, setSelectedImageName] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  /**
   * Commented by - Ashish dewangan on 17-06-2023
   * Reason - To handle validation differently
   */
  // const [validationErrors, setValidationErrors] = useState({
  //   name: "",
  //   icon: "",
  //   is_active: "",
  // });
  /**
  * End of comment by - Ashish dewangan on 17-06-2023
  * Reason - To handle validation differently
  */

  /**
   * Added by - Ashish dewangan on 17-06-2023
   * Reason - To handle validation differently
   */
  const [nameError, setNameError] = useState("")
  const [iconError, setIconError] = useState("")
  /**
   * End of code addition by - Ashish dewangan on 17-06-2023
   * Reason - To handle validation differently
   */

  /**
   * Added by - Ashish Dewangan on 15-06-2023
   * Reason - method that will execute when page loads and then call api
   */
  useEffect(() => {
    // Added By Rohan Kansari - 25/6/23
    // Reason - To enable headerSiderbar
    enableHeader()
    // End of code - Rohan kansari - 25/6/23
    window.scrollTo(0, 0);
    if (location.state.id != null) {
      setMenuId(location.state.id);
    }
  }, []);

  useEffect(() => {
    if (menuId) {
      getMenuData();
    }
  }, [menuId]);
  /**
   * End of code addition by - Ashish Dewangan on 15-06-2023
   * Reason - method that will execute when page loads and then call api
   */

  /**
   * Added by - Ashish Dewangan on 15-06-2023
   * Reason - created api that will get menu data
   */
  const getMenuData = async () => {
    const tenant = JSON.parse(localStorage.getItem("tenantInfo")).tenant_name;
    const response = await getMenuDetails(tenant, menuId);
    if (response.menu) {
      setMenuData(response.menu);
      setMenuId(response.menu.id);
      setName(response.menu.name);
      setIcon(response.menu.icon);
      setIsActive(response.menu.is_active);
    }
  };
  /**
   * End of code addition by - Ashish Dewangan on 15-06-2023
   * Reason - created api that will get menu data
   */

  /**
   * Added by - Ashish Dewangan on 16-06-2023
   * Reason -  method to validate inputs when input is focused out
   */
  const validateOnBlur = (inputName, value) => { };
  /**
   * End of code addition by - Ashish Dewangan on 16-06-2023
   * Reason -  method to validate inputs when input is focused out
   */

  /**
   * Added by - Ashish Dewangan on 16-06-2023
   * Reason - method to validate inputs when user is entering some data
   */
  const validateOnInput = (inputName, value) => {
    /**
     * Added by - Ashish Dewangan on 17-06-2023
     * Reason - added validation for name
     */
    if (inputName == "name") {
      if (value != null || value != undefined || value.trim() != "") {
        setNameError("")
      }
    }
    /**
    * End of code addition by - Ashish Dewangan on 17-06-2023
    * Reason - added validation for name
    */
  };
  /**
   * End of code addition by - Ashish Dewangan on 16-06-2023
   * Reason -  method to validate input when user is entering some data
   */

  /**
   * Added by - Ashish Dewangan on 16-06-2023
   * Reason - method to validate image when user is entering some data
   */
  const validateOnFileInput = (inputName, value) => {
    /**
     * Commented and modified by - Ashish dewangan on 17-06-2023
     * Reason - To handle validation differently
     */
    // if (inputName == "icon") {
    //   if (value != null && value != undefined) {
    //     if (value.size / 1024 > 200) {
    //       const error = {
    //         icon: "File size must be below 200 KB",
    //       };
    //       setValidationErrors({ ...validationErrors, ...error });
    //     } else {
    //       const error = {
    //         icon: "",
    //       };
    //       setValidationErrors({ ...validationErrors, ...error });
    //     }
    //   } else {
    //     const error = {
    //       icon: "",
    //     };
    //     setValidationErrors({ ...validationErrors, ...error });
    //   }
    // }
    if (inputName == "icon") {
      if (value != null && value != undefined) {
        if (value.size / 1024 > 200) {
          setIconError("File size must be below 200 KB")
        } else {
          setIconError("")
        }
      } else {
        setIconError("")
      }
    }
    /**
     * Commented and modified by - Ashish dewangan on 17-06-2023
     * Reason - To handle validation differently
     */
  };
  /**
   * End of code addition by - Ashish Dewangan on 16-06-2023
   * Reason -  method to validate images when user is entering some data
   */

  /**
   * Added by - Ashish Dewangan on 16-06-2023
   * Reason - created api to save menu. After saving the menu it will redirect to menu list page.
   */
  const saveMenu = async () => {
    var allowDataPost = false;

    /**
   * Commented and modified by - Ashish dewangan on 17-06-2023
   * Reason - To handle validation differently
   */
    // if (name == null || name == undefined || name.trim() == "") {
    //   allowDataPost = false;
    // } else {
    //   if (menuId == null || menuId == undefined) {
    //     if (selectedImage == null || selectedImage == undefined) {
    //       allowDataPost = false;
    //     } else {
    //       allowDataPost = true;
    //     }
    //   } else {
    //     allowDataPost = true;
    //   }
    // }

    // if (validationErrors.icon != "" || validationErrors.name != "") {
    //   allowDataPost = false;
    // }


    if (name == null || name == undefined || name.trim() == "") {
      setNameError("Please enter menu name")
    } else {
      setNameError("")
    }

    if (menuId == null || menuId == undefined) {
      if (selectedImage == null || selectedImage == undefined) {
        setIconError("Please select image")
      } else {
        setIconError("")
      }
    } else {
      setIconError("")
    }

    if (name == null || name == undefined || name.trim() == "" ||
      ((menuId == null || menuId == undefined) && (selectedImage == null || selectedImage == undefined))) {
      allowDataPost = false
    } else {
      if (nameError != "" || iconError != "") {
        allowDataPost = false;
      }else{
        allowDataPost = true;
      }
    }
      /**
   * Commented and modified by - Ashish dewangan on 17-06-2023
   * Reason - To handle validation differently
   */

    if (allowDataPost) {
      
      const updatedMenuData = new FormData();
      if (menuId) {
        updatedMenuData.append("id", menuId);
      }
      updatedMenuData.append("name", name.trim());
      if (selectedImage != null || selectedImage != undefined) {
        updatedMenuData.append("icon", selectedImage);
      }
      updatedMenuData.append("is_active", isActive);

      const tenant = JSON.parse(localStorage.getItem("tenantInfo")).tenant_name;
      const response = await postMenuDetails(tenant, updatedMenuData);
      if (response.msg) {
        Message("Menu saved successfully.", "success");
        navigate(-1);
      } else {
        Message("Something went wrong", "error");
      }
    } 
     /**
   * Commented by - Ashish dewangan on 17-06-2023
   * Reason - To handle validation differently
   */
    // else {
    //   Message("Please provide values for all mandatory fields", "info");
    // }
     /**
   * End of code comment  by - Ashish dewangan on 17-06-2023
   * Reason - To handle validation differently
   */


    /**
     * End of code addition by - Ashish Dewangan on 16-06-2023
     * Reason - created api to save menu. After saving the menu it will redirect to menu list page.
     */
  };

  /**
   * Added by - Ashish Dewangan on 15-06-2023
   * Reason - Method to reset menu form
   */
  const resetMenuForm = (event) => {
    setName(menuData.name ? menuData.name : "");
    setIcon(menuData.icon ? menuData.icon : "");
    // Addition and commented by Om Shrivastava on 07-07-2023
    // Reason - to set checkbox value
    // setIsActive(menuData.is_active ? menuData.is_active : true);
    // setIsActive(menuData.is_active ?  true:false);
    // Modification by Om Shrivastava on 08-07-23
    // Reason : set the checkbox value
    setIsActive(typeof menuData.is_active==='boolean' ? menuData.is_active ?true : false:true );
    // End of addition and modification by Om Shrivastava on 08-07-23
    // setIsActive(menuData.is_active); 
    // End of addition by Om Shrivastava on 07-07-2023
    setSelectedImageName(null);
    /**
     * Added by - Ashish Dewangan on 17-06-2023
     * Reason - To clear selected icon
     */
    setSelectedImage(null);
    /**
     * End of code addition by - Ashish Dewangan on 17-06-2023
     * Reason - To clear selected icon
     */
    document.getElementById("icon").value = "";

    /**
   * Commented and modified by - Ashish dewangan on 17-06-2023
   * Reason - To handle validation differently
   */
    // const error = {
    //   name: "",
    //   icon: "",
    //   is_active: "",
    // };
    // setValidationErrors({ ...validationErrors, ...error });

   setIconError("")
   setNameError("")
  };
  /**
   * End of code modification by - Ashish dewangan on 17-06-2023
   * Reason - To handle validation differently
   */
  /**
   * End of code addition by - Ashish Dewangan on 15-06-2023
   * Reason - To reset menu form
   */

  return (
   // Modified by Rohan Kansari - 25/6/23
    // Reason - removing header from each page and making it global
    // <Header>
      <div className={style.container}>
        <div className={style.titleContainer}>
          <div className={style.pageTitle}>Menu</div>
        </div>
        <form className={style.menuSection}>
          <div className={style.formContainer}>
            <div className={`${style.sectionInsideForm}`}>

              <div className={`${style.inputContainer}`}>
                <div className={`${style.inputArea}`}>
                  <div className={`${style.inputLabel}`}>
                    <span className={style.mendatoryField}>* </span>Icon
                  </div>
                  <div className={style.menuImageContainer}>
                    {selectedImageName ? (
                      selectedImageName
                    ) : icon ? (
                      <img
                        src={config.staticBaseURL + icon}
                        className={style.menuImage}
                        width={"200px"}
                        height={"200px"}
                      />
                    ) : null}
                  </div>
                </div>
              </div>

              <div className={`${style.inputContainer}`}>
                <div className={`${style.inputArea}`}>
                  <div className={`${style.inputLabel}`}>
                    <span className={style.optionalField}>* </span>Select new
                    icon
                  </div>

                  <input
                    className={`${style.textInputBox}`}
                    type="file"
                    name="icon"
                    id="icon"
                    accept="image/png,image/jpg,image/jpeg"
                    style={{ width: "200px" }}
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        setSelectedImageName(e.target.files[0].name);
                        setSelectedImage(e.target.files[0]);
                        validateOnFileInput("icon", e.target.files[0]);
                      }
                      else{
                        setSelectedImageName(null);
                        setSelectedImage(null)}
                    }}
                  />
                </div>

                <div className={`${style.inputErrorArea}`}>
                  {/* Commented and modified by - Ashish Dewangan on 17-06-2023
                  Reason - To handle validation differently */}
                  {/* {validationErrors.icon} */}
                  {iconError}
                  {/* End of code modification by - Ashish Dewangan on 17-06-2023
                  Reason - To handle validation differently */}
                </div>
              </div>

              <div className={`${style.inputContainer}`}>
                <div className={`${style.inputArea}`}>
                  <div className={`${style.inputLabel}`}>
                    <span className={style.mendatoryField}>* </span>Name
                  </div>
                  <input
                    className={`${style.textInputBox}`}
                    type="text"
                    name="name"
                    value={name}
                    style={{ width: "200px" }}
                    onChange={(e) => {
                      setName(e.target.value.toString());
                      validateOnInput("name", e.target.value.toString());
                    }}
                    maxLength={30}
                  />
                </div>
                <div className={`${style.inputErrorArea}`}>
                  {/* Commented and modified by - Ashish Dewangan on 17-06-2023
                  Reason - To handle validation differently */}
                {/* {validationErrors.name} */}
                  {nameError}
                  {/* End of code modification by - Ashish Dewangan on 17-06-2023
                  Reason - To handle validation differently */}
                </div>
              </div>

              <div className={`${style.inputContainer}`}>
                <div className={`${style.inputArea}`}>
                  <div className={`${style.inputLabel}`}>
                    <span className={style.optionalField}>* </span>Is Available
                  </div>
                  <input
                    className={`${style.textInputBox}`}
                    type="checkbox"
                    name="is_available"
                    style={{ width: "18px", height: "18px" }}
                    checked={isActive}
                    onChange={(e) => {
                      setIsActive(e.target.checked);
                      validateOnInput("is_available", e.target.value);
                    }}
                  />
                </div>
                <div className={`${style.inputErrorArea}`}>
                  {/* Commented and modified by - Ashish Dewangan on 17-06-2023
                  Reason - To handle validation differently */}
                  {/* {validationErrors.is_active} */}
                  {""}
                  {/* End of code modification by - Ashish Dewangan on 17-06-2023
                  Reason - To handle validation differently */}
                </div>
              </div>

            
              
            </div>
          </div>

          <div className={style.actionContainer}>
            <div
              className={` ${style.backButton}`}
              style={{
                marginRight: "10px",
              }}
              onClick={(e) => {
                navigate(-1);
              }}
            >
              Back
            </div>

            <div
              className={` ${style.cancelButton}`}
              style={{
                marginRight: "10px",
              }}
              onClick={(e) => {
                resetMenuForm();
                window.scrollTo(0, 0);
              }}
            >
              Clear
            </div>

            <div
              className={` ${style.proceedButton}`}
              onClick={() => {
                saveMenu();
                window.scrollTo(0, 0);
              }}
            >
              Save
            </div>
          </div>
        </form>
      </div>
    //</Header>
  );
}
export default MenuForm;
