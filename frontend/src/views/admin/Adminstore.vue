<template>
  <div id="app">
    <div class="modal" v-bind:class="{ 'is-active': show_modal }">
      <div class="modal-background"></div>
      <div class="modal-card" style="max-width: 960px; width: 90%">
        <header class="modal-card-head">
          <p class="modal-card-title">เพิ่มสินค้า</p>
          <button
            @click="show_modal = !show_modal"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <b>รูปสินค้า </b>
          <input
            class="mb-5"
            multiple
            type="file"
            accept="image/png, image/jpeg, image/webp"
            @change="selectImages"
          />

          <div v-if="images" class="columns is-multiline">
            <div
              v-for="(image, index) in images"
              :key="image.id"
              class="column is-one-quarter"
            >
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img
                      :src="showSelectImage(image)"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <footer class="card-footer">
                  <a
                    @click="deleteSelectImage(index)"
                    class="card-footer-item has-text-danger"
                    >Delete</a
                  >
                </footer>
              </div>
            </div>
          </div>
          <div>
            <b>ชื่อสินค้า </b>
            <input
              class="input"
              type="text"
              placeholder="Brand"
              v-model="$v.brand.$model"
              :class="{ 'is-danger': $v.brand.$error }"
            />
          </div>
          <template v-if="$v.brand.$error">
            <p class="help is-danger" v-if="!$v.brand.required">
              This field is required
            </p>
          </template>

          <b>ประเภทสินค้า </b>
          <input
            class="input"
            type="text"
            placeholder="Type"
            v-model="$v.type.$model"
            :class="{ 'is-danger': $v.type.$error }"
          />

          <template v-if="$v.type.$error">
            <p class="help is-danger" v-if="!$v.type.required">
              This field is required
            </p>
          </template>
          <b>ราคา </b>
          <input
            class="input"
            type="text"
            placeholder="Price"
            v-model="$v.price.$model"
            :class="{ 'is-danger': $v.price.$error }"
          />
          <template v-if="$v.price.$error">
            <p class="help is-danger" v-if="!$v.price.required">
              This field is required
            </p>
            <p class="help is-danger" v-if="!$v.price.integer">
              Price must be number and less than 1000000!!
            </p>
          </template>
          <b>จำนวนสินค้า </b>
          <input
            class="input"
            type="text"
            v-model="$v.quantity.$model"
            :class="{ 'is-danger': $v.quantity.$error }"
          />
          <template v-if="$v.quantity.$error">
            <p class="help is-danger" v-if="!$v.quantity.required">
              This field is required
            </p>
            <p class="help is-danger" v-if="!$v.quantity.integer">
              Quantity must be number and less than 1000000!!
            </p>
          </template>
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
    <div class="modal" v-bind:class="{ 'is-active': show_modal2 }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button
            class="delete"
            aria-label="close"
            @click="show_modal2 = !show_modal2"
          ></button>
        </header>
        <section class="modal-card-body">
          <b>price</b>
          <input class="input" v-model="editPrice" />
          <b>quantity</b>
          <input class="input" v-model="editQuantity" />
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="updatePro">
            Save changes
          </button>
          <button class="button" @click="show_modal2 = !show_modal2">
            Cancel
          </button>
        </footer>
      </div>
    </div>
    <div class="columns" style="margin-left: 8%">
      <!-- Column แสดงสินค้า--------------------------------------------------------->
      <div class="column is-8 pt-6">
        <h1 class="is-size-4 mb-4">สินค้าทั้งหมด ({{ products.length }})</h1>
        <div class="container is-max-desktop">
          <div class="is-multiline columns is-variable is-2">
            <!-- Card element start here------------------------------------------>
            <div
              id="card_product"
              class="column is-one-quarter"
              v-for="product in products"
              :key="product.id"
            >
              <div class="card">
                <div class="card-image">
                  <figure class="image is-1by1">
                    <img
                      :src="imagePath(product.url)"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">{{ product.name }}</p>
                      <p class="subtitle is-6">{{ product.type }}</p>
                      <p class="subtitle is-6 has-text-danger">
                        {{ product.price }} ฿
                      </p>
                    </div>
                  </div>
                </div>
                <footer class="card-footer">
                  <a @click="edit(product)" class="card-footer-item">Edit</a>
                  <a @click="deleteProduct(product)" class="card-footer-item"
                    >Delete</a
                  >
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-3 pt-6 pl-6 pr-5">
        <button
          class="button is-danger is-focused is-rounded"
          @click="show_modal = !show_modal"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {
  required,
  minLength,
  integer,
  between,
  maxLength,
} from "vuelidate/lib/validators";

function mobile(value) {
  return !!value.match(/0[0-9]{9}/);
}
export default {
  data() {
    return {
      error: null,
      products: [],
      show_modal: false,
      show_modal2: false,

      //add menu
      images: [],
      type: "",
      brand: "",
      price: 0,
      quantity: 0,

      //edit
      product: "",
      id: "",
      editPrice: 0,
      editQuantity: 0,
    };
  },
  validations: {
    brand: {
      required: required,
    },
    price: {
      required: required,
      integer: between(0, 1000000),
    },
    type: {
      required: required,
    },
    quantity: {
      required: required,
      integer: between(0, 1000000),
    },
  },
  mounted() {
    this.getBlogs();
  },
  methods: {
    edit(products) {
      this.show_modal2 = true;
      this.product = products;
      this.editPrice = this.product.price;
      this.editQuantity = this.product.quantity;
      console.log({ first: this.product });
    },
    updatePro() {
      this.id = this.product.id;
      const Data = {
        id: this.id,
        price: this.editPrice,
        quantity: this.editQuantity,
      };
      console.log({ second: Data });
      axios
        .put("http://localhost:3000/update/product", Data)
        .then((res) => {
          console.log(res);
          this.editPrice = "";
          this.id = "";
          this.editQuantity = "";
          this.show_modal2 = false;
        })
        .catch((e) => console.log(e));
    },
    getBlogs() {
      axios
        .get("http://localhost:3000")
        .then((response) => {
          this.products = response.data.store;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    selectImages(event) {
      this.images = event.target.files;
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    },
    deleteSelectImage(index) {
      console.log(this.images);
      this.images = Array.from(this.images);
      this.images.splice(index, 1);
    },
    deleteProduct(product) {
      const result = confirm(
        `Are you sure you want to delete \'${product.name}\'`
      );
      if (result) {
        axios
          .delete(`http://localhost:3000/product/${product.id}`)
          .then(() => {
            this.products = this.products.filter((p) => p.id != product.id);
            console.log("Success");
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    },
    addItem() {
      let formData = new FormData();
      formData.append("type", this.type);
      formData.append("brand", this.brand);
      formData.append("price", this.price);
      formData.append("quantity", this.quantity);
      this.images.forEach((image) => {
        formData.append("productImage", image);
      });
      axios
        .post(`http://localhost:3000/store`, formData)
        .then((response) => {
          this.type = "";
          this.brand = "";
          this.price = 0;
          this.images = [];
          this.quantity = 0;
          this.show_modal = false;
          console.log(response.data);
          this.products.push(response.data);
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
  },
};
</script>