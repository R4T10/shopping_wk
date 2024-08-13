<template>
  <div
    class="min-h-screen bg-gradient-to-r from-gray-200 to-gray-400 py-6 flex flex-col justify-center sm:py-12"
  >
    <div class="relative py-3 sm:max-w-2xl sm:mx-auto">
      <div
        class="relative bg-white shadow-lg sm:rounded-3xl sm:p-0 flex flex-col sm:flex-row"
      >
        <!-- Image Section -->
        <div class="sm:w-1/2 p-6 sm:p-0">
          <img
            src="../assets/image_login.jpg"
            alt="Placeholder Image"
            class="object-cover h-full w-full sm:rounded-l-3xl"
          />
        </div>
        <!-- Form Section -->
        <div class="sm:w-1/2 p-6 sm:p-10">
          <div class="text-center">
            <h1 class="text-3xl font-bold mb-6 text-gray-700">
              {{ isFlipped ? "Register" : "Login To SCRIPT" }}
            </h1>
            <Form @submit="handleSubmit" :validation-schema="schema">
              <div
                class="py-8 text-base leading-6 space-y-6 text-gray-700 sm:text-lg sm:leading-7"
              >
                <!-- Conditionally Render Fields -->
                <div class="relative mb-4">
                  <Field
                    autocomplete="off"
                    id="username"
                    name="username"
                    type="text"
                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-gray-950"
                    placeholder="Username"
                  />
                  <ErrorMessage
                    name="username"
                    class="text-red-500 text-sm mt-1"
                    v-if="touchedFields.username"
                  />
                  <label
                    for="username"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >Username</label
                  >
                </div>
                <div class="relative mb-2">
                  <Field
                    autocomplete="off"
                    id="password"
                    name="password"
                    type="password"
                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-gray-950"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    class="text-red-500 text-sm mt-1"
                    v-if="touchedFields.password"
                  />
                  <label
                    for="password"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >Password</label
                  >
                </div>
                <!-- Additional Fields for Registration -->
                <div v-if="isFlipped">
                  <div class="relative mb-6">
                    <Field
                      autocomplete="off"
                      id="firstName"
                      name="firstName"
                      type="text"
                      class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-gray-950"
                      placeholder="First Name"
                    />
                    <ErrorMessage
                      name="firstName"
                      class="text-red-500 text-sm mt-1"
                      v-if="touchedFields.firstName"
                    />
                    <label
                      for="firstName"
                      class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >First Name</label
                    >
                  </div>
                  <div class="relative mb-6">
                    <Field
                      autocomplete="off"
                      id="lastName"
                      name="lastName"
                      type="text"
                      class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-gray-950"
                      placeholder="Last Name"
                    />
                    <ErrorMessage
                      name="lastName"
                      class="text-red-500 text-sm mt-1"
                      v-if="touchedFields.lastName"
                    />
                    <label
                      for="lastName"
                      class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >Last Name</label
                    >
                  </div>
                  <div class="relative mb-4">
                    <Field
                      autocomplete="off"
                      id="email"
                      name="email"
                      type="email"
                      class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-gray-950"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="email"
                      class="text-red-500 text-sm mt-1"
                      v-if="touchedFields.email"
                    />
                    <label
                      for="email"
                      class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >Email</label
                    >
                  </div>
                </div>
                <div class="relative flex flex-col items-center">
                  <button
                    class="bg-gray-950 hover:bg-gray-800 text-white font-bold rounded-md px-4 py-2 transition duration-300 ease-in-out mb-4"
                  >
                    {{ isFlipped ? "Register" : "Submit" }}
                  </button>
                  <button
                    @click="toggleForm"
                    class="text-blue-500 hover:text-blue-700"
                  >
                    {{
                      isFlipped
                        ? "Already have an account? Login"
                        : "Create an account"
                    }}
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import AuthService from "@/service/AuthService.js";

export default {
  name: "AuthView",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      isFlipped: false,
      loading: false,
      message: "",
      schema: yup.object().shape({
        username: yup.string().required("Username is required!"),
        password: yup.string().required("Password is required!"),
      }), // Default to login schema
      touchedFields: {
        username: false,
        password: false,
        firstName: false,
        lastName: false,
        email: false,
      },
    };
  },
  methods: {
    toggleForm() {
      this.isFlipped = !this.isFlipped;
      this.updateSchema();
    },
    updateSchema() {
      if (this.isFlipped) {
        this.schema = yup.object().shape({
          username: yup.string().required("Username is required!"),
          password: yup.string().required("Password is required!"),
          firstName: yup.string().required("First Name is required!"),
          lastName: yup.string().required("Last Name is required!"),
          email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required!"),
        });
      } else {
        this.schema = yup.object().shape({
          username: yup.string().required("Username is required!"),
          password: yup.string().required("Password is required!"),
        });
      }
    },
    handleSubmit(user) {
      if (this.isFlipped) {
        this.handleRegister(user); // Handle registration
      } else {
        this.handleLogin(user); // Handle login
      }
    },
    handleLogin(user) {
      console.log(user);
      AuthService.login(user)
        .then(() => {
          this.$router.push({ path: "/home" });
        })
        .catch((error) => {
          console.log(error);
          this.message = "Could not login";
        });
    },
    handleRegister(user) {
      console.log(user);
      const userData = { ...user };
      AuthService.register(userData)
        .then(() => {
          this.$router.push({ path: "/home" });
        })
        .catch((error) => {
          console.log(error);
          this.message = "Could not register";
        });
    },
    handleBlur(field) {
      this.touchedFields[field] = true;
    },
  },
};
</script>
