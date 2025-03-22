import { Context, Telegraf } from "telegraf";
import { BotConfig } from "./bhbot.model";
import { CallbackQuery } from "@telegraf/types";

export class BHBot {
  constructor(private token: string, private config?: BotConfig) {
    this.#init();
    this.initHandlers();
    this.launch();
  }

  bot: Telegraf;

  #init() {
    this.bot = new Telegraf(this.token, {
      telegram: {
        // agent: new HttpsProxyAgent({port: '3128', host: '148.217.94.54'})
      },
    });
  }

  detonate(ctx: Context) {
    console.log('detonate: ', ctx);
  }
  status(ctx: Context) {
    console.log('status: ', ctx);
  }

  initHandlers() {
    this.bot.start((ctx) => {

      const inline_keyboard = [];
        
      inline_keyboard.push({
        text: "Статус",
        callback_data: "/status",
      });
  
      inline_keyboard.push({
        text: "Подрыв",
        callback_data: "/detonate",
      });

      ctx.reply("Выберите действие", {
        reply_markup: {
          inline_keyboard: [inline_keyboard],
        },
      });
    });

    this.bot.command("detonate", (ctx) => {
      console.log("subscribe", ctx, JSON.stringify(ctx.chat, null, 2));
      this.detonate(ctx);
    });

    this.bot.command("status", (ctx) => {
      console.log("unsubscribe", ctx, JSON.stringify(ctx.chat, null, 2));
      this.status(ctx);
    });

    this.bot.on("callback_query", (ctx: Context) => {

      const data = (ctx.callbackQuery as CallbackQuery.DataQuery).data;

      ctx.answerCbQuery("Обработка запроса");

      setImmediate(() => {
        switch (data) {
          case "/status":
            this.status(ctx);
            break;
          case "/detonate":
            this.detonate(ctx);
            break;
          default:
        }
      });
      console.log("callback_query", ctx.callbackQuery);
    });

    this.bot.on("message", (ctx) => {
      console.log("message", JSON.stringify(ctx, null, 2));
    });
  }

  launch() {
    this.bot.launch();
  }

}
