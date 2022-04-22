<template>
  <div class="home">
    {{ total_results }}
    <input v-model.trim="query" type="search" name="" id="">
    <button @click="dispatchObservations">Pulsar</button>

    <select @change="dispatchObservations" v-model.number="cmbPage" name="" id="">
      <option v-for="i in count" :value="i">{{ i }}</option>

    </select>
    <table>
      <tr>
        <th>Taxon</th>
        <th>Imagen</th>
        <th>Lugar</th>
        <th>Geolocalización</th>
      </tr>
      <tr v-for="item in observations" :key="item.id">
        <td>
          <router-link :to="{
            name: 'Observation',
            params: {
              id: item.id
            }
          }">
            {{ (item.taxon && item.taxon.name) ? item.taxon.name : '' }}
          </router-link>
        </td>
        <td><img height="100" :src="`${item.photos[0] && item.photos[0].url ? item.photos[0].url : '#'}`"
            :alt="item.uri">
        </td>
        <td>
          {{ item.place_guess }}
        </td>
        <td>
          {{ item.location }}
        </td>
      </tr>
    </table>


  </div>
</template>

<script setup>
// @ is an alias to /src

import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const cmbPage = ref(1);
const query = ref('');


store.dispatch('getObservations', { page: cmbPage.value, query: query.value });


const observations = computed(() => store.state.observations);
const total_results = computed(() => store.state.total_results);
const count = computed(() => {
  let total = store.state.total_results / 200;
  let paginas = (total - Math.floor(total) === 0) ? total : Math.floor(total) + 1;
  return paginas > 50 ? 50 : paginas;
});


/**
 * Métodos
 */

const dispatchObservations = () => {
  store.dispatch('getObservations', { page: cmbPage.value, query: query.value });
}


</script>
