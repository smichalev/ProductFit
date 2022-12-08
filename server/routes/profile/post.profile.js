const path = require('path');
const httpErrors = require('http-errors');
const usersModel = require(path.join(__dirname, '..', '..', 'models', 'users'));

module.exports = async (req, res, next) => {
	const { name, phone } = req.body;

	if (!name || !phone || name.length > 64 || phone.length > 64) {
		return next(httpErrors(400, 'Некорректные данные пользователя'));
	}

	const userDatabase = await usersModel.findOne({
		where: {
			phone,
		}
	});

	if (userDatabase) {
		return next(httpErrors(400, 'Такой номер телефона уже зарегистрирован'));
	}

	const user = await usersModel.create({
		name,
		phone,
	});

	req.session.user = user;
	req.session.save();

	return res
		.status(201)
		.json({ data: user });
}