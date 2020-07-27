<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <ul class="">
        <li>
          <a class='dropdown-trigger black-text' data-target='dropdown' ref="dropdown-trigger" href="#">
            {{info.name}}
            <span class="icon-out"></span>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <a class="black-text" @click.prevent="logout">Выйти</a>
            </li>
            <Li>
              <!-- // надо добавить раздел Профиль -->
              <a class="black-text" @click.prevent="logout">Профиль</a>
            </Li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import M from "materialize-css/dist/js/materialize.min.js"
export default {
  data: ()=>({
    info: {},
    dropdown: null
  }),
  async mounted() {
    try {
      this.info = await this.$store.dispatch('fetchInfo') || {} // запрос инфо о юзере
    } catch(e){}

    this.dropdown = M.Dropdown.init(this.$refs['dropdown-trigger'], {
      constrainWidth: true
    })
  },
  beforeDestroy() {
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('logout')
        this.$router.push('/login?message=logout')
      } catch(e) {}
    }
  },
}
</script>

<style lang="scss">

.nav-wrapper {
  justify-content: flex-end!important;
}

.icon-out {
  display: inline-block;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-top-color: black;
  border-bottom: 0;
  margin: 0 0 3px 8px;
}
</style>
