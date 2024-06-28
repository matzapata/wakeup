
# Wakeup

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


Some notes:
- Left controllers tests as todo, just for time reason. I can try to push some as examples. We can also do some dto, repo and e2e testing.

Demo video in ./demo.mp4

Deployment at: https://wakeup-client.vercel.app/