<template>
  <v-card elevation="0" outlined>
    <div v-if="!profile">
      <v-card-text>
        <v-alert
            border="left"
            color="warning"
            dark
            v-if="messageAuthError"
        >
          {{ messageAuthError }}
        </v-alert>
        <v-text-field outlined label="Ваше имя" v-model="name" hide-details="auto"></v-text-field>
        <v-text-field outlined label="Ваш номер телефона" v-model="phone" hide-details="auto" style="margin-top: 10px"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block elevation="0" :disabled="!name.length || !phone.length" @click="auth">Авторизация</v-btn>
      </v-card-actions>
    </div>
    <div v-if="profile">
      <v-list-item v-if="profile && profile.name">
        <v-list-item-title>Ваше имя</v-list-item-title>

        <v-list-item-subtitle>
          {{ profile.name }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item v-if="profile && profile.phone">
        <v-list-item-title>Ваш номер телефона</v-list-item-title>

        <v-list-item-subtitle>
          {{ profile.phone }}
        </v-list-item-subtitle>
      </v-list-item>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'authorizationComponent',
  props: ['profile'],
  data() {
    return {
      name: '',
      phone: '',
      messageAuthError: null,
    }
  },
  methods: {
    auth() {
      this.messageAuthError = '';
      this.axios.post('/profile', {
        name: this.name,
        phone: this.phone
      }).then((data) => {
        this.$emit('update-profile', data.data.data);
          }).catch((err) => {
        this.$emit('update-profile', null);
            this.messageAuthError = err.response.data.message;
          })
    }
  }
}
</script>