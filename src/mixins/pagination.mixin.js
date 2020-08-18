import _ from 'lodash'

export default {
  data: function() {
    return {
      page: +this.$route.query.page || 1, // текущая страница
      pageSize: 100, // количество записей на 1 странице
      pageCount: 0, // общее количество страниц
      allItems: [], // все записи
      items: [] // записи для конкретной страницы
    }
  },

  methods: {
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize)
      this.pageCount = _.size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`) // добавляем в query параметр - номер выбранной страницы
      this.items = this.allItems[page - 1] || this.allItems[0]
    }
  }
};
