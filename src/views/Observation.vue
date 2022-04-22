<template>
    <div>
        <h1>Observación</h1>
        <section class="ficha">
            <h2>{{item && item.place_guess?item.place_guess:''}}</h2>
            <ul>
                <li>
                    <strong>Taxon:</strong>
                    {{item && item.taxon?item.taxon.name:''}}
                </li>
                <li>
                    <strong>Localización:</strong>
                    <a target="blank" :href="`https://maps.google.com/?q=${item && item.location?item.location:'#'}`">
                    {{item && item.location?item.location:''}}
                    </a>
                </li>
            </ul>
            <div class="photos" v-if="item && item.photos">
                <img v-for="(item,index) in item.photos" :key="index" :src="item.url" alt="">
            </div>
        </section>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';
const route = useRoute();
const store = useStore();

store.dispatch('getObservation',route.params.id);
const item = computed(()=>store.state.observation);



</script>

<style lang="scss" scoped>

</style>