# Node Auth
This repo has some basic auth setup for an API connection. So no frontend is available in here.

## Tools
- [mongodb](https://www.mongodb.com/)
- [nodejs](https://nodejs.org/en/)
- [pm2](https://pm2.keymetrics.io/)
- [express](http://expressjs.com/)

## How to start
Enter a valid url in the `config.json` file, you can use the `config.example.json` as a template. 

You can register a MongoDB Atlas cloud cluster to get a valid url. Click [here](https://www.mongodb.com/cloud/atlas/signup) to sign up.

Debugging & Start with pm2:
```bash
$ npm i -g pm2                  # install pm2 globally
$ pm2 start --env development   # production
$ pm2 logs <id>                 # when you see `debug` in the code.. this will be available in the logs
$ pm2 restart <id>
$ pm2 delete <id>
```

When the server restarts, everything in the db is deleted!

## Guides
See `config.example.json` for a template to insert the url, remove `example`.

See `ecosystem.config.js` for the pm2 settings.

See `bin/www` for the settings of the server. This is usually the `server.js` file.

See `data.json` for the dummy data that will be loaded.
