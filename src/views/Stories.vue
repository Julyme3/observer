<template>
  <div class="row">
    <div><button @click.prevent="test">+</button> <button>-</button></div>
    <v-zoomer ref="zoomer" style="width: 500px; height: 500px; border: solid 1px silver;">
  <img
    src="https://cdn.pixabay.com/photo/2016/04/20/19/47/wolf-1341881__340.jpg"
    style="object-fit: contain; width: 100%; height: 100%;"
  >
</v-zoomer>
    <HeaderTitle v-bind:header-title="this.$route.params.report" />
    <div class="list-wrapper">
      <figure v-for="(story, idx) in items" 
        :key="story.name" 
        data-target="modal1" 
        class="card hoverable modal-trigger"
        @click="clickStoryHandler(idx, $event)"
      >
        <div class="card-image waves-effect">
          <img :src="story.image">
        </div>
        <figcaption class="card-content truncate">
          {{story.name}}
        </figcaption>
      </figure>
      <StoryModal
        v-if="openedModal"
       :stories="stories"
       :isOpen="openedModal"
       :currentStory="currentStory"
      />
    </div>
    <Paginate
      v-model="page" 
      :page-count="pageCount"
      :page-range="3"
      :margin-pages="2"
      :click-handler="pageChangeHandler"
      :prev-text="'Назад'"
      :next-text="'Вперед'"
      :container-class="'pagination'"
      :page-class="'page-item waves-effect'"
     />
  </div>
  
</template>

<script>
import HeaderTitle from '@/components/app/HeaderTitle'
import StoryModal from '@/components/app/StoryModal'
import paginationMixin from '@/mixins/pagination.mixin'

export default {
  mixins: [paginationMixin],
  data: ()=>({
    previewStories: [],
    currentStory: 0,
    name: '',
    group: '',
    stories: [],
    openedModal: false,
    currentStories: []
  }),

  async mounted() {
    this.name = this.$route.params.report
    this.group = this.$route.params.name

    const data = {
      name: this.name,
      group: this.group
    }

    try {
      this.previewStories = await this.$store.dispatch('fetchPreviewStories', data)
    } catch(e){}

    this.setupPagination(this.previewStories)
  },

  methods: {
    async clickStoryHandler(idx) {
      try {
        if (this.$store.getters.stories && !this.$store.getters.stories.length) {
          this.stories = await this.$store.dispatch('fetchStories', {
            name: this.name,
            group: this.group
          })
        }
      }catch(e){}
      
      this.openedModal = true
      this.currentStory = idx // передаем индекс кликнутого эл-та
    },
    test() {
      this.$refs.zoomer.zoomIn(2);
    //  console.log(this.$refs.zoomer);
     // this.$refs.zoomer.zoomIn();
    }
  },

  components: {
    HeaderTitle, StoryModal,
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
