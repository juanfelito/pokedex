<template>
  <div class="pokemon-list-item" @click="emitir">
    <div class="pokemon-list-item__sprite">
      <img v-bind:src="urlImagen" alt="">
    </div>
    <div class="pokemon-list-item__name">{{name | iniciaConMayuscula}} #{{id}}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data () {
    return {
        id: null,
        urlImagen: '',
        height: null,
        types: [],
        weight: null,
        speciesUrl: '',
        errors: []
    }
  },
  filters:{
    iniciaConMayuscula: function(valor) {
        return valor.charAt(0).toUpperCase() + valor.slice(1);
    }
  },
  props: ['name', 'url'],
  methods:{
    emitir: function() {
        this.$emit('update:id', this.id);
        this.$emit('showModal');
        this.$emit('update:urlImagen', this.urlImagen);
    }
  },
  created () {
    axios
        .get(this.url)
        .then(response => {
            this.urlImagen = response.data.sprites.front_default;
            this.id = response.data.id;
            this.height = response.data.height;
            this.weight = response.data.weight;
            this.speciesUrl = response.data.species.url;
            this.types = response.data.types;
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
  background: #eee;
  cursor: pointer;
}
</style>
