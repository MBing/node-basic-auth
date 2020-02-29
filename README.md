# Node Auth
This repo has some basic setup for auth and only an API connection. So no frontend is available here.

## Tools
- mongodb
- nodejs
- pm2
- express

## How to start
Enter a valid url in the `config.json` file, you can use the `config.example.json` as a template.
You can register a MongoDB cloud cluster to get a url.

Debugging & Start with pm2:
```bash
$ npm i -g pm2
$ pm2 start --env development   # production
$ pm2 logs <id>                 # when you see `debug` in the code.. this will be available in the logs
$ pm2 restart <id>
$ pm2 delete <id>
```

When the server restarts, everything in the db is deleted!

## Guides
See `config.example.json` for a template to insert the url, remove `example`;
See `ecosystem.config.js` for the pm2 settings.
See `bin/www` for the settings of the server. This is usually the `server.js` file.
See `data.json` for the dummy data that will be loaded.
