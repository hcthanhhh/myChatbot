const login = require('facebook-chat-api');
const Message = require('./message')
const axios = require('axios');
const urlencode = require('urlencode');

const bot = new Message('EAAL4eHJ09LEBAAE8e5R314Ywa2hkMo8zqIzWvZC0WwPyEI79PYyCzaWL9Qv7iwHsnoIdlNEJDSie7p9S0lyOrPd5jOpQsj3SZAJAY1Xvr98udzE1Ei61EOQJlsmGAVYvRu38PtjFZBznosv9uRXRHA2a6W8iMN9eBVdZAKtbbQZDZD');

function firstEntity(nlp, name) {
	return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
}

// Create simple echo bot
login({ email: '0396877733', password: '123QWEasd' }, (err, api) => {
	if (err) return console.error(err);

	api.listen(async(err, message) => {
		let query = urlencode(message.body);
		axios.get('http://api.minhhieu.asia/vi.php', { params: { text: message.body } })
			.then((response) => {				
				setTimeout(api.sendMessage(response.data, message.threadID), 1000);
			});
		axios({
			method: 'get',
			url: `https://api.wit.ai/message`,
			headers: { 'Authorization': 'Bearer OMNQNZSW7CCEAY6YLSIMPFUIJIDYJ46E' },
			params: {
				v:20190723,
				q:message.body
			}
		}).then(response => {
			res = response.data;
			console.log(res);
			// const greeting = firstEntity(res.entry[0].messaging[0].message.nlp, 'greetings');
			// if (response.object === 'page') {
			// 	// const messageObj = bot.getMessageObj(response);
			// 	if (greeting && greeting.confidence > 0.8) {
			// 		// bot.sendText('Xin chào. Bạn tên là gì?', messageObj.id);
			// 		api.sendMessage('Xin chào. Bạn tên là gì?', message.threadID);
			// 	} else {
			// 		// bot.sendText('Xin lỗi tôi không hiểu :(', messageObj.id);
			// 		api.sendMessage('Xin lỗi tôi không hiểu :(', message.threadID);
			// 	};
			// };
			// api.sendMessage(response.data, message.threadID);
		}).catch(err => {console.log(err)});
	});
});
