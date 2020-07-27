export default {
  state: {
    stories: []
  },
  mutations: {
    setStories(state, stories) {
      state.stories = stories
    },
    clearStories(state) {
      state.stories = []
    }
  },
  actions: {
    async fetchPreviewStories({commit}, {name, group}) {
      try {
        const objStories = await (await fetch(`http://observer.dpl.wb.ru:8081/stories?name=${name}&group=${group}`)).json()
        const stories = objStories.stories || []
        commit('setStories', stories)
        return stories
      } catch(e) {
        commit('setError', e)
        commit('clearStories')
        throw e
      }
    },
    async fetchStory({commit}, {name, group, storyName}) {
      try {
        return await (await fetch(`http://observer.dpl.wb.ru:8081/stories?name=${name}&group=${group}&story=${storyName}`)).json() || {}
      } catch(e){
        commit('setError', e)
        throw e
      }
    },
    async fetchStoryForModal({commit}) {
      try {

      } catch(e){}
    }
  },
  getters: {
    stories(state) {
      return state.stories
    }
  }
}
