<template>
  <div id="modal1" class="modal" ref="modal">
    <VueSlickCarousel v-bind="settings" ref="carousel" @init="test1" @afterChange="test1">
      <div v-for="(diff, idx) in stories" :key="diff.name">
        <div class="modal-header">
          <div class="wrap-name">
            <h6 class="truncate title">Story {{idx + 1}}/{{stories.length}}: {{ diff.id }}</h6>
          </div>
          <span class="modal-close"></span>
        </div>
          <div class="modal-content">
            <div class="view">
              <input
                id="etalon" 
                type="checkbox"
                v-model="checkedEtalon" 
                value="checked" 
                class="view-item" 
              />
              <label class="waves-effect waves-light btn" for="etalon">Etalon</label>
              <input 
                id="test"
                type="checkbox" 
                v-model="checkedTest"
                value="checked" 
                class="view-item" 
              />
              <label class="waves-effect waves-light btn" for="test">Test</label>
              <input 
                id="diff"
                type="checkbox" 
                v-model="checkedDiff"
                value="checked" 
                class="view-item" 
              />
              <label class="waves-effect waves-light btn" for="diff">Diff</label>
            </div>
            <div class="desc">
              <p class="truncate">{{ diff.server.test }}</p>
              <p class="truncate">{{ diff.url }}</p>
              <p>{{ diff.browser.osName }} | {{ diff.browser.browserName }} | {{ diff.browser.resolution }}</p>
            </div>
            
          </div>
          <div><button @click.prevent="test">+</button> <button>-</button></div>
            <v-zoomer ref="zoomer" class="vue-vue" style="width: 500px; height: 500px; border: solid 1px silver; transform: translate(0px, 0px) scale(1);">
            <img
              src="https://cdn.pixabay.com/photo/2016/04/20/19/47/wolf-1341881__340.jpg"
              style="object-fit: contain; width: 100%; height: 100%;"
          >     
          </v-zoomer>

<!-- <v-zoomer ref="zoomer" style="width: 500px; height: 500px; border: solid 1px silver;">
  <img
    :src="diff.etalonDiffImage"
    style="object-fit: contain; width: 100%; height: 100%;"
  >
</v-zoomer> -->
          <!-- <div class="inner-img" v-show="checkedEtalon">
            <img :src="diff.etalonDiffImage">
          </div> -->
           <!-- <div class="inner-img" v-show="checkedEtalon">
            <img :src="diff.etalonDiffImage">
          </div> -->
          <!-- <div class="inner-img" v-show="checkedTest">
            <img :src="diff.testDiffImage">
          </div>
          <div class="inner-img" v-show="checkedDiff">
            <img :src="diff.diffImage">
          </div> -->
        </div>
    </VueSlickCarousel>
  </div>
</template>


<script>
import VueSlickCarousel from 'vue-slick-carousel'
export default {
  props: ['stories', 'currentStory'],
  name: 'storyModal',
  data: ()=>({
    modal: null,
    id: '',
    settings: {
      arrows: true,
      infinite: false,
      lazyLoad: 'progressive'
    },
    checkedDiff: true,
    checkedEtalon: true,
    checkedTest: true,
    tolltip: null,
    idZoomer: 0,
  }),
  mounted() {
    //debugger;
    setTimeout(() => {
      this.modal = M.Modal.init(this.$refs["modal"], {
        opacity: 0.9,
        onOpenStart: () => {
          this.$refs.carousel.goTo(this.currentStory)
        }
      }).open();
    }, 0);
  },
  beforeDestroy() {
    if (this.modal && this.modal.destroy) {
      this.modal.destroy()
    }
    this.$store.commit('clearStories') // когда закрываем страницу со списком сторис то очищаем геттер со сторис
  },
  methods: {
    test() {
      this.$refs.zoomer.zoomIn(2);
    //  console.log(this.$refs.zoomer);
     // this.$refs.zoomer.zoomIn();
    },
    test1() {
      const template = ``;
    }
  },
  watch: {
    currentStory() { // следим за индексом текущей стори
      return this.currentStory
    }
  },
  components: { 
    VueSlickCarousel,
  }
}
</script>

<style lang="scss">
@import '~vue-slick-carousel/dist/vue-slick-carousel.css';
@import '~vue-slick-carousel/dist/vue-slick-carousel-theme.css';
//@import '~viewerjs/dist/viewer.css';

// img {
//   width: 500px;
//   height: 500px;
//   margin: 0 auto;
// }

.slick-arrow {
  z-index: 1;

  &:before {
    color: black!important;
  }
}

.slick-prev {
  left: 0;
}

.slick-next {
  right: 0;
}

.slick-slide {
  text-align: center;

  > div,
  > div > div {
    height: 100%;
  }
}

.slick-slider, .slick-list, .slick-track {
  height: 100%;
}

.modal {
  width: 90vw;
  height: 90vh;
  max-height: none;
  top: 5%!important;

  &-content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    label {
      display: inline-block;
      width: 100px;
      height: 30px;
      line-height: 30px;
      color: black;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
    }
  }

  &-header {
    position: relative;
  }

  .modal-content {
    padding: 5px 20px;
  }
}
.modal-close {
  display: inline-block;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 30px;
  height: 30px;

  &:after, &:before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 2px;
    background-color: rgba(0,0,0,0.87);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}

.wrap-name {
  max-width: calc(100% - 100px);
  padding: 6px 10px 10px 20px;
  text-align: left;
  
}

.title {
  font-weight: bold;
  margin-bottom: 10px;
}

.inner-img {
  $offset: 20px;
  position: relative;
  display: inline-block;
  vertical-align: top;
  font-size: 0;
  width: calc(100% / 3 - #{$offset});
  height: 60vh;
  //overflow: hidden;

  // img {
  //   display: block;
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   height: auto;
  //   max-width: 100%;
  // }
}

.inner-img + .inner-img {
  margin-left: 20px;
}

.view {
  display: flex;
  background-color: #fefefe;
  outline: 1px solid rgba(0,0,0,.2);

  &-item {
    display: none;

    &:not(:checked) + label {
      background-color: #DFDFDF;
    }
  }

  &-title {
    text-align: center;
    font-size: 10px;
    color: black;
  }

  i {
    margin-right: 10px;
    text-align: center;

    &:hover {
      cursor: pointer;
    }
  }

  .view-item + .view-item {
    border-left: 1px solid rgba(0,0,0,.2);
  }

  .icon-text {
    display: block;
      font-size: 14px;
  }
}

.desc {
  width: 100%;
  text-align: left;

    p {
      font-size: 16px;
      color: rgba(0,0,0,.55);
      margin: 2px 0;
    }
}
</style>
