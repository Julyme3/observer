<template>
  <form class="card auth-card" v-on:submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Авторизация</span>

      <div class="input-field">
        <input v-model="email"
          :class="{invalid: (this.$v.email.$dirty && !this.$v.email.required) || (this.$v.email.$dirty && !this.$v.email.email)}" 
          id="email" type="text"/>
        <label for="email">Email</label>
        <small v-if="(this.$v.email.$dirty && !this.$v.email.required)"
          class="helper-text invalid">Данное поле обязательно для заполнения
        </small>
        <small v-if="(this.$v.email.$dirty && !this.$v.email.email)"
           class="helper-text invalid">Введите корректный email
        </small>
      </div>

      <div class="input-field">
        <input v-model="password"
          :class="{invalid: (this.$v.password.$dirty && !this.$v.password.required) || (this.$v.password.$dirty && !this.$v.password.minLength)}"
          id="password" type="password" />
        <label for="password">Пароль</label>
        <small v-if="(this.$v.password.$dirty && !this.$v.password.required)"
          class="helper-text invalid">Данное поле обязательно для заполнения
        </small>
        <small v-if="(this.$v.password.$dirty && !this.$v.password.minLength)"
          class="helper-text invalid">Пароль должен быть не менее {{this.$v.password.$params.minLength.min}}. Сейчас он {{password.length}}
        </small>
      </div>
    </div>

    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">Войти</button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {required, email, minLength} from 'vuelidate/lib/validators'
import M from "materialize-css/dist/js/materialize.min.js"
import messages from "@/utils/messages"
export default {
  name: 'login',
  data: ()=>({
    email: '', // модель для валидации email
    password: '' // модель для валидации пароля
  }),
  validations: {
    email: {required, email},
    password: {required, minLength: minLength(6)}
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch(e){}
    }
  },
  mounted() {
    if (messages[this.$route.query['message']]) {
      this.$message({html: messages[this.$route.query['message']]})
    }
  }
}
</script>

<style lang="scss">
.card-title {
  font-weight: bold!important;
}
</style>
