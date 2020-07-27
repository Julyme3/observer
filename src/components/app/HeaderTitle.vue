<template>
  <h6 class="main-title">Результат: {{ headerTitle }}</h6>
</template>

<script>
export default {
  name: 'headerTitle',
  props: ['headerTitle']
}
</script>

<style lang="scss" scoped>
.main-title {
  font-weight: bold;
}
</style>
