import router from "@/router";
import apiClient from "@/service/AxiosClient.js";
import GStore from "@/store";
export default {
  login(user) {
    return apiClient
      .post("api/v1/login", user)
      .then((response) => {
        console.log(response.data.data);
        if (
          response.data.data.username != undefined &&
          response.data.data.approve != false
        ) {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.data.username)
          );
          GStore.currentUser = response.data.data.username;
          console.log(GStore.currentUser);
          GStore.user_info = response.data.data;
        } else {
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.data.email)
          );
          GStore.currentUser = response.data.data.email;
          GStore.user_info = response.data.data;
        }

        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  register(user) {
    return apiClient.post("api/v1/register", user).then((response) => {
      console.log(response.data.data);
    });
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    GStore.currentUser = null;
    GStore.productList = null;
    router.push("/login");
  },
};
