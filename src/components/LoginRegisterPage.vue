<script setup>
import { ref } from 'vue';
import api from "../api/api"
import { isValidEmail } from "../methods";

const showPassword = ref(false);
const showRegisterFields = ref(false);

function checkEmail(e) {
  const email = e.target.value;
  if (!isValidEmail(email)) {
    e.target.setAttribute("aria-invalid", "true")
  } else {
    e.target.setAttribute("aria-invalid", "false")
  }
}
async function next(e) {
  e.preventDefault()
  const email = document.querySelector("#email").value;
  if(showRegisterFields.value){
    const email = document.querySelector("#email").value;
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const passwordAgain = document.querySelector("#password-again").value;
    if(password != passwordAgain){
      document.querySelector("#password-again").setAttribute("aria-invalid", "true")
    } else {
      const [resp, err] = await api.register(username, email, password)
      if(!err){
        console.log(resp)
      } else {
        console.log(err, resp)
      }
    }
  }
  if(!showRegisterFields.value && showPassword.value){
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const [resp, err] = await api.login(email, password);
    if(!err){
      console.log(resp);
      localStorage.setItem("session", resp)
    } else {
      console.log(err, resp)
    }
  }
  if (!showRegisterFields.value && isValidEmail(email)) {
    console.log(await api.isEmailRegistered(email))
    const [resp, err] = await api.isEmailRegistered(email);
    if (!err) {
      showPassword.value = true;
      showRegisterFields.value = !resp
    }
  }
}
</script>
<template>
  <div class="form-wrapper">
    <form>
      <label for="email">
        Электронная почта
        <input @focusout="checkEmail" type="text" id="email" name="email" placeholder="Email" required>
      </label>
      <label v-if="showRegisterFields" for="username">
        Имя пользователя
        <input type="text" id="username" name="username" placeholder="Имя пользователя" required>
      </label>
      <label v-if="showPassword" for="password">
        Пароль
        <input type="password" id="password" name="password" placeholder="Пароль" required>
      </label>
      <label v-if="showRegisterFields" for="password-again">
        Повторите пароль
        <input type="password" id="password-again" name="password-again" placeholder="Пароль" required>
      </label>
      <button @click="next">{{ !showPassword ? "Далее" : (showRegisterFields ? "Зарегистрироваться" : "Войти") }}</button>
    </form>
  </div>
</template>
<style scoped>
.form-wrapper {
   margin: var(--block-spacing-vertical);
 }
</style>