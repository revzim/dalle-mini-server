# [dalle-mini-server][repo]

## dockerized dev environment / playground for [dalle-mini][dalle_mini]
### flask and react web app to generate images from text
---

![app][app_clown]

---

### SOME EXAMPLE IMAGES GENERATED WITH THIS REPO
---
> ![clown][clown4]  
"scary clown playing a cello painted in the style of van gogh"

> ![frog][unicorn_frog]  
"frog riding a unicorn standing on top of a mountain of cookies"

> ![seal_otter][seal_otter]  
"otter and seal sitting on an iceberg drawn in cartoon style"

> ![super_spider][super_spider]  
"superman punching spiderman on an iceberg"

## [more images generated using silly prompts][1]

### CLONE
---
* `git clone https://github.com/revzim/dalle-mini-server.git`

#### RUN
---
* DOCKER
  - docker compose
    - start
      - `docker compose up`
    - rebuild all
      - `docker compose build`
    - rebuild server
      - `docker compose build dalle_server_flask`
    - rebuild client
      - `docker compose build dalle_client_react`
    - to force rebuild of entire container add `--no-cache`
  - docker only
    - `server/` & `client/` both contain respective Dockerfiles
  - [dalle-mini api endpoints][server_addr] *local*
  - [dalle-client frontend react app][client_addr] *local*
* LOCAL (LINUX/UNIX*)
  - [server][server_dir]
    - [pytorch required][pytorch]
    - `cd server`
    - *python venv recommended* `python -m venv .`
    - `pip install -r requirements.txt`
    - `python app.py --port=8080`
  - [client][client_dir]
    - `cd client`
    - `yarn or npm install`
    - `yarn start or npm run start`

**-important installation/run note-**
* *dalle-mini uses large models that sometimes can take a couple minutes to load, please be patient while the server starts*

---
### for testing / educational purposes only
---
[dalle-mini][dalle_mini] trained models are used to generate images from a text prompt

dev build pack inspired by [dalle-playground][dalle_pg]

---
#### author: revzim

[1]: assets/
[2]: assets/app/loading.png
[server_dir]: server/
[client_dir]: client/
[unicorn_frog]: assets/frog%20riding%20a%20unicorn%20standing%20on%20top%20of%20a%20mountain%20of%20cookies/2.jpg
[unicorn_frog2]: assets/frog%20riding%20a%20unicorn%20standing%20on%20top%20of%20a%20mountain%20of%20cookies/2.jpg
[seal_otter]: assets/otter%20and%20seal%20sitting%20on%20an%20iceberg%20drawn%20in%20cartoon%20style/0.jpg
[super_spider]: assets/superman%20punching%20spiderman%20on%20an%20iceberg/0.jpg
[clown0]: assets/scary%20clown%20playing%20a%20cello%20painted%20in%20the%20style%20of%20van%20gogh/0.jpg
[clown1]: assets/scary%20clown%20playing%20a%20cello%20painted%20in%20the%20style%20of%20van%20gogh/1.jpg
[clown2]: assets/scary%20clown%20playing%20a%20cello%20painted%20in%20the%20style%20of%20van%20gogh/2.jpg
[clown3]: assets/scary%20clown%20playing%20a%20cello%20painted%20in%20the%20style%20of%20van%20gogh/3.jpg
[clown4]: assets/scary%20clown%20playing%20a%20cello%20painted%20in%20the%20style%20of%20van%20gogh/4.jpg
[app_farmer]: assets/app/farmer.png
[app_clown]: assets/app/clown.png
[dalle_mini]: https://github.com/borisdayma/dalle-mini
[dalle_pg]: https://github.com/saharmor/dalle-playground
[server_addr]: http://localhost:8080
[client_addr]: http://localhost:3000
[pytorch]: https://pytorch.org/get-started/locally/
[repo]: https://github.com/revzim/dalle-mini-server.git