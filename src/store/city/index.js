const state = {
  name: window.localStorage.getItem('nowName') || '上海',
  id: window.localStorage.getItem('nowId') || 310100
}

const actions = {

}
const mutations = {
  CITY_INFO(state, payload) {
    state.name = payload.name
    state.id = payload.id
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
