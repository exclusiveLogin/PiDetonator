# PiDetonator — Telegram Bot Service

Telegram-бот на TypeScript, структурированный по принципам NestJS (dependency injection, сервисный слой). Запускается через PM2, поддерживает secrets через `.env.vault`.

## Особенности архитектуры

- **NestJS-style structure** — разделение на модули: `bot/`, сервисы, конфиги
- **PM2 runtime** — продакшн-деплой через `ecosystem.config.js` с настройками restart policy
- **Secrets management** — `.env.vault` для безопасного хранения чувствительных данных (Dotenv Vault)
- **TypeScript strict** — полная типизация, `tsconfig.json` с strict mode

## Структура проекта

```
PiDetonator/
├── bot/
│   ├── bhbot.ts           # Основная логика бота
│   └── bhbot.model.ts     # Типы и интерфейсы
├── index.ts               # Точка входа
├── ecosystem.config.js    # PM2 конфигурация
├── .env.vault             # Зашифрованные переменные окружения
└── tsconfig.json
```

## Стек

| Технология | Назначение |
|-----------|-----------|
| TypeScript | Основной язык |
| Telegraf | Telegram Bot API |
| PM2 | Process management (продакшн) |
| Dotenv Vault | Управление секретами |

## Запуск

```bash
# Установка зависимостей
npm install

# Настройка окружения
npx dotenv-vault pull   # или ручное создание .env

# Разработка
npm run dev

# Продакшн
pm2 start ecosystem.config.js
```

## Переменные окружения

| Переменная | Описание |
|-----------|---------|
| `BHBOTTOKEN` | Telegram Bot API token |
| `DATABASE_URL` | Строка подключения к БД (если используется) |
