import API from "./api";

export const registerUser = async (value) => {
  const response = await API.post(`/register-user/`, value, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).catch((err) => console.log(err));
  return response ? response.data : {};
};

export const loginUser = async (value) => {
  const response = await API.post(`/login/`, value, {
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => console.log(err));
  return response ? response.data : {};
};

export const tokenValidationAPI = async (tokens) => {
  const response = await API.post(`/validate-token/`, tokens, {
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => console.log(err));
  return response ? response.data : {};
};

export const sendOtp = async (value) => {
  const response = await API.post(`/save-otp/`, value, {
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => console.log(err));
  return response ? response.data : {};
};

export const updatePassword = async (value) => {
  const response = await API.put(`/update-password/`, value, {
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => console.log(err));
  return response ? response.data : {};
};

export const getDistrictList = async () => {
  const response = await API.get(`/district-list/`, {
    headers: {
      "Content-Type": "application/json",
   },
  }).catch((err) => console.log(err));
  return response ? response.data : {};
};

export const equipmentTypeCount = async () => {
  const response = await API.get(`/equipment-type-count/`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => console.log(err));
  return response ? response.data : {};
};

export const equipmentTypeList = async (filteringCriteria) => {
  const response = await API.post(`/equipment-type-list/`, filteringCriteria, {
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => console.log(err));
  return response ? response.data : {};
};

export const getEquipmentType = async (equipmentTypeID) => {
  const response = await API.get(`/equipment-type-details/${equipmentTypeID}`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => console.log(err));
  return response ? response.data : {};
};

export const postEquipmentType = async (values) => {
  const response = await API.post(`/equipment-type-details/`, values, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).catch((err) => console.log(err));
  return response ? response.data : {};
};

export const getDashboardData = async (tenantId) => {
  const response = await API.get(`/get-dashboard-data/`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => console.log(err));
  return response ? response.data : {};
};
