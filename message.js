const request = require('./requestPromise')

module.exports = class Message {
    constructor(access_token) {
        this.ACCESS_TOKEN = access_token
    }

    async sendText(text, id) {
        const json = {
            recipient: { id },
            message: { text }
        }
        const res = await request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: this.ACCESS_TOKEN
            },
            json,
            method: 'POST'
        })
        console.log("Facebook says: ", res)
    }

    getMessageObj(json) {
        const message = json.entry[0].messaging[0].message.text
        const id = json.entry[0].messaging[0].sender.id
        return {message, id}
    }
}