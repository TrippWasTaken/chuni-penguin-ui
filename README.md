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
- Ffmpeg

## currently in working condition
- Aime switching
- new user adding


## main screens as of 4/6/2024
![image](https://github.com/TrippWasTaken/chuni-penguin-ui/assets/25798641/b530851b-fc5a-407c-80bf-1f0caaba0f73)

![image](https://github.com/TrippWasTaken/chuni-penguin-ui/assets/25798641/a8284d14-a771-4603-8dbc-3d93e9700f25)


## Todo
- Mobile layout if I actually get somewhere with this
- Whole Chuni UI lol

## How to run
- ```npm install```
- Add an ``` .env.local ``` file to the project root with the following variables
- Run the extract script with node and make sure your directories are set properly (be sure to create a static folder in public if it doesnt exist)
```
DATABASE_URL="YOUR ARTEMIS URI HERE"
AIME_TXT="YOUR aime.txt PATH HERE"
```
- you might need to run this ```npx drizzle-kit introspect:mysql``` if for some reason github ignored the db files
- if you did need to run that you'll have to fix some syntax errors and I think import some missing imports.
- Adter that youre all setup and just do the classic ```npm run dev```
