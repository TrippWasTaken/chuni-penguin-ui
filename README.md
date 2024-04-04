Artemis frontend with an Aime switching ability because my lazy butt doesnt want to keep changing the text file manually.
In an ideal world this will be similar to the Osu website where every user can view scores and other user "profiles" so noone will actually need to make an account.
why? because Im too lazy to do user auth rn :)

## Currently using
- NextJS
- TailwindCSS
- Drizzle
- Node
- Typescript
- Framer Motion
- Axios

## Todo
- Mobile layout if I actually get somewhere with this
- New Aime creation/profile adding
- Whole Chuni UI lol

## How to run although theres not much to run
- ```npm install```
- Add an ``` .env.local ``` file to the project root with the following variables
```
DATABASE_URL="YOUR ARTEMIS URI HERE"
AIME_TXT="YOUR aime.txt PATH HERE"
```
- you might need to run this ```npx drizzle-kit introspect:mysql``` if for some reason github ignored the db files
- if you did need to run that you'll have to fix some syntax errors and I think import some missing imports.
- Adter that youre all setup and just do the classic ```npm run dev```
