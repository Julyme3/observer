<template>
  <form class="card auth-card" v-on:submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Регистрация</span>

      <div class="input-field">
        <input v-model="email"
          :class="{invalid: (this.$v.$dirty && !this.$v.email.required) || (this.$v.$dirty && !this.$v.email.email)}"
          id="email" type="text"/>
        <label for="email">Email</label>
        <small v-if="(this.$v.$dirty && !this.$v.email.required)"
          class="helper-text invalid">Поле не должно быть пустым
        </small>
        <small v-if="(this.$v.$dirty && !this.$v.email.email)"
          class="helper-text invalid">Ввведите корректный адрес
        </small>
      </div>

      <div class="input-field">
        <input v-model="password"
          :class="{invalid: (this.$v.$dirty && !this.$v.password.required) || (this.$v.$dirty && !this.$v.password.minLength)}"
          id="password" type="password" />
        <label for="password">Пароль</label>
        <small v-if="(this.$v.$dirty && !this.$v.password.required)"
          class="helper-text invalid">Данное поле обязательно для заполнения
        </small>
        <small v-if="(this.$v.$dirty && !this.$v.password.minLength)"
          class="helper-text invalid">Пароль должен быть не менее {{this.$v.password.$params.minLength.min}}. Сейчас он {{password.length}}
        </small>
      </div>

      <div class="input-field">
        <input v-model="name"
          :class="{invalid: (this.$v.$dirty && !this.$v.name.required)}"
          id="name" type="text" />
        <label for="name">Имя</label>
        <small v-if="(this.$v.$dirty && !this.$v.name.required)"
          class="helper-text invalid">Данное поле обязательно для заполнения
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {required, minLength, email} from "vuelidate/lib/validators"
export default {
  name: 'register',
  data: ()=>({
    email: '',
    password: '',
    name: ''
  }),
  validations: {
    email: {required, email},
    password: {required, minLength: minLength(6)},
    name: {required}
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch(e) {}
      
    }
  }
}
</script>


<style lang="scss" scoped>
.card-title {
  font-weight: bold!important;
}
</style>
