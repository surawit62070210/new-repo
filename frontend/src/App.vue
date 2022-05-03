<template>
  <div id="app">
    <nav
      class="navbar has-background-warning"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item">
          <img
            src="https://www.engdict.com/data/dict/media/images_public/footb-00025070637255850841214084_normal.png"
            width="32"
            height="28"
          />
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a
            class="navbar-item"
            v-if="!isAdmin()"
            href="http://localhost:8080/"
          >
            Home
          </a>
          <a class="navbar-item" v-else href="http://localhost:8080/AdminHome">
            Home
          </a>
          <a
            class="navbar-item"
            v-if="!isAdmin()"
            href="http://localhost:8080/store"
          >
            IT-Stadium Store
          </a>
          <a class="navbar-item" v-else href="http://localhost:8080/Adminstore">
            IT-Stadium Store
          </a>
          <a class="navbar-item" href="http://localhost:8080/booking">
            Stadium Booking
          </a>
          <a class="navbar-item" href="http://localhost:8080/stadium">
            Stadium Information
          </a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons" v-if="!user">
              <a class="button is-primary">
                <router-link to="/regis">
                  <strong>Sign up</strong>
                </router-link>
              </a>
              <a class="button is-light"
                ><router-link to="/Login">
                  <strong>Login</strong>
                </router-link></a
              >
            </div>
            <div v-else>
              <span>
                <div class="navbar-item has-dropdown is-hoverable">
                  <a class="navbar-link">
                    <figure class="image is-24x24 my-auto">
                      <img
                        class="is-rounded"
                        :src="imagePath(this.user[0].picture)"
                      />
                    </figure>
                    <span class="pl-3">
                      {{ username }}
                    </span>
                  </a>
                  <div class="navbar-dropdown">
                    <a
                      v-if="!isAdmin()"
                      class="navbar-item"
                      href="http://localhost:8080/userprofile"
                      >Profile</a
                    >
                    <a
                      v-else
                      class="navbar-item"
                      href="http://localhost:8080/Adminprofile"
                      >Profile</a
                    >
                    <a class="navbar-item" @click="logout">Log out</a>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view
      :key="$route.fullPath"
      @auth-change="onAuthChange"
      :user="user"
    />
  </div>
</template>
<script>
import axios from "@/plugins/axios";
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      user: null,
      username: "",
      role: "",
    };
  },
  validations: {
    UserName: {
      required: required,
    },
    Pass: {
      required: required,
    },
  },
  mounted() {
    this.onAuthChange();
  },
  methods: {
    isAdmin() {
      if (this.role == "admin") return true;
      return false;
    },
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.user = null;
      this.role = "";
      this.$router.push({ path: "/" });
    },
    getUser() {
      axios.get("/user/me").then((res) => {
        this.user = res.data;
        this.username = res.data[0].username;
        this.role = res.data[0].role;
      });
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/128x128.png";
      }
    },
  },
};
</script>