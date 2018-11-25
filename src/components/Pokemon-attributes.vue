<template>
  <ul class="attributes clearfix">
    <li class="attributes__item"><span class="attributes__item__name">Height:</span> {{height | toFeetAndInches}}</li>
    <li class="attributes__item"><span class="attributes__item__name">Type:</span> {{typesText}}</li>
    <li class="attributes__item"><span class="attributes__item__name">Weight:</span> {{weight | toPounds}}</li>
  </ul>
</template>

<script>
import _ from "lodash";

export default {
  props: ["height", "weight", "types"],
  computed: {
    orderedTypes() {
      return _.orderBy(this.types, "slot", "asc");
    },
    typesText() {
      let text = "";
      const that = this;
      this.orderedTypes.forEach(function(type) {
        text += that.$options.filters.capitalize(type.type.name) + " / ";
      });

      return text.slice(0, -3);
    }
  },
  filters: {
    toFeetAndInches: function(value) {
      const feet = value * 0.328;
      const feetInt = Math.floor(feet);
      const feetDecimal = feet - feetInt;
      const inches = feetDecimal * 12;
      const inchesInt = inches.toFixed(0);

      if (inchesInt.split("").length < 2) {
        return feetInt + "'0" + inchesInt + '"';
      } else {
        return feetInt + "'" + inchesInt + '"';
      }
    },
    toPounds: function(value) {
      const pounds = value * 0.220462;

      return pounds.toFixed(1) + "lbs";
    }
  }
};
</script>

<style lang="scss">
.attributes {
  list-style-type: none;
  margin: 1em 0;
  padding: 0;
  &__item {
    width: 50%;
    text-align: left;
    padding: 0.6em 0.625em;
    float: left;

    &__name {
      color: #f74537;
      font-weight: 500;
      font-size: 1em;
    }
  }
}
</style>
