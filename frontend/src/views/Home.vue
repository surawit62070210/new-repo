
<style>
li {
  font-size: 25px;
}

h2 {
  font-size: 30px;
  text-align: center;
}

p {
  font-size: 25px;
  text-align: center;
}

.bottomleft {
  background: rgb(0, 134, 255);
  background: linear-gradient(
    90deg,
    rgba(0, 134, 255, 1) 0%,
    rgba(255, 255, 255, 1) 100%,
    rgba(0, 149, 252, 1) 100%
  );
  width: 550px;
  padding: 10px;
  margin: 0;
  border-radius: 25px;
  position: relative;
  left: 200px;
  top: 0px;
}

.bottomright {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(0, 134, 255, 1) 100%,
    rgba(0, 149, 252, 1) 100%
  );
  width: 550px;
  padding: 10px;
  margin: 0;
  border-radius: 25px;
  position: relative;
  left: 190px;
  top: 0px;
}

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
*/ .dd {
  padding-top: 60px;
  margin-left: -291px;
  font-size: 30px;
}

.top {
  background: rgb(0, 134, 255);
  background: linear-gradient(
    90deg,
    rgba(0, 134, 255, 1) 0%,
    rgba(0, 181, 249, 0) 52%,
    rgba(0, 149, 252, 1) 100%
  );
  width: 1150px;
  padding: 10px;
  margin: 0;
  border-radius: 25px;
  position: relative;
  left: 180px;
  top: 20px;
}

#container {
  display: flex;
  flex-direction: column;
  float: left;
  justify-content: center;
  min-height: 100vh;
  padding: 1em;
  width: 100%;
}

.row {
  display: table;
}

.column {
  float: left;
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

.headimg {
  width: 100%;
  height: 500px;
  border-radius: 15px;
  opacity: 1;
  display: block;
  transition: 0.5s ease;
  backface-visibility: hidden;
}

.container:hover .image {
  opacity: 0.3;
}

.container:hover .middle {
  opacity: 1;
}

.text {
  background: rgb(252, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(252, 0, 0, 1) 0%,
    rgba(0, 149, 252, 0) 53%,
    rgba(255, 153, 0, 1) 100%
  );
  color: white;
  font-size: 30px;
  padding: 50px 100px;
  border-radius: 20px;
}

.container {
  position: relative;
  width: 100%;
}

.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
</style>


<template>
  <div id="app">
    <!--Modal-->
    <div class="modal" v-bind:class="{ 'is-active': modal }">
      <div class="modal-background"></div>
      <div class="modal-card" style="max-width: 960px; width: 90%">
        <header class="modal-card-head">
          <p class="modal-card-title">Promotion code!</p>
          <button
            @click="modal = !modal"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <div id="wrapper" v-for="promotion in promotions" :key="promotion.id">
            <li>
              {{ promotion.promotion_rate }}% OFF "{{
                promotion.promotion_name
              }}"
            </li>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="modal = !modal">
            Close
          </button>
        </footer>
      </div>
    </div>
    <!--Modal-->
    <div class="body">
      <div class="row">
        <div class="column">
          <div class="top">
            <div class="container">
              <img
                class="headimg"
                src="https://wallpaperaccess.com/full/1884497.jpg"
              />
              <div class="middle">
                <div class="text button" @click="modal = !modal">
                  Today Promotion
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
        <section>
          <div class="column">
            <div class="bottomleft">
              <img
                src="https://www.greenygrass.co.th/file_upload/t_1559791545149996187.jpg"
              />
              <h2>Stadium A</h2>
              <p>
                Our A stadium can try to get a capacity <br />
                of up to fourteen players.
              </p>
              <h2>Facilities</h2>
              <li>Toilet</li>
              <li>Convenience store</li>
              <li>Gear store</li>
              <li>Shower room</li>
            </div>
          </div>
          <div class="column">
            <div class="bottomright">
              <img
                src="https://www.greenygrass.co.th/file_upload/t_1559791545149996187.jpg"
              />
              <h2>Stadium B</h2>
              <p>
                Our B stadium can try to get a capacity <br />
                of up to twentytwo players.
              </p>
              <h2>Facilities</h2>
              <li>Toilet</li>
              <li>Convenience store</li>
              <li>Spa room</li>
              <li>Shower room</li>
            </div>
            <br />
            <br />
            <br />
          </div>
        </section>
      </div>
      <footer class="under">
        <h3>1way © 2021</h3>
      </footer>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: ["user"],
  data() {
    return {
      promotions: [],
      modal: false,
    };
  },
  mounted() {
    this.getBlogs();
  },
  methods: {
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
  },
};
</script>



