<style >
.container {
  position: relative;
  width: 100%;
}

.image {
  display: block;
  width: 950px;
  height: 600px;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: gray;
  overflow: hidden;
  width: 0;
  height: 100%;
  transition: 1s ease;
}

.container:hover .overlay {
  width: 100%;
}

.text {
  white-space: nowrap;
  color: white;
  font-size: 50px;
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.under {
  text-align: right;
  padding: 8px;
  background-color: black;
}
h3 {
  font-size: 20px;
  color: white;
}

.body {
  background-color: gray;
  position: relative;
  top: 10;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
<template>
  <div class="container is-fluid mt-5">
    <div class="columns is-centered">
      <div class="container">
        <img
          src="https://images.wallpaperscraft.com/image/football_ball_ball_football_151392_3840x2160.jpg"
          alt="Avatar"
          class="image"
        />
        <div class="overlay">
          <img
            src="https://wallpaperaccess.com/full/2968925.jpg"
            alt="Avatar"
            class="image"
          />
        </div>
      </div>

      <div class="column is-4 has-background-light">
        <h1 class="title">Log in</h1>

        <p
          v-if="error"
          class="px-3 py-2 mb-3 has-text-danger-dark has-background-danger-light"
        >
          {{ error }}
        </p>

        <!-- Login form -->
        <div class="fields">
          <label class="label">Username</label>
          <div class="control has-icons-left">
            <input
              v-model="$v.username.$model"
              :class="{ 'is-danger': $v.username.$error }"
              class="input"
              type="text"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
          <template v-if="$v.username.$error">
            <p class="help is-danger" v-if="!$v.username.required">
              This field is required
            </p>
          </template>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="$v.password.$model"
              :class="{ 'is-danger': $v.password.$error }"
              class="input"
              type="password"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
          <template v-if="$v.password.$error">
            <p class="help is-danger" v-if="!$v.password.required">
              This field is required
            </p>
          </template>
        </div>

        <button class="button is-primary is-fullwidth" @click="submit">
          Login
        </button>
        <label class="label" @click="modal = true">forgot your password?</label>

        <p class="my-3">
          Don't have an account yet?
          <router-link to="/regis">
            <strong>Sign up</strong>
          </router-link>
        </p>
      </div>
      <div class="modal" :class="{ 'is-active': modal }">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Change Password</p>
            <button
              class="delete"
              aria-label="close"
              @click="modal = !modal"
            ></button>
          </header>
          <section class="modal-card-body">
            <p
              v-if="error2"
              class="has-text-danger-dark has-background-danger-light"
            >
              {{ error2 }}
            </p>
            <b>Username</b>
            <input
              class="input"
              v-model="$v.username.$model"
              :class="{ 'is-danger': $v.username.$error }"
            />
            <template v-if="$v.username.$error">
              <p class="help is-danger" v-if="!$v.username.required">
                This field is required
              </p>
            </template>
            <b>Mobile</b>
            <input
              class="input"
              v-model="$v.password.$model"
              :class="{ 'is-danger': $v.password.$error }"
            />
            <template v-if="$v.password.$error">
              <p class="help is-danger" v-if="!$v.password.required">
                This field is required
              </p>
            </template>
            <b>New Password</b>
            <input
              class="input"
              v-model="$v.newpass.$model"
              :class="{ 'is-danger': $v.newpass.$error }"
            />
            <template v-if="$v.newpass.$error">
              <p class="help is-danger" v-if="!$v.newpass.required">
                This field is required
              </p>
              <p class="help is-danger" v-if="!$v.newpass.minLength">
                password must be more than or equal 8 char
              </p>
              <p class="help is-danger" v-if="!$v.newpass.complex">
                password must be complex
              </p>
            </template>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" @click="changePass()">
              Save changes
            </button>
            <button class="button" @click="modal = !modal">Cancel</button>
          </footer>
        </div>
      </div>
      <div class="modal" :class="{ 'is-active': modal2 }">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Secret Code</p>
            <button
              class="delete"
              aria-label="close"
              @click="modal2 = !modal2"
            ></button>
          </header>
          <section class="modal-card-body">
            <b>Secret Code</b>
            <input
              class="input"
              v-model="$v.code.$model"
              :class="{ 'is-danger': $v.code.$error }"
            />
            <template v-if="$v.code.$error">
              <p class="help is-danger" v-if="!$v.code.required">
                This field is required
              </p>
            </template>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" @click="checkAdmin">
              Save changes
            </button>
            <button class="button" @click="modal2 = !modal2">Cancel</button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import { required, minLength } from "vuelidate/lib/validators";

function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}
export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
      //modal ChangePass
      modal: false,
      newpass: "",
      error2: "",

      //modal2
      modal2: false,
      code: "",
    };
  },
  validations: {
    username: {
      required: required,
    },
    password: {
      required: required,
    },
    code: {
      required: required,
    },
    newpass: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,
    },
  },
  methods: {
    checkAdmin() {
      if (this.code == "heroAdmind") {
        this.$router.push({ path: "/AdminHome" });
      } else {
        alert("Admin Code is not match");
        this.username = "";
        this.password = "";
        this.modal2 = false;
      }
    },
    changePass() {
      const data = {
        username: this.username,
        password: this.password,
        newpass: this.newpass,
      };
      console.log({ data: data });
      axios
        .put("http://localhost:3000/user/changepass", data)
        .then(() => {
          alert("Success for ChangePassword");
          this.modal = false;
          this.username = "";
          this.password = "";
          this.newpass = "";
        })
        .catch((error) => {
          this.error2 = error.response.data;
          console.log(error.response.data);
        });
    },
    submit() {
      const data = {
        username: this.username,
        password: this.password,
      };
      axios
        .post("http://localhost:3000/user/login/", data)
        .then((res) => {
          const token = res.data.token;
          localStorage.setItem("token", token);
          this.$emit("auth-change");
          if (this.username == "Admin") {
            this.modal2 = true;
          } else {
            this.$router.push({ path: "/" });
          }
        })
        .catch((error) => {
          this.error = error.response.data;
          console.log(error.response.data);
        });
    },
  },
};
</script>