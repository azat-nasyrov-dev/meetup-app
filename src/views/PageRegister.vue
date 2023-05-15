<template>
  <UiForm @submit.prevent="handleSubmit">
    <UiFormGroup label="Email">
      <UiInput v-model="email" name="email" type="email" required />
    </UiFormGroup>
    <UiFormGroup label="Имя">
      <UiInput v-model="fullname" name="fullname" required />
    </UiFormGroup>
    <UiFormGroup label="Пароль">
      <UiInput v-model="password" name="password" type="password" required minlength="6" />
    </UiFormGroup>
    <UiFormGroup label="Повтор пароля">
      <UiInput v-model="password2" type="password" required minlength="6" />
    </UiFormGroup>
    <UiFormGroup>
      <UiCheckbox v-model="agree" name="agree" required>Я согласен с условиями</UiCheckbox>
    </UiFormGroup>

    <template #buttons>
      <UiButton variant="primary" type="submit">Зарегистрироваться</UiButton>
    </template>

    <template #append>
      Уже есть аккаунт?
      <UiLink :to="{ name: 'login' }">Войдите</UiLink>
    </template>
  </UiForm>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';
import UiFormGroup from '../components/UiFormGroup.vue';
import LayoutAuth from '../components/LayoutAuth.vue';
import UiInput from '../components/UiInput.vue';
import UiCheckbox from '../components/UiCheckbox.vue';
import UiLink from '../components/UiLink.vue';
import UiButton from '../components/UiButton.vue';
import UiForm from '../components/UiForm.vue';
import { useToaster } from '../plugins/toaster/index.js';
import { registerUser } from '../api/authApi.js';
import { useApi } from '../composables/useApi.js';
import { useLayout } from '../composables/useLayout.js';

export default {
  name: 'PageRegister',

  components: {
    UiForm,
    UiButton,
    UiLink,
    UiCheckbox,
    UiInput,
    UiFormGroup,
  },

  setup() {
    useHead({ title: 'Регистрация' });
    useLayout(LayoutAuth, { title: 'Регистрация' });

    const router = useRouter();
    const toaster = useToaster();
    const { result, request } = useApi(registerUser, {
      showProgress: true,
      successToast: 'Регистрация выполнена успешно',
      errorToast: true,
    });

    const email = ref('');
    const fullname = ref('');
    const password = ref('');
    const password2 = ref('');
    const agree = ref(false);

    const validate = () => {
      if (password.value !== password2.value) {
        return 'Пароли не совпадают';
      }
      if (!agree.value) {
        return 'Требуется согласится с условиями';
      }
    };

    const handleSubmit = async () => {
      const validationError = validate();
      if (validationError) {
        toaster.error(validationError);
        return;
      }
      await request({
        email: email.value,
        fullname: fullname.value,
        password: password.value,
      });
      if (result.value.success) {
        await router.push({ name: 'login' });
      }
    };

    return {
      email,
      fullname,
      password,
      password2,
      agree,
      handleSubmit,
    };
  },
};
</script>

<style scoped></style>
