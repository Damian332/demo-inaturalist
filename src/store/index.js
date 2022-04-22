import { createStore } from 'vuex'

export default createStore({
  state: {
    observations: [],
    total_results: 0,
  },
  mutations: {
    getObservations(state, payload) {
      state.observations = payload.results;
      state.total_results = payload.total_results;
    }
  },
  actions: {
    async getObservations({ commit }, { page, query }) {
      console.log(query, ' tata');
      try {
        const response = await fetch(
          `https://api.inaturalist.org/v1/observations?${query !== '' ? 'q=' + query + '&' : ''}hrank=genus&lrank=species&place_id=6779&reviewed=true&iconic_taxa=Plantae&page=${page}&per_page=200&order=desc&order_by=created_at`
        );
        const data = await response.json();
        console.log(data);
        commit('getObservations', data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {
  }
})
