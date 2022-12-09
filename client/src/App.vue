<template>
  <div id="app">
    <v-app>
      <v-container>
        <authorization :profile="profile" @update-profile="(value) => profile = value"/>
        <appointment v-if="profile" :profile="profile"/>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import authorization from '@/components/authorization';
import appointment from '@/components/appointment';

export default {
  name: 'App',
  components: {
    authorization,
    appointment
  },
  data() {
    return {
      profile: null,
      specializationSelect: null,
      specializationList: [],
    }
  },
  mounted() {
    this.axios.get('/profile', { withCredentials: true }).then((data) => {
          this.profile = data.data.data;
        }).catch(() => {
          this.profile = null;
    })
  },
  methods: {
    loadSpecialization() {
      this.axios.get('/specializations').then((data) => {
        this.specializationList = data.data.data;
        this.specializationSelect = this.specializationList[0];
      })
    },
  }
}
</script>
