<template>
  <div v-if="profile" style="margin-top: 10px">
    <v-snackbar
        v-model="snackbar"
        :timeout="2000"
    >
      Поздравляем вы успешно записались к врачу
    </v-snackbar>
    <v-card outlined elevation="0">
      <v-card-title>Запись на прием к врачу</v-card-title>
      <v-card-text>
        <v-select
            clearable
            outlined
            v-model="specialization"
            label="Специализация врача"
            :items="specializationList"
            item-text="name"
            item-value="id" />
        <v-select
            clearable
            outlined
            v-model="doctor"
            label="Имя доктора"
            :items="doctorList"
            item-text="name"
            item-value="id"
            :disabled="step < 2"
        />
        <v-select
            clearable
            outlined
            v-model="doctorDate"
            label="Дата"
            :items="doctorDateList"
            item-text="name"
            item-value="id"
            :disabled="step < 3"
        />
        <div v-if="step >= 4">
          <v-select
              clearable
              outlined
              v-model="doctorTime"
              label="Время"
              :items="doctorTimeList"
              item-text="name"
              item-value="name"
          />
        </div>
        <div v-if="step === 4 && doctorTime !== null">
          <v-btn type="primary" block elevation="0" @click="addNewRecord">Записаться на прием</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['profile'],
  name: 'appointmentComponent',
  data() {
    return {
      snackbar: false,
      step: 1,
      specialization: null,
      specializationList: [],
      doctor: null,
      doctorList: [],
      doctorDate: null,
      doctorDateList: [],
      doctorTime: null,
      doctorTimeList: [],
    }
  },
  mounted() {
     this.doctorDateList = [{
       id: this.formatDate(new Date(Date.now())),
       name: 'Сегодня'
     }, {
       id: this.formatDate(new Date(Date.now() + ( 3600 * 1000 * 24))),
       name: 'Завтра'
     }, {
       id: this.formatDate(new Date(Date.now() + (( 3600 * 1000 * 24) * 2))),
       name: 'Послезавтра'
     }];

     this.loadSpecialization();
  },
  methods: {
    addNewRecord() {
      this.axios.post('/doctors/make-appointment', {
        doctor: this.doctor,
        date: this.doctorDate,
        time: this.doctorTime.replace(this.doctorDate, '').trim(),
      }).then(() => {
        this.snackbar = true;
        this.step = 1;
        this.specialization = null;
        this.doctor = null;
        this.doctorList = [];
        this.doctorDate = null;
        this.doctorTime = null;
        this.doctorTimeList = [];

      }).catch((err) => {
        console.error(err.message);
      })
    },
    formatDate(date) {
      let d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [day, month, year].join('.');
    },
    loadSpecialization() {
      this.axios.get('/specializations').then((data) => {
        this.specializationList = data.data.data;
      })
    },
    loadDoctorBySpecialization(id) {
      this.axios.get('/doctors?specialization=' + id).then((data) => {
        this.doctorList = data.data.data;
        this.step = 2;
      }).catch(() => {
        this.doctorList = [];
        this.step = 1;
      })
    },
    loadDoctorByDateAndId(id, date) {
      this.axios.get('/doctors/'+ id +'?date='+date).then((data) => {
        this.doctorTimeList = data.data.data.map((item) => {
          return {
            name: item.date + ' ' + item.time,
            disabled: item.ban,
          }
        });
      });
    }
  },
  watch: {
    specialization: function() {
      this.loadDoctorBySpecialization(this.specialization);
    },
    doctor: function () {
      this.step = 3;
    },
    doctorDate: function() {
      this.step = 4;
      this.loadDoctorByDateAndId(this.doctor, this.doctorDate);
    }
  }
}
</script>