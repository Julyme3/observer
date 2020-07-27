<template>
  <!-- Modal Structure v-on:keyup="onBtnNavigation(storyData.curIndex, $event)" -->
  <div >
    <div id="modal1" class="modal" ref="modal">
      <div>
        <VueSlickCarousel v-bind="settings">
          <div class="img"><img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"></div>
          <div class="img"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg"></div>
          <div class="img"><img src="https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706__340.jpg"></div>
          <div class="img"><img src="https://cdn.pixabay.com/photo/2015/06/19/21/24/the-road-815297__340.jpg"></div>

          
          <div class="img"><img src="https://cdn.pixabay.com/photo/2016/01/08/11/57/butterfly-1127666__340.jpg"></div>
          <div class="img"><img src="https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636__340.jpg"></div>
          <div class="img"><img src="https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492__340.jpg"></div>
          <div class="img"><img src="https://cdn.pixabay.com/photo/2013/07/18/10/56/railroad-tracks-163518__340.jpg"></div>
        </VueSlickCarousel>
      </div>
      <!-- <div class="modal-header">
        <div class="wrap-name">
          <h6 class="truncate title">Story {{ this.id }}</h6>
          <span>Desciption</span>
        </div>
        <div class="view">
          <div class="view-item">
            <div class="view-title">VIEW</div>
            <div class="buttons-view">
              <i v-for="imgItem in imgItems" :key="imgItem.name"
                class="material-icons small tooltipped" ref="tooltipped" @click="imgItem.state = !imgItem.state"
                data-position="bottom" data-tooltip="some text"
              >
                {{ imgItem.state ? "remove" : "add"}}
                <span class="icon-text">{{imgItem.cyrilithic}}</span>  
              </i>
            </div>
          </div>
          <div class="view-item">
            <div class="view-title">DIFF</div>
            <div class="view-diff"></div>
          </div>
        </div>
        <span class="modal-close"></span>
      </div>
      <div class="modal-content">
        <div v-for="imgItem in imgItems" :key="imgItem.name"
          class="inner-img" v-show="imgItem.state">
          <img :src="imgItem.url">
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
export default {
  props: ['storyData', 'isOpen'],
  name: 'storyModal',
  data: ()=>({
    modal: null,
    id: '',
    settings: {
      arrows: true,
      infinite: false,
      lazyLoad: 'ondemand'
    },
    imgItems: [
      { 
        url: '',
        state: true, // включена
      // text:  state ? 'Скрыть тест' : 'Показать тест'
        name: 'testDiffImage',
        cyrilithic: 'Эталон'
      },
      {
        url: '',
        state: true, // включена
        // text:  state ? 'Скрыть эталон' : 'Показать эталон'
        name: 'etalonDiffImage',
        cyrilithic: 'Тест'
      },
      {
        url: '',
        state: true, // включена
        // text:  state ? 'Скрыть различия' : 'Показать различия'
        name: 'diffImage',
        cyrilithic: 'Разница'
      }
    ],
    tolltip: null,
  }),
  mounted() {
    console.log('mounted')
    this.modal = M.Modal.init(this.$refs["modal"], {
      opacity: 0.9
    })
   // this.tooltip = this.$refs.tooltipped.forEach(item => { M.Tooltip.init(item) })
  },
  beforeDestroy() {
    console.log('destroy')
    if (this.modal && this.modal.destroy) {
      this.modal.destroy()
    }
    // if (this.tooltip && this.tooltip.destroy) {
    //   this.tooltip.destroy()
    // }
  },
  watch: {
    storyData() {
     // console.log('taked', this.storyData)
      const arrayImgs = [this.storyData.etalonDiffImage, this.storyData.testDiffImage, this.storyData.diffImage];
      this.imgItems.forEach((item, i)=> {
        item.url = arrayImgs[i]
      })
      this.id = this.storyData.id
    }
  },
  methods: {
    // onBtnNavigation(index, event) {
    //   console.log(event)
    //   this.$emit('updated', event, index)
    // }
  },
  components: { 
    VueSlickCarousel
  }
}
</script>

<style lang="scss">
@import '~vue-slick-carousel/dist/vue-slick-carousel.css';
@import '~vue-slick-carousel/dist/vue-slick-carousel-theme.css';

img {
  width: 500px;
  height: 500px;
  margin: 0 auto;
}

.slick-arrow:before {
  color: black!important;
}

.slick-prev {
  left: 0;
}

.slick-next {
  right: 0;
}

.modal {
  width: 90vw;
  height: 90vh;
  max-height: none;
  top: 5%!important;

  &-content {
    display: flex;
    justify-content: space-around;
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
  
}

.title {
  font-weight: bold;
}

.inner-img {
  $offset: 20px;
  position: relative;
  display: inline-block;
  vertical-align: top;
  font-size: 0;
  width: calc(100% / 3 - #{$offset});
  height: 60vh;
  overflow: hidden;

  img {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: auto;
    max-width: 100%;
  }
}

.inner-img + .inner-img {
  margin-left: 20px;
}

.view {
  display: flex;
  padding: 0 10px;
  background-color: #fefefe;
  outline: 1px solid rgba(0,0,0,.2);

  &-item {
    padding: 10px;
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
</style>
