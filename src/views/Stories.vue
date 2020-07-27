<template>
  <div class="row">
    <HeaderTitle v-bind:header-title="this.$route.params.report" />

<!-- @click.prevent="clickHandler(story.name, index) -->
    <div class="list-wrapper">
      <figure v-for="(story) in this.stories" 
        :key="story.name" 
        data-target="modal1" 
        class="card hoverable modal-trigger"
        @click="clickHandler"
      >
        <div class="card-image waves-effect">
          <img :src="story.image">
        </div>
        <figcaption class="card-content truncate">
          {{story.name}}
        </figcaption>
      </figure>

<!-- @updated="storyUpdate" -->
      <StoryModal
        v-if="openedModal"
       :storyData="currentStory"
       :isOpen="openedModal"
     />
    </div>
  </div>
</template>

<script>
import HeaderTitle from '@/components/app/HeaderTitle'
import StoryModal from '@/components/app/StoryModal'

export default {
  data: ()=>({
    stories: [],
    currentStory: null,
    name: '',
    group: '',
    openedModal: false,
    updateCount: 0,
    currentStories: []
  }),
  async created() {
    this.name = this.$route.params.report
    this.group = this.$route.params.name

    const data = {
      name: this.name,
      group: this.group
    }

    try {
      if (this.$store.getters.stories) {
        this.stories = await this.$store.dispatch('fetchPreviewStories', data)
      }
    } catch(e){}
    
  },

  mounted() {

  },
  methods: {

    async clickHandler() {
      this.openedModal = true
    //  this.storiesData = await this.$store.dispatch('fetchStoryForModal')
    },
    // async clickHandler(storyName, curIndex) {
    //   this.openedModal = true
    //   const curIndexInput = curIndex

    //   try {
    //     for (let i = 0; i < 2; i++) {
    //       curIndex += i
    //       this.currentStories.push({...await this.$store.dispatch('fetchStory', {
    //         name: this.name,
    //         group: this.group,
    //         storyName: this.stories[curIndex].name
    //       }), curIndex })

    //     }
    //     console.log(curIndex) // индекс последнего изображения в массиве загруженных изображений
    //     this.currentStory = this.currentStories[curIndexInput] // из загруженных двух стори отдаем первую
    //    // this.currentStory = {...await this.$store.dispatch('fetchStory', storyData), curIndex}
    //   } catch(e){}
      

    // },
    // async storyUpdate(e, curIndex) {

    //   if (e.keyCode == 39 && curIndex < this.stories.length - 1) {

    //     if (this.currentStories && this.currentStories.length) {
    //       this.currentStory = this.currentStories[curIndex + 1] // отдаем следующий элемент
    //      // console.log('gived', this.currentStory)
    //     }

    //     try {
    //       curIndex = this.currentStories.length
    //       for (let i = 0; i < 1; i++) {
    //         curIndex += i
    //         this.currentStories.push({...await this.$store.dispatch('fetchStory', {
    //           name: this.name,
    //           group: this.group,
    //           storyName: this.stories[curIndex].name
    //         }), curIndex })
    //       }
    //       console.log(this.currentStories.length)
    //     } catch(e){}
    //   } else if(e.keyCode == 37 && curIndex >= 0) {

    //     if (this.currentStories && this.currentStories.length) {
    //       this.currentStory = this.currentStories[curIndex - 1] // отдаем следующий элемент
    //      // console.log('gived', this.currentStory)
    //     }
    //   } else {
    //     return
    //   }
    // }
  },
  components: {
    HeaderTitle, StoryModal
  }
}
</script>

<style lang="scss" scoped>
$width-card: 200px;

.col .row {
  margin: 0;
}

.list-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-top: 19px;
}
.card {
  margin: 0 20px 20px 0;
  width: $width-card;

  img {
    display: inline-block;
    height: auto;
    width: auto;
    max-width: 100%;
  }

  &-image {
    width: $width-card;
    height: 240px;
    background-color: #f6f6f6;
    overflow: hidden;
    text-align: center;
  }
}

</style>
