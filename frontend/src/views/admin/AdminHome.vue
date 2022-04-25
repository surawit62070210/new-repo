<style>
.body {
  background-image: url("https://wallpaperaccess.com/full/2514318.jpg");
  position: relative;
  top: 10;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}

.row {
  display: table;
}

.column {
  float: left;
}

.add {
  width: 250px;
  padding: 10px;
  margin: 0;
  border-radius: 25px;
  position: relative;
  left: 100px;
  top: 20px;
}

.list {
  background: rgb(0, 149, 252);
  background: linear-gradient(
    90deg,
    rgba(0, 149, 252, 1) 0%,
    rgba(0, 149, 252, 0) 51%,
    rgba(0, 134, 255, 1) 100%
  );
  width: 1000px;
  padding: 10px;
  margin: 0;
  border-radius: 25px;
  position: relative;
  left: 100px;
  top: 20px;
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
</style>
<template>
  <div class="body">
    <div id="app">
      <!-- modal1 -->
      <div class="modal" v-bind:class="{ 'is-active': show_modal }">
        <div class="modal-background"></div>
        <div class="modal-card" style="max-width: 960px; width: 90%">
          <header class="modal-card-head">
            <p class="modal-card-title">Add Promotion Code</p>
            <button
              @click="show_modal = !show_modal"
              class="delete"
              aria-label="close"
            ></button>
          </header>
          <section class="modal-card-body">
            <div>
              <b>Code</b>
              <input
                v-model="code"
                class="input"
                type="text"
                placeholder="Code"
              />
            </div>

            <b>Code for who?</b>
            <input
              class="input"
              type="text"
              placeholder="guess"
              v-model="who"
            />
            <b>Discount %</b>
            <input
              class="input"
              type="text"
              placeholder="%"
              v-model="discount"
            />
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" @click="addItem()">
              Save changes
            </button>
            <button class="button" @click="show_modal = !show_modal">
              Cancel
            </button>
          </footer>
        </div>
      </div>
      <!-- modal1 -->
      <br />
      <div class="row">
        <div class="column">
          <div class="list">
            <h1 style="text-align: center; font-size: 30px">
              Promotion code list
            </h1>
            <div class="row">
              <div
                class="column"
                v-for="(promo, index) in promotions"
                :key="promo.id"
              >
                <div class="card" style="width: 300px">
                  <div class="card-content">
                    <p class="title">{{ promo.promotion_code }}</p>
                    <p class="subtitle">{{ promo.promotion_rate }}% OFF</p>
                  </div>
                  <footer class="card-footer">
                    <p class="card-footer-item">
                      For {{ promo.promotion_name }}
                    </p>
                    <p class="card-footer-item">
                      <span>
                        <button
                          class="button is-danger"
                          @click="deleteCode(promo, index)"
                        >
                          ลบ
                        </button>
                      </span>
                    </p>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="add">
            <div class="row">
              <button
                class="button is-success"
                @click="show_modal = !show_modal"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
    <footer class="under">
      <h3>1way © 2021</h3>
    </footer>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      show_modal: false,
      show_modal2: false,
      promotions: [],

      code: "",
      who: "",
      discount: "",
    };
  },
  mounted() {
    this.getBlogs();
  },
  methods: {
    axios,
    getBlogs() {
      axios
        .get("http://localhost:3000")
        .then((response) => {
          this.promotions = response.data.promotions;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteCode(product, index) {
      const result = confirm(
        `Are you sure you want to delete \'${product.promotion_code}\'`
      );
      if (result) {
        axios
          .delete(`http://localhost:3000/code/${product.id}`)
          .then(() => {
            this.promotions.splice(index, 1);
            console.log("Success");
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    },
    addItem() {
      let formData = {
        code: this.code,
        who: this.who,
        discount: this.discount,
      };

      axios
        .post("http://localhost:3000/addPromo", formData)
        .then((res) => {
          this.promotions.push(formData);
          this.code = "";
          this.who = "";
          this.discount = "";
          this.show_modal = false;
        })
        .catch((e) => console.log(e.response.data));
    },
  },
};
</script>