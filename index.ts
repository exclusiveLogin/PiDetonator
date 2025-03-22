import {BHBot} from './bot/bhbot';
import dotenv from "dotenv";
dotenv.config();

let token = process.env["BHBOTTOKEN"] ?? "token not defined";

console.log("environment: ", JSON.stringify(process.env, null, 2));
console.log("token: ", token);

const BhBot = new BHBot(token);

// process.on("SIGINT", () => {
//   bot.telegram
//     .sendMessage(hgChatId, "Сервис бота остановлен")
//     .finally(() => process.exit());
// });