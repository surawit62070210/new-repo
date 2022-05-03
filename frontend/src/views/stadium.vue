<style>
.row {
  display: table;
}

.column {
  float: left;
}

.p1 {
  font-size: 20px;
  text-align: center;
}

h3 {
  font-size: 20px;
  color: white;
}

h1 {
  font-size: 30px;
  text-align: center;
}
.map_text {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 20%,
    rgba(0, 160, 249, 1) 100%
  );
  width: 620px;
  padding: 10px;
  margin: 0;
  border-radius: 25px;
  position: relative;
  left: 150px;
  top: -20px;
}

.body {
  background-image: url("https://wallpaperaccess.com/full/2514318.jpg");
  position: relative;
  top: 10;
  left: 0;
  /* Preserve aspet ratio */
  min-width: 100%;
  min-height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}

.dd {
  padding-top: 60px;
  margin-left: -291px;
  font-size: 30px;
}

.map {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 20%,
    rgba(0, 160, 249, 1) 100%
  );
  width: 620px;
  padding: 10px;
  margin: 0;
  border-radius: 25px;
  position: relative;
  left: 140px;
}

footer {
  text-align: right;
  padding: 3px;
  background-color: black;
}
</style>

<template>
  <div class="body">
    <div id="app">
      <br />
      <br />
      <br />
      <div class="row">
        <div class="column">
          <div class="map">
            <h1>Google Map</h1>
            <p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62010.87861933974!2d100.7306756083157!3d13.737818781175184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6721f8d2d4d9%3A0xcb759f891f077387!2z4Liq4LiZ4Liy4Lih4Lir4LiN4LmJ4Liy4LmA4LiX4Li14Lii4LihIEFsbCBzdGFy!5e0!3m2!1sth!2sth!4v1619683539153!5m2!1sth!2sth"
                width="600"
                height="450"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </p>
          </div>
        </div>
        <div class="column">
          <div class="map_text">
            <h1>ตำแหน่งของสนาม</h1>
            <p class="p1">
              129 65 129/65 ซอย ลาดกระบัง 24 แขวง ลาดกระบัง
              <br />****เขตลาดกระบัง กรุงเทพมหานคร 10520****
            </p>
          </div>
        </div>
        <br />
        <div class="column">
          <div class="map_text">
            <img src="http://www.futsalparkbangkok.com/uploads/43.jpg" />
          </div>
        </div>
      </div>
    </div>
    <footer>
      <h3>1way © 2021</h3>
    </footer>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      Mon: false,
    };
  },
  methods: {
    mon() {},
    axios,
  },
};
</script>

