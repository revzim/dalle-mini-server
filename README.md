# [dalle-mini-server][repo]

## dockerized dev environment / playground for [dalle-mini][dalle_mini]

![farmer][app_farmer]

frog riding a unicorn standing on top of a mountain of cookies
* ![frog][unicorn_frog]

otter and seal sitting on an iceberg drawn in cartoon style.jpg
* ![seal_otter][seal_otter]

superman punching spiderman on an iceberg
* ![super_spider][super_spider]

## [more images generated using silly prompts][1]

### development branch => `dev`

### flask app server to use dalle-mini
### react app client to generate images from a text prompt

### CLONE 
* `git clone https://github.com/revzim/dalle-mini-server.git`

#### RUN
* DOCKER
  - docker compose
    - `docker compose up`
  - docker only
    - `server/` & `client/` both contain respective Dockerfiles
  - [dalle-mini api endpoints][server_addr] *local*
  - [dalle-client frontend react app][client_addr] *local*
* LOCAL (LINUX/UNIX*)
  - server
    - [pytorch required][pytorch]
    - `cd server`
    - *python venv recommended* `python -m venv .`
    - `pip install -r requirements.txt`
    - `python app.py --port=8080`
  - client
    - `cd client`
    - `yarn or npm install`
    - `yarn start or npm run start`

### for testing / educational purposes only

[dalle-mini][dalle_mini] trained models are used to generate images from a text prompt

dev build pack inspired by [dalle-playground][dalle_pg]

#### author: revzim

[1]: assets/
[2]: assets/app/loading.png
[unicorn_frog]: assets/frog%20riding%20a%20unicorn%20standing%20on%20top%20of%20a%20mountain%20of%20cookies/2.jpg
[unicorn_frog2]: assets/frog%20riding%20a%20unicorn%20standing%20on%20top%20of%20a%20mountain%20of%20cookies/2.jpg
[seal_otter]: assets/otter%20and%20seal%20sitting%20on%20an%20iceberg%20drawn%20in%20cartoon%20style/0.jpg
[super_spider]: assets/superman%20punching%20spiderman%20on%20an%20iceberg/0.jpg
[app_farmer]: assets/app/farmer.png
[dalle_mini]: https://github.com/borisdayma/dalle-mini
[dalle_pg]: https://github.com/saharmor/dalle-playground
[server_addr]: http://localhost:8080
[client_addr]: http://localhost:3000]
[pytorch]: https://pytorch.org/get-started/locally/
[repo]: https://github.com/revzim/dalle-mini-server.git