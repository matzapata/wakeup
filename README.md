
# Wakeup

Run with docker compose:
1. Run `docker compose up`
2. When postgres service is stable go inside server set `.env` to:
```
DATABASE_URL="postgres://postgres:password@localhost:5432/mydatabase"
DATABASE_URL_NON_POOLING="postgres://postgres:password@localhost:5432/mydatabase"
```
3. Run `npx prisma:push` and `npm run prisma:seed`
4. Ready. Go to `localhost:3000`

How to run the server:
1. Replace `.env.example` for `.env` and fill up values. 
2. `npm install` by default will generate prisma client through postinstall
3. If running local db instance you may want to do `npx prisma db push` for quick testing
4. `npm run start` or `npm run start:dev`

Run  server tests:
1. Run `npm run test` inside server

How to run the client:
1. Replace `.env.local.example` for `.env.local` and fill up values. 
2. `npm install` to setup dependencies followed by `npm run start`
4. Ready. Go to `localhost:3000`


Some notes:
- Left controllers tests as todo, just for time reason. I can try to push some as examples. We can also do some dto, repo and e2e testing.

Demo video in ./demo.mp4

Deployment at: https://wakeup-client.vercel.app/