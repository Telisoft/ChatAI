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

let chatData = '';
// Prompt description
const getPromptDescription = (id) => {
    let desc = ''
    desc = 'Chat with AI Friend where your AI Friend respond in cheerful, Valley girl, American English.\n\n'
    /*switch(id) {
        case 'JPN1':
            desc = 'Chat with AI Friend where your AI Friend respond in cheerful, young lady, Japanese.\n\n'
            break;
        case 'ENG2':
            desc = 'Chat with AI Friend where your AI Friend respond in Shakespearean, old English.\n\n'
            break;
        case 'US3':
            desc = 'Chat with AI Friend where your AI Friend respond in cheerful, Valley girl, American English.\n\n'
            break;
        case 'FIL4':
            desc = 'Chat with AI Friend where your AI Friend respond in cheerful, Filipino.\n\n'
            break;
        default:
    }*/

    return desc
}

export const getTextCompletion = async(message) => {
    let prompt = getPromptDescription();

    chatData += '\n';
    chatData += `You: ${message}`;

    prompt += chatData;

    // check token count
    const tokenPrompt = parseInt(prompt.length / 4); // we are making simple assumption that 4 chars = 1 token
    if (tokenPrompt > 2000) {
        /*
        The actual maximum number of tokens is around 2048 (new models support 4096).
        But I do not plan to hit it but put the ceiling a bit much lower then remove
        old messages after it is reached to continue chatting.
        */
        console.log("maximum!", tokenPrompt);

        // remove several lines from stored data
        let tmpData = chatData.split("\n").filter((d, i) => i > 20);
        chatData = tmpData.join("\n");

    }

    let reply = '';
    // generate message
    try {
        const completion = await API.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.5,
            max_tokens: 2000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            stop:["You:"]
        });

        reply = completion.data.choices[0].text.split('AI Friend:')[1].trim();
    } catch (error) {
        console.log(error);
        return "Something went wrong";
    }

    // update chat context
    if (reply) {
        chatData += `\n`;
        chatData += `AI Friend: ${reply}`;
    }

    return reply;
}

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