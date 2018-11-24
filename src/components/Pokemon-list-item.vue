<template>
  <div class="pokemon-list-item" @click="emitir">
    <div class="pokemon-list-item__sprite">
      <img v-bind:src="urlImagen" alt="">
    </div>
    <div class="pokemon-list-item__name">{{name | capitalize}} #{{id}}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: null,
      urlImagen: "",
      height: null,
      types: [],
      weight: null,
      speciesUrl: "",
      stats: null,
      errors: []
    };
  },
  props: ["name", "url"],
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
    }
  },
  created() {
    axios
      .get(this.url)
      .then(response => {
        this.urlImagen = response.data.sprites.front_default;
        this.id = response.data.id;
        this.height = response.data.height;
        this.weight = response.data.weight;
        this.speciesUrl = response.data.species.url;
        this.types = response.data.types;
        this.stats = response.data.stats;
      })
      .catch(e => {
        this.errors.push(e);
      });
  }
};
</script>

<style lang="scss">
.pokemon-list-item {
  padding: 10px;
  width: 150px;
  float: left;
  margin: 2px;
  background: #fff;
  cursor: pointer;
}
</style>
