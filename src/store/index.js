import { reactive } from "vue";
export default reactive({
  currentUser: JSON.parse(localStorage.getItem("user")),
  user_info: null,
  productList: null,
  orderList: null,
  userList: null,
  product_info: null,
});
