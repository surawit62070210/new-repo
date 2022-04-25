<style>
table {
  text-align: center;
}

td {
  font-size: 20px;
  padding-left: 175px;
}

th {
  font-size: 25px;
  padding-left: 175px;
}
.day {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 20%,
    rgba(0, 160, 249, 1) 100%
  );
  width: 1200px;
  padding: 10px;
  margin: 0;
  border-radius: 25px;
  position: relative;
  left: 160px;
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

.dd {
  padding-top: 60px;
  margin-left: -291px;
  font-size: 30px;
}

.status {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 20%,
    rgba(0, 160, 249, 1) 100%
  );
  width: 1150px;
  padding: 10px;
  margin: 0;
  border-radius: 25px;
  position: relative;
  left: 180px;
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
</style>

<template>
  <div class="body">
    <div id="app">
      <div>
        <p class="title has-text-centered">Booking</p>
        <div class="has-text-centered mb-3">
          <button
            class="button mr-3"
            @click="std1()"
            :class="{ 'is-danger': st1 }"
          >
            Stadium1</button
          ><button
            class="button ml-3"
            @click="std2()"
            :class="{ 'is-danger': st2 }"
          >
            Stadium2
          </button>
        </div>

        <!-- stadium1 -->
        <div v-if="st1">
          <div class="day">
            <button
              class="button"
              :class="{ 'is-warning': Mon }"
              style="margin-left: 4.8%"
              @click="day('mon')"
            >
              Mon
            </button>
            <button
              class="button"
              :class="{ 'is-danger': Tue, 'is-light': Tue }"
              style="margin-left: 9%"
              @click="day('tue')"
            >
              Tue
            </button>
            <button
              class="button"
              :class="{ 'is-success': Wed }"
              style="margin-left: 9%"
              @click="day('wed')"
            >
              Wed
            </button>
            <button
              class="button"
              :class="{ 'is-danger': Thu }"
              style="margin-left: 9%"
              @click="day('thu')"
            >
              Thu
            </button>
            <button
              class="button"
              :class="{ 'is-info': Fri }"
              style="margin-left: 9%"
              @click="day('fri')"
            >
              Fri
            </button>
            <button
              class="button"
              :class="{ 'is-link': Sat }"
              style="margin-left: 9%"
              @click="day('sat')"
            >
              Sat
            </button>
            <button
              class="button"
              :class="{ 'is-danger': Sun }"
              style="margin-left: 9%"
              @click="day('sun')"
            >
              Sun
            </button>
          </div>
          <br />
          <!-- Monday -->
          <div class="status" v-if="Mon">
            <p class="title has-text-centered mt-4">Monday</p>
            <p class="title has-text-centered mt-4"><b>Day</b></p>
            <table style="width: 85%" class="">
              <tr>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
              <tr v-for="mon in mon_day" :key="mon.id">
                <td>{{ mon.time }}</td>
                <td>{{ mon.price }} THB</td>
                <td>
                  <button
                    v-if="user[0].role == 'admin' && mon.status != 'full'"
                    @click="selects(mon)"
                    disabled
                    class="button is-success mt-1"
                  >
                    {{ mon.status }}
                  </button>
                  <button
                    v-if="user[0].role == 'admin' && mon.status == 'full'"
                    @click="selects(mon)"
                    disabled
                    class="button is-danger mt-1"
                  >
                    {{ mon.status }}
                  </button>

                  <button
                    v-if="
                      mon.status !== 'full' &&
                      select == true &&
                      id == mon.id &&
                      user[0].role != 'admin'
                    "
                    @click="selects(mon)"
                    class="button is-dark mt-1"
                  >
                    selected
                  </button>
                  <button
                    v-else-if="mon.status == 'empty' && user[0].role != 'admin'"
                    @click="selects(mon)"
                    class="button is-success mt-1"
                  >
                    {{ mon.status }}
                  </button>
                  <button
                    v-else-if="mon.status != 'empty' && user[0].role != 'admin'"
                    class="button is-danger mt-1"
                    disabled
                    style="margin-left: 9% width: 100px"
                  >
                    {{ mon.status }}
                  </button>
                </td>
              </tr>
            </table>
          </div>
          <!-- tuesday -->
          <div class="status" v-else-if="Tue">
            <p class="title has-text-centered mt-4">Tuesday</p>
            <p class="title has-text-centered mt-4"><b>Day</b></p>
            <table style="width: 85%" class="">
              <tr>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
              <tr v-for="tue in tue_day" :key="tue.id">
                <td>{{ tue.time }}</td>
                <td>{{ tue.price }} THB</td>
                <td>
                  <button
                    v-if="user[0].role == 'admin' && tue.status != 'full'"
                    @click="selects(tue)"
                    disabled
                    class="button is-success mt-1"
                  >
                    {{ tue.status }}
                  </button>
                  <button
                    v-if="user[0].role == 'admin' && tue.status == 'full'"
                    @click="selects(tue)"
                    disabled
                    class="button is-danger mt-1"
                  >
                    {{ tue.status }}
                  </button>

                  <button
                    v-if="
                      tue.status !== 'full' &&
                      select == true &&
                      id == tue.id &&
                      user[0].role != 'admin'
                    "
                    @click="selects(tue)"
                    class="button is-dark mt-1"
                  >
                    selected
                  </button>
                  <button
                    v-else-if="tue.status == 'empty' && user[0].role != 'admin'"
                    @click="selects(tue)"
                    class="button is-success mt-1"
                  >
                    {{ tue.status }}
                  </button>
                  <button
                    v-else-if="tue.status != 'empty' && user[0].role != 'admin'"
                    class="button is-danger mt-1"
                    disabled
                    style="margin-left: 9% width: 100px"
                  >
                    {{ tue.status }}
                  </button>
                </td>
              </tr>
            </table>
          </div>
          <!-- wednesday -->
          <div class="status" v-else-if="Wed">
            <p class="title has-text-centered mt-4">Wednesday</p>
            <p class="title has-text-centered mt-4"><b>Day</b></p>
            <table style="width: 85%" class="">
              <tr>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
              <tr v-for="wed in wed_day" :key="wed.id">
                <td>{{ wed.time }}</td>
                <td>{{ wed.price }} THB</td>
                <td>
                  <button
                    v-if="user[0].role == 'admin' && wed.status != 'full'"
                    @click="selects(wed)"
                    disabled
                    class="button is-success mt-1"
                  >
                    {{ wed.status }}
                  </button>
                  <button
                    v-if="user[0].role == 'admin' && wed.status == 'full'"
                    @click="selects(wed)"
                    disabled
                    class="button is-danger mt-1"
                  >
                    {{ wed.status }}
                  </button>

                  <button
                    v-if="
                      wed.status !== 'full' &&
                      select == true &&
                      id == wed.id &&
                      user[0].role != 'admin'
                    "
                    @click="selects(wed)"
                    class="button is-dark mt-1"
                  >
                    selected
                  </button>
                  <button
                    v-else-if="wed.status == 'empty' && user[0].role != 'admin'"
                    @click="selects(wed)"
                    class="button is-success mt-1"
                  >
                    {{ wed.status }}
                  </button>
                  <button
                    v-else-if="wed.status != 'empty' && user[0].role != 'admin'"
                    class="button is-danger mt-1"
                    disabled
                    style="margin-left: 9% width: 100px"
                  >
                    {{ wed.status }}
                  </button>
                </td>
              </tr>
              <br />
            </table>
          </div>
          <!-- Thursday -->
          <div class="status" v-else-if="Thu">
            <p class="title has-text-centered mt-4">Thursday</p>
            <p class="title has-text-centered mt-4"><b>Day</b></p>
            <table style="width: 85%" class="">
              <tr>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
              <tr v-for="thu in thu_day" :key="thu.id">
                <td>{{ thu.time }}</td>
                <td>{{ thu.price }} THB</td>
                <td>
                  <button
                    v-if="user[0].role == 'admin' && thu.status != 'full'"
                    @click="selects(thu)"
                    disabled
                    class="button is-success mt-1"
                  >
                    {{ thu.status }}
                  </button>
                  <button
                    v-if="user[0].role == 'admin' && thu.status == 'full'"
                    @click="selects(thu)"
                    disabled
                    class="button is-danger mt-1"
                  >
                    {{ thu.status }}
                  </button>

                  <button
                    v-if="
                      thu.status !== 'full' &&
                      select == true &&
                      id == thu.id &&
                      user[0].role != 'admin'
                    "
                    @click="selects(thu)"
                    class="button is-dark mt-1"
                  >
                    selected
                  </button>
                  <button
                    v-else-if="thu.status == 'empty' && user[0].role != 'admin'"
                    @click="selects(thu)"
                    class="button is-success mt-1"
                  >
                    {{ thu.status }}
                  </button>
                  <button
                    v-else-if="thu.status != 'empty' && user[0].role != 'admin'"
                    class="button is-danger mt-1"
                    disabled
                    style="margin-left: 9% width: 100px"
                  >
                    {{ thu.status }}
                  </button>
                </td>
              </tr>
              <br />
            </table>
          </div>
          <!-- Friday -->
          <div class="status" v-else-if="Fri">
            <p class="title has-text-centered mt-4">Friday</p>
            <p class="title has-text-centered mt-4"><b>Day</b></p>
            <table style="width: 85%" class="">
              <tr>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
              <tr v-for="fri in fri_day" :key="fri.id">
                <td>{{ fri.time }}</td>
                <td>{{ fri.price }} THB</td>
                <td>
                  <button
                    v-if="user[0].role == 'admin' && fri.status != 'full'"
                    @click="selects(fri)"
                    disabled
                    class="button is-success mt-1"
                  >
                    {{ fri.status }}
                  </button>
                  <button
                    v-if="user[0].role == 'admin' && fri.status == 'full'"
                    @click="selects(fri)"
                    disabled
                    class="button is-danger mt-1"
                  >
                    {{ fri.status }}
                  </button>

                  <button
                    v-if="
                      fri.status !== 'full' &&
                      select == true &&
                      id == fri.id &&
                      user[0].role != 'admin'
                    "
                    @click="selects(fri)"
                    class="button is-dark mt-1"
                  >
                    selected
                  </button>
                  <button
                    v-else-if="fri.status == 'empty' && user[0].role != 'admin'"
                    @click="selects(fri)"
                    class="button is-success mt-1"
                  >
                    {{ fri.status }}
                  </button>
                  <button
                    v-else-if="fri.status != 'empty' && user[0].role != 'admin'"
                    class="button is-danger mt-1"
                    disabled
                    style="margin-left: 9% width: 100px"
                  >
                    {{ fri.status }}
                  </button>
                </td>
              </tr>
              <br />
            </table>
          </div>
          <!-- Saturday -->
          <div class="status" v-else-if="Sat">
            <p class="title has-text-centered mt-4">Saturday</p>
            <p class="title has-text-centered mt-4"><b>Day</b></p>
            <table style="width: 85%" class="">
              <tr>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
              <tr v-for="sat in sat_day" :key="sat.id">
                <td>{{ sat.time }}</td>
                <td>{{ sat.price }} THB</td>
                <td>
                  <button
                    v-if="user[0].role == 'admin' && sat.status != 'full'"
                    @click="selects(sat)"
                    disabled
                    class="button is-success mt-1"
                  >
                    {{ sat.status }}
                  </button>
                  <button
                    v-if="user[0].role == 'admin' && sat.status == 'full'"
                    @click="selects(sat)"
                    disabled
                    class="button is-danger mt-1"
                  >
                    {{ sat.status }}
                  </button>

                  <button
                    v-if="
                      sat.status !== 'full' &&
                      select == true &&
                      id == sat.id &&
                      user[0].role != 'admin'
                    "
                    @click="selects(sat)"
                    class="button is-dark mt-1"
                  >
                    selected
                  </button>
                  <button
                    v-else-if="sat.status == 'empty' && user[0].role != 'admin'"
                    @click="selects(sat)"
                    class="button is-success mt-1"
                  >
                    {{ sat.status }}
                  </button>
                  <button
                    v-else-if="sat.status != 'empty' && user[0].role != 'admin'"
                    class="button is-danger mt-1"
                    disabled
                    style="margin-left: 9% width: 100px"
                  >
                    {{ sat.status }}
                  </button>
                </td>
              </tr>
              <br />
            </table>
          </div>
          <!-- Sunday -->
          <div class="status" v-else-if="Sun">
            <p class="title has-text-centered mt-4">Sunday</p>
            <p class="title has-text-centered mt-4"><b>Day</b></p>
            <table style="width: 85%" class="">
              <tr>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
              <tr v-for="sun in sun_day" :key="sun.id">
                <td>{{ sun.time }}</td>
                <td>{{ sun.price }} THB</td>
                <td>
                  <button
                    v-if="user[0].role == 'admin' && sun.status != 'full'"
                    @click="selects(sun)"
                    disabled
                    class="button is-success mt-1"
                  >
                    {{ sun.status }}
                  </button>
                  <button
                    v-if="user[0].role == 'admin' && sun.status == 'full'"
                    @click="selects(sun)"
                    disabled
                    class="button is-danger mt-1"
                  >
                    {{ sun.status }}
                  </button>

                  <button
                    v-if="
                      sun.status !== 'full' &&
                      select == true &&
                      id == sun.id &&
                      user[0].role != 'admin'
                    "
                    @click="selects(sun)"
                    class="button is-dark mt-1"
                  >
                    selected
                  </button>
                  <button
                    v-else-if="sun.status == 'empty' && user[0].role != 'admin'"
                    @click="selects(sun)"
                    class="button is-success mt-1"
                  >
                    {{ sun.status }}
                  </button>
                  <button
                    v-else-if="sun.status != 'empty' && user[0].role != 'admin'"
                    class="button is-danger mt-1"
                    disabled
                    style="margin-left: 9% width: 100px"
                  >
                    {{ sun.status }}
                  </button>
                </td>
              </tr>
              <br />
            </table>
          </div>
          <br />
          <div class="has-text-centered status" v-if="user[0].role != 'admin'">
            <button
              @click="submit()"
              class="button is-success mt-1 mr-1"
              style="margin-left: 9% width: 100px"
            >
              Confirm
            </button>
            <button
              @click="cancel()"
              class="button is-danger mt-1 ml-1"
              style="margin-left: 9% width: 100px"
            >
              Cancel
            </button>
          </div>
        </div>

        <!-- stadium2 -->
        <div v-if="st2">
          <div class="day">
            <button
              class="button"
              :class="{ 'is-warning': Mon2 }"
              style="margin-left: 4.8%"
              @click="day2('mon')"
            >
              Mon
            </button>
            <button
              class="button"
              :class="{ 'is-danger': Tue2, 'is-light': Tue2 }"
              style="margin-left: 9%"
              @click="day2('tue')"
            >
              Tue
            </button>
            <button
              class="button"
              :class="{ 'is-success': Wed2 }"
              style="margin-left: 9%"
              @click="day2('wed')"
            >
              Wed
            </button>
            <button
              class="button"
              :class="{ 'is-danger': Thu2 }"
              style="margin-left: 9%"
              @click="day2('thu')"
            >
              Thu
            </button>
            <button
              class="button"
              :class="{ 'is-info': Fri2 }"
              style="margin-left: 9%"
              @click="day2('fri')"
            >
              Fri
            </button>
            <button
              class="button"
              :class="{ 'is-link': Sat2 }"
              style="margin-left: 9%"
              @click="day2('sat')"
            >
              Sat
            </button>
            <button
              class="button"
              :class="{ 'is-danger': Sun2 }"
              style="margin-left: 9%"
              @click="day2('sun')"
            >
              Sun
            </button>
          </div>
          <br />
          <!-- Monday -->
          <div class="status" v-if="Mon2">
            <p class="title has-text-centered mt-4">Monday</p>
            <p class="title has-text-centered mt-4"><b>Day</b></p>
            <table style="width: 85%" class="">
              <tr>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
              <tr v-for="mon in mon_day2" :key="mon.id">
                <td>{{ mon.time }}</td>
                <td>{{ mon.price }} THB</td>
                <td>
                  <button
                    v-if="user[0].role == 'admin' && mon.status != 'full'"
                    @click="selects2(mon)"
                    disabled
                    class="button is-success mt-1"
                  >
                    {{ mon.status }}
                  </button>
                  <button
                    v-if="user[0].role == 'admin' && mon.status == 'full'"
                    @click="selects2(mon)"
                    disabled
                    class="button is-danger mt-1"
                  >
                    {{ mon.status }}
                  </button>

                  <button
                    v-if="
                      mon.status !== 'full' &&
                      select2 == true &&
                      id2 == mon.id &&
                      user[0].role != 'admin'
                    "
                    @click="selects2(mon)"
                    class="button is-dark mt-1"
                  >
                    selected
                  </button>
                  <button
                    v-else-if="mon.status == 'empty' && user[0].role != 'admin'"
                    @click="selects2(mon)"
                    class="button is-success mt-1"
                  >
                    {{ mon.status }}
                  </button>
                  <button
                    v-else-if="mon.status != 'empty' && user[0].role != 'admin'"
                    class="button is-danger mt-1"
                    disabled
                    style="margin-left: 9% width: 100px"
                  >
                    {{ mon.status }}
                  </button>
                </td>
              </tr>
            </table>
          </div>
          <!-- tuesday -->
          <div class="status" v-else-if="Tue2">
            <p class="title has-text-centered mt-4">Tuesday</p>
            <p class="title has-text-centered mt-4"><b>Day</b></p>
            <table style="width: 85%" class="">
              <tr>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
              <tr v-for="tue in tue_day2" :key="tue.id">
                <td>{{ tue.time }}</td>
                <td>{{ tue.price }} THB</td>
                <td>
                  <button
                    v-if="user[0].role == 'admin' && tue.status != 'full'"
                    @click="selects2(tue)"
                    disabled
                    class="button is-success mt-1"
                  >
                    {{ tue.status }}
                  </button>
                  <button
                    v-if="user[0].role == 'admin' && tue.status == 'full'"
                    @click="selects2(tue)"
                    disabled
                    class="button is-danger mt-1"
                  >
                    {{ tue.status }}
                  </button>

                  <button
                    v-if="
                      tue.status !== 'full' &&
                      select2 == true &&
                      id2 == tue.id &&
                      user[0].role != 'admin'
                    "
                    @click="selects2(tue)"
                    class="button is-dark mt-1"
                  >
                    selected
                  </button>
                  <button
                    v-else-if="tue.status == 'empty' && user[0].role != 'admin'"
                    @click="selects2(tue)"
                    class="button is-success mt-1"
                  >
                    {{ tue.status }}
                  </button>
                  <button
                    v-else-if="tue.status != 'empty' && user[0].role != 'admin'"
                    class="button is-danger mt-1"
                    disabled
                    style="margin-left: 9% width: 100px"
                  >
                    {{ tue.status }}
                  </button>
                </td>
              </tr>
            </table>
          </div>
          <!-- wednesday -->
          <div class="status" v-else-if="Wed2">
            <p class="title has-text-centered mt-4">Wednesday</p>
            <p class="title has-text-centered mt-4"><b>Day</b></p>
            <table style="width: 85%" class="">
              <tr>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
              <tr v-for="wed in wed_day" :key="wed.id">
                <td>{{ wed.time }}</td>
                <td>{{ wed.price }} THB</td>
                <td>
                  <button
                    v-if="user[0].role == 'admin' && wed.status != 'full'"
                    @click="selects2(wed)"
                    disabled
                    class="button is-success mt-1"
                  >
                    {{ wed.status }}
                  </button>
                  <button
                    v-if="user[0].role == 'admin' && wed.status == 'full'"
                    @click="selects2(wed)"
                    disabled
                    class="button is-danger mt-1"
                  >
                    {{ wed.status }}
                  </button>

                  <button
                    v-if="
                      wed.status !== 'full' &&
                      select2 == true &&
                      id2 == wed.id &&
                      user[0].role != 'admin'
                    "
                    @click="selects2(wed)"
                    class="button is-dark mt-1"
                  >
                    selected
                  </button>
                  <button
                    v-else-if="wed.status == 'empty' && user[0].role != 'admin'"
                    @click="selects2(wed)"
                    class="button is-success mt-1"
                  >
                    {{ wed.status }}
                  </button>
                  <button
                    v-else-if="wed.status != 'empty' && user[0].role != 'admin'"
                    class="button is-danger mt-1"
                    disabled
                    style="margin-left: 9% width: 100px"
                  >
                    {{ wed.status }}
                  </button>
                </td>
              </tr>
              <br />
            </table>
          </div>
          <!-- Thursday -->
          <div class="status" v-else-if="Thu2">
            <p class="title has-text-centered mt-4">Thursday</p>
            <p class="title has-text-centered mt-4"><b>Day</b></p>
            <table style="width: 85%" class="">
              <tr>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
              <tr v-for="thu in thu_day2" :key="thu.id">
                <td>{{ thu.time }}</td>
                <td>{{ thu.price }} THB</td>
                <td>
                  <button
                    v-if="user[0].role == 'admin' && thu.status != 'full'"
                    @click="selects2(thu)"
                    disabled
                    class="button is-success mt-1"
                  >
                    {{ thu.status }}
                  </button>
                  <button
                    v-if="user[0].role == 'admin' && thu.status == 'full'"
                    @click="selects2(thu)"
                    disabled
                    class="button is-danger mt-1"
                  >
                    {{ thu.status }}
                  </button>

                  <button
                    v-if="
                      thu.status !== 'full' &&
                      select2 == true &&
                      id2 == thu.id &&
                      user[0].role != 'admin'
                    "
                    @click="selects2(thu)"
                    class="button is-dark mt-1"
                  >
                    selected
                  </button>
                  <button
                    v-else-if="thu.status == 'empty' && user[0].role != 'admin'"
                    @click="selects2(thu)"
                    class="button is-success mt-1"
                  >
                    {{ thu.status }}
                  </button>
                  <button
                    v-else-if="thu.status != 'empty' && user[0].role != 'admin'"
                    class="button is-danger mt-1"
                    disabled
                    style="margin-left: 9% width: 100px"
                  >
                    {{ thu.status }}
                  </button>
                </td>
              </tr>
              <br />
            </table>
          </div>
          <!-- Friday -->
          <div class="status" v-else-if="Fri2">
            <p class="title has-text-centered mt-4">Friday</p>
            <p class="title has-text-centered mt-4"><b>Day</b></p>
            <table style="width: 85%" class="">
              <tr>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
              <tr v-for="fri in fri_day2" :key="fri.id">
                <td>{{ fri.time }}</td>
                <td>{{ fri.price }} THB</td>
                <td>
                  <button
                    v-if="user[0].role == 'admin' && fri.status != 'full'"
                    @click="selects2(fri)"
                    disabled
                    class="button is-success mt-1"
                  >
                    {{ fri.status }}
                  </button>
                  <button
                    v-if="user[0].role == 'admin' && fri.status == 'full'"
                    @click="selects2(fri)"
                    disabled
                    class="button is-danger mt-1"
                  >
                    {{ fri.status }}
                  </button>

                  <button
                    v-if="
                      fri.status !== 'full' &&
                      select2 == true &&
                      id2 == fri.id &&
                      user[0].role != 'admin'
                    "
                    @click="selects2(fri)"
                    class="button is-dark mt-1"
                  >
                    selected
                  </button>
                  <button
                    v-else-if="fri.status == 'empty' && user[0].role != 'admin'"
                    @click="selects2(fri)"
                    class="button is-success mt-1"
                  >
                    {{ fri.status }}
                  </button>
                  <button
                    v-else-if="fri.status != 'empty' && user[0].role != 'admin'"
                    class="button is-danger mt-1"
                    disabled
                    style="margin-left: 9% width: 100px"
                  >
                    {{ fri.status }}
                  </button>
                </td>
              </tr>
              <br />
            </table>
          </div>
          <!-- Saturday -->
          <div class="status" v-else-if="Sat2">
            <p class="title has-text-centered mt-4">Saturday</p>
            <p class="title has-text-centered mt-4"><b>Day</b></p>
            <table style="width: 85%" class="">
              <tr>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
              <tr v-for="sat in sat_day2" :key="sat.id">
                <td>{{ sat.time }}</td>
                <td>{{ sat.price }} THB</td>
                <td>
                  <button
                    v-if="user[0].role == 'admin' && sat.status != 'full'"
                    @click="selects2(sat)"
                    disabled
                    class="button is-success mt-1"
                  >
                    {{ sat.status }}
                  </button>
                  <button
                    v-if="user[0].role == 'admin' && sat.status == 'full'"
                    @click="selects2(sat)"
                    disabled
                    class="button is-danger mt-1"
                  >
                    {{ sat.status }}
                  </button>

                  <button
                    v-if="
                      sat.status !== 'full' &&
                      select2 == true &&
                      id2 == sat.id &&
                      user[0].role != 'admin'
                    "
                    @click="selects2(sat)"
                    class="button is-dark mt-1"
                  >
                    selected
                  </button>
                  <button
                    v-else-if="sat.status == 'empty' && user[0].role != 'admin'"
                    @click="selects2(sat)"
                    class="button is-success mt-1"
                  >
                    {{ sat.status }}
                  </button>
                  <button
                    v-else-if="sat.status != 'empty' && user[0].role != 'admin'"
                    class="button is-danger mt-1"
                    disabled
                    style="margin-left: 9% width: 100px"
                  >
                    {{ sat.status }}
                  </button>
                </td>
              </tr>
            </table>
          </div>
          <!-- Sunday -->
          <div class="status" v-else-if="Sun2">
            <p class="title has-text-centered mt-4">Sunday</p>
            <p class="title has-text-centered mt-4"><b>Day</b></p>
            <table style="width: 85%" class="">
              <tr>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
              <tr v-for="sun in sun_day2" :key="sun.id">
                <td>{{ sun.time }}</td>
                <td>{{ sun.price }} THB</td>
                <td>
                  <button
                    v-if="user[0].role == 'admin' && sun.status != 'full'"
                    @click="selects2(sun)"
                    disabled
                    class="button is-success mt-1"
                  >
                    {{ sun.status }}
                  </button>
                  <button
                    v-if="user[0].role == 'admin' && sun.status == 'full'"
                    @click="selects2(sun)"
                    disabled
                    class="button is-danger mt-1"
                  >
                    {{ sun.status }}
                  </button>

                  <button
                    v-if="
                      sun.status !== 'full' &&
                      select2 == true &&
                      id2 == sun.id &&
                      user[0].role != 'admin'
                    "
                    @click="selects2(sun)"
                    class="button is-dark mt-1"
                  >
                    selected
                  </button>
                  <button
                    v-else-if="sun.status == 'empty' && user[0].role != 'admin'"
                    @click="selects2(sun)"
                    class="button is-success mt-1"
                  >
                    {{ sun.status }}
                  </button>
                  <button
                    v-else-if="sun.status != 'empty' && user[0].role != 'admin'"
                    class="button is-danger mt-1"
                    disabled
                    style="margin-left: 9% width: 100px"
                  >
                    {{ sun.status }}
                  </button>
                </td>
              </tr>
              <br />
            </table>
          </div>

          <div
            class="has-text-centered status pt-2"
            v-if="user[0].role != 'admin'"
          >
            <button
              @click="submit2()"
              class="button is-success mt-1 mr-1"
              style="margin-left: 9% width: 100px"
            >
              Confirm
            </button>
            <button
              @click="cancel2()"
              class="button is-danger mt-1 ml-1"
              style="margin-left: 9% width: 100px"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <br />
    </div>

    <footer class="under"><h3>1way © 2021</h3></footer>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: ["user"],
  data() {
    return {
      //checkrole
      admin: false,
      //stadium1
      Mon: true,
      mon_day: [],
      Tue: false,
      tue_day: [],
      Wed: false,
      wed_day: [],
      Thu: false,
      thu_day: [],
      Fri: false,
      fri_day: [],
      Sat: false,
      sat_day: [],
      Sun: false,
      sun_day: [],
      //stadium2
      Mon2: true,
      mon_day2: [],
      Tue2: false,
      tue_day2: [],
      Wed2: false,
      wed_day2: [],
      Thu2: false,
      thu_day2: [],
      Fri2: false,
      fri_day2: [],
      Sat2: false,
      sat_day2: [],
      Sun2: false,
      sun_day2: [],
      //selectStadium1
      select: false,
      id: "",
      days: "",
      times: "",
      stname: "Stadium1",
      //selectStadium2
      select2: false,
      id2: "",
      days2: "",
      times2: "",
      st2name: "Stadium2",
      //stadium
      stadium1: [],
      stadium2: [],
      st1: true,
      st2: false,
    };
  },
  mounted() {
    this.checkAdmin();
    this.Alldays();
  },
  methods: {
    checkAdmin() {
      const role = this.user[0].role;
      if (role == "admin") {
        this.admin = true;
      }
    },

    //stadium1
    std1() {
      this.st1 = true;
      this.st2 = false;
    },
    selects(day) {
      this.select = !this.select;
      this.id = day.id;
      const selectdays = this.stadium1.filter((res) => res.id == day.id);
      this.days = selectdays[0].day;
      this.times = day.time;
    },
    cancel() {
      this.select = false;
      this.id = "";
      this.days = "";
      this.times = "";
    },
    submit() {
      if (this.select == false) {
        alert('Please Booking before "CONFIRM"!!!!');
      } else {
        const Data = {
          id: this.id,
          status: "full",
          username: this.user[0].username,
        };
        const result = confirm(
          `Are you sure you want to Booking \'${this.stname}\' Day \'${this.days}\' and Time \'${this.times}\'`
        );
        if (result) {
          axios
            .put("http://localhost:3000/update/stadiumStatus", Data)
            .then((res) => {
              console.log(res);
              this.id = "";
              this.days = "";
              this.times = "";
            })
            .catch((e) => console.log(e));
        }
      }
    },
    day(Day) {
      if (Day == "mon") {
        this.Mon = true;
        this.Tue = false;
        this.Wed = false;
        this.Thu = false;
        this.Fri = false;
        this.Sat = false;
        this.Sun = false;
      } else if (Day == "tue") {
        this.Mon = false;
        this.Tue = true;
        this.Wed = false;
        this.Thu = false;
        this.Fri = false;
        this.Sat = false;
        this.Sun = false;
      } else if (Day == "wed") {
        this.Mon = false;
        this.Tue = false;
        this.Wed = true;
        this.Thu = false;
        this.Fri = false;
        this.Sat = false;
        this.Sun = false;
      } else if (Day == "thu") {
        this.Mon = false;
        this.Tue = false;
        this.Wed = false;
        this.Thu = true;
        this.Fri = false;
        this.Sat = false;
        this.Sun = false;
      } else if (Day == "fri") {
        this.Mon = false;
        this.Tue = false;
        this.Wed = false;
        this.Thu = false;
        this.Fri = true;
        this.Sat = false;
        this.Sun = false;
      } else if (Day == "sat") {
        this.Mon = false;
        this.Tue = false;
        this.Wed = false;
        this.Thu = false;
        this.Fri = false;
        this.Sat = true;
        this.Sun = false;
      } else if (Day == "sun") {
        this.Mon = false;
        this.Tue = false;
        this.Wed = false;
        this.Thu = false;
        this.Fri = false;
        this.Sat = false;
        this.Sun = true;
      } else {
        this.Mon = false;
        this.Tue = false;
        this.Wed = false;
        this.Thu = false;
        this.Fri = false;
        this.Sat = false;
        this.Sun = false;
      }
    },

    //stadium2
    std2() {
      this.st2 = true;
      this.st1 = false;
    },
    selects2(day) {
      this.select2 = !this.select2;
      console.log({ select2: this.select2 });
      this.id2 = day.id;
      const selectdays2 = this.stadium2.filter((res) => res.id == day.id);
      this.days2 = selectdays2[0].day;
      this.times2 = day.time;
    },
    cancel2() {
      this.select2 = false;
      this.id2 = "";
      this.days2 = "";
      this.times2 = "";
    },
    submit2() {
      console.log({ subselect: this.select2 });
      if (this.select2 == false) {
        alert('Please Booking before "CONFIRM"!!!!');
      } else {
        const Data = {
          id: this.id2,
          status: "full",
          username: this.user[0].username,
        };
        const result = confirm(
          `Are you sure you want to Booking \'${this.st2name}\' Day \'${this.days2}\' and Time \'${this.times2}\'`
        );
        if (result) {
          axios
            .put("http://localhost:3000/update/stadium2Status", Data)
            .then((res) => {
              console.log(res);
              this.id2 = "";
              this.days2 = "";
              this.times2 = "";
            })
            .catch((e) => console.log(e));
        }
      }
    },
    day2(Day) {
      if (Day == "mon") {
        this.Mon2 = true;
        this.Tue2 = false;
        this.Wed2 = false;
        this.Thu2 = false;
        this.Fri2 = false;
        this.Sat2 = false;
        this.Sun2 = false;
      } else if (Day == "tue") {
        this.Mon2 = false;
        this.Tue2 = true;
        this.Wed2 = false;
        this.Thu2 = false;
        this.Fri2 = false;
        this.Sat2 = false;
        this.Sun2 = false;
      } else if (Day == "wed") {
        this.Mon2 = false;
        this.Tue2 = false;
        this.Wed2 = true;
        this.Thu2 = false;
        this.Fri2 = false;
        this.Sat2 = false;
        this.Sun2 = false;
      } else if (Day == "thu") {
        this.Mon2 = false;
        this.Tue2 = false;
        this.Wed2 = false;
        this.Thu2 = true;
        this.Fri2 = false;
        this.Sat2 = false;
        this.Sun2 = false;
      } else if (Day == "fri") {
        this.Mon2 = false;
        this.Tue2 = false;
        this.Wed2 = false;
        this.Thu2 = false;
        this.Fri2 = true;
        this.Sat2 = false;
        this.Sun2 = false;
      } else if (Day == "sat") {
        this.Mon2 = false;
        this.Tue2 = false;
        this.Wed2 = false;
        this.Thu2 = false;
        this.Fri2 = false;
        this.Sat2 = true;
        this.Sun2 = false;
      } else if (Day == "sun") {
        this.Mon2 = false;
        this.Tue2 = false;
        this.Wed2 = false;
        this.Thu2 = false;
        this.Fri2 = false;
        this.Sat2 = false;
        this.Sun2 = true;
      } else {
        this.Mon2 = false;
        this.Tue2 = false;
        this.Wed2 = false;
        this.Thu2 = false;
        this.Fri2 = false;
        this.Sat2 = false;
        this.Sun2 = false;
      }
    },

    Alldays() {
      axios
        .get("http://localhost:3000/")
        .then((response) => {
          this.stadium1 = response.data.stadium1;
          console.log({ stadium1: this.stadium1 });
          this.mon_day = this.stadium1.filter((res) => res.day == "mon");
          this.tue_day = this.stadium1.filter((res) => res.day == "tue");
          this.wed_day = this.stadium1.filter((res) => res.day == "wed");
          this.thu_day = this.stadium1.filter((res) => res.day == "thu");
          this.fri_day = this.stadium1.filter((res) => res.day == "fri");
          this.sat_day = this.stadium1.filter((res) => res.day == "sat");
          this.sun_day = this.stadium1.filter((res) => res.day == "sun");

          this.stadium2 = response.data.stadium2;
          console.log({ stadium2: this.stadium2 });
          this.mon_day2 = this.stadium2.filter((res) => res.day == "mon");
          this.tue_day2 = this.stadium2.filter((res) => res.day == "tue");
          this.wed_day2 = this.stadium2.filter((res) => res.day == "wed");
          this.thu_day2 = this.stadium2.filter((res) => res.day == "thu");
          this.fri_day2 = this.stadium2.filter((res) => res.day == "fri");
          this.sat_day2 = this.stadium2.filter((res) => res.day == "sat");
          this.sun_day2 = this.stadium2.filter((res) => res.day == "sun");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>