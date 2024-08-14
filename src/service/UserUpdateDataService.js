import apiClient from "./AxiosClient";
export default {
  getUserUpdate(username) {
    console.log("Current User from User update:" + username);
    return apiClient.get(`/users/user_info`, {
      params: { username: username },
    });
  },
};
