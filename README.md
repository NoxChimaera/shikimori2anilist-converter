# shikimori2anilist-converter

Конвертер списков аниме с Shikimori в формат Anilist.co

## Как пользоваться

1. Устанавливаем Node.js
2. Устанавливаем зависимости: `npm ci`
3. Экспортируем список аниме (Настройки → Список аниме и манги → Экспортировать список → JSON)
4. Полученный файл переименовываем в `animes.json` и кладём в корень конвертера
5. `npm run start`
6. На выходе получаем `animes.xml`, который можно импортировать на Anilist.co (Settings → Import Lists)
