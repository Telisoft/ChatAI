import { StatusCodes } from 'http-status-codes';
import axios from "axios";
import count from 'openai-gpt-token-counter';
import urlencode from 'urlencode';
import * as dotenv from 'dotenv';

import { Configuration, OpenAIApi } from 'openai';

dotenv.config();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.ORGANIATION_ID,
});

const API = new OpenAIApi(configuration);

// message: this is used for ChatCompletion API
const messages = [];
messages.push({"role": "system", "content": "You are a helpful assistant. American English."});
let tokenCount = 0;
const TOKEN_LIMIT = 100;    // limitation of input prompt

export const getChatCompletion = async (input) => {
    let size = count(input) + 4;
    if (tokenCount + size > TOKEN_LIMIT) {
        while (size > 0) {
            size = size - count(messages[1]["content"]) - 4;
            size = size - count(messages[2]["content"]) - 4;
            messages.splice(1, 2);
        }
    }

    messages.push({"role": "user", "content": input});

    try {
        const response = await API.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 2048,
        });

        const { status, data } = response;

        if (status !== StatusCodes.OK) {
            return "Server does not response";
        }

        const output = data["choices"][0]["message"]["content"];
        tokenCount = data["usage"]["total_tokens"];

        // update message
        messages.push({"role": data["choices"][0]["message"]["role"], "content": output});

        return output;
    } catch (err) {
        console.log(err);
        return "Something went wrong";
    }
}

export const sendSMS = async (data) => {
    try {
        let { sender, receiver, text } = data;
        text = urlencode(text);
        const response = await axios.get(`https://smsc.isptelecom.net/api.php?token=${process.env.ISP_TOKEN}&cmd=sendsms&src=${sender}&dst=${receiver}&concat=0&msg=${text}`);
        return response.data;
    } catch (err) {
        return "Invalid request";
    }
}

export default API