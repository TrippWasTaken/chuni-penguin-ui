Artemis frontend with an Aime switching ability because my lazy butt doesnt want to keep changing the text file manually.
In an ideal world this will be similar to the Osu website where every user can view scores and other user "profiles" so noone will actually need to make an account to just browse around

<strong> Please dont use this on a public server, theres no real security in place yet, only use this if you run a server between a few friends and you just want to be able to browse their scores and all that. 

The primary purpose is to use this on my local machine and with a few friends so I most likely will not be focusing on things like security. If you wish to help out feel free to reach out or create a PR  </strong>

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


## main screens as of 4/29/2024
![image](https://github.com/TrippWasTaken/chuni-penguin-ui/assets/25798641/05f5d31f-e5c4-4bd1-934c-d30d0b86f355)

![image](https://github.com/TrippWasTaken/chuni-penguin-ui/assets/25798641/d492429a-d263-420a-b0a2-c7d2d5444c63)

![image](https://github.com/TrippWasTaken/chuni-penguin-ui/assets/25798641/b530851b-fc5a-407c-80bf-1f0caaba0f73)

![image](https://github.com/TrippWasTaken/chuni-penguin-ui/assets/25798641/0cae76fc-ba77-4ec9-853e-a6c735b5434f)

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
