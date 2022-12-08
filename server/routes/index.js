const path = require('path');

const { errorSystem, notFoundEndpoint } = require(path.join(__dirname, 'errors'));

const controllerGetProfile = require(path.join(__dirname, 'profile', 'get.profile.js'));
const controllerPostProfile = require(path.join(__dirname, 'profile', 'post.profile.js'));
const controllerGetSpecializations = require(path.join(__dirname, 'specializations', 'get.specializations.js'));
const controllerGetDoctors = require(path.join(__dirname, 'doctors', 'get.doctors.js'));
const controllerGetDoctor = require(path.join(__dirname, 'doctors', 'get.doctor.id.js'));
const controllerPostMakeAppointment = require(path.join(__dirname, 'doctors', 'post.make-appointment.js'));

module.exports = (app) => {
	app.get('/api/profile', controllerGetProfile);
	app.post('/api/profile', controllerPostProfile);
	app.get('/api/specializations', controllerGetSpecializations);
	app.get('/api/doctors', controllerGetDoctors);
	app.get('/api/doctors/:id', controllerGetDoctor);
	app.post('/api/doctors/make-appointment', controllerPostMakeAppointment);
	app.use(errorSystem);
	app.use(notFoundEndpoint);
}