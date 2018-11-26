<template>
  <div class="pokemon-list-item" @click="emitir" v-observe-visibility="visibilityChanged">
    <div class="pokemon-list-item__sprite">
      <img v-bind:src="urlImagen" alt="">
    </div>
    <div v-if="name != undefined" class="pokemon-list-item__name clearfix">{{name | capitalize}} <span class="pokemon-list-item__number">#{{id}}</span></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      urlImagen: "",
      height: null,
      types: [],
      weight: null,
      speciesUrl: "",
      stats: null,
      isVisible: false,
      errors: []
    };
  },
  computed: {
    id() {
      const urlArr = this.url.split("/");
      return urlArr[urlArr.length - 2];
    }
  },
  props: ["name", "url"],
  updated() {
    this.getInfo();
  },
  methods: {
    emitir: function() {
      const pokemon = {
        id: this.id,
        urlImagen: this.urlImagen,
        height: this.height,
        weight: this.weight,
        types: this.types,
        stats: this.stats,
        speciesUrl: this.speciesUrl
      };
      this.$emit("update:pokemon", pokemon);
      this.$emit("showModal");
    },
    getInfo() {
      axios
        .get(this.url)
        .then(response => {
          this.urlImagen = response.data.sprites.front_default;
          this.height = response.data.height;
          this.weight = response.data.weight;
          this.speciesUrl = response.data.species.url;
          this.types = response.data.types;
          this.stats = response.data.stats;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    visibilityChanged(isVisible, entry) {
      this.isVisible = isVisible;
      if (this.isVisible && this.height === null) {
        this.getInfo();
      }
    }
  }
};
</script>

<style lang="scss">
.pokemon-list-item {
  padding: 10px;
  width: 47%;
  float: left;
  margin: 1.5%;
  background: #fff;
  cursor: pointer;
  &__sprite {
    margin: 0;
    padding: 0;
    height: 96px;
  }
  &__name {
    text-align: left;
    font-size: 0.9em;
  }

  &__number {
    float: right;
  }
}
@media only screen and (min-width: 632px) {
  .pokemon-list-item {
    width: 23%;
    margin: 1%;
  }
}
@media only screen and (min-width: 800px) {
  .pokemon-list-item {
    width: 18%;
    margin: 0.8%;
  }
}
@media only screen and (min-width: 945px) {
  .pokemon-list-item {
    width: 15%;
    margin: 0.8%;
  }
}
@media only screen and (min-width: 1200px) {
  .pokemon-list-item {
    width: 11.5%;
    margin: 0.5%;
  }
}
</style>
