export default {
  state: {
    previewStories: [],
    stories: []
  },
  mutations: {
    setPreviewStories(state, previewStories) {
      state.previewStories = previewStories
    },
    clearPreviewStories(state) {
      state.previewStories = []
    },
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
        const objStories = await (await fetch(`http://observer.dpl.wb.ru:8081/short-diffs?name=${name}&group=${group}`)).json()
        const stories = objStories.shortDiffSnapshots || []
        commit('setPreviewStories', stories)
        return stories
      } catch(e) {
        commit('setError', e)
        commit('clearPreviewStories')
        throw e
      }
    },
    async fetchStories({commit}, {name, group}) {
      try {
        const objStories = await (await fetch(`http://observer.dpl.wb.ru:8081/diffs?name=${name}&group=${group}`)).json()
        const stories = objStories.diffSnapshots || []
        commit('setStories', stories)
        return stories
      } catch(e) {
        commit('setError', e)
        commit('clearStories')
        throw e
      }
    },
    
  },
  getters: {
    stories(state) {
      return state.stories
    }
  }
}
