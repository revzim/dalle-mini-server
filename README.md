# dalle-mini-server

### flask app server to use dalle-mini
### react app client to generate images from a text prompt

### `git clone https://github.com/revzim/dalle-mini-server.git`

#### RUN
  * DOCKER
    - docker compose
      - `docker compose up`
    - docker only
      - `server/` & `client/` both contain respective Dockerfiles
    - [dalle-mini api endpoints](http://localhost:8080) *local*
    - [dalle-client frontend react app](localhost:3000) *local*
  * LOCAL (LINUX/UNIX*)
    - server
      - [pytorch required](https://pytorch.org/get-started/locally/)
      - `cd server`
      - *python venv recommended* `python -m venv .`
      - `pip install -r requirements.txt`
      - `python app.py --port=8080`
    - client
      - `cd client`
      - `yarn or npm install`
      - `yarn start or npm run start`

#### author: revzim

build pack inspired by [dalle-playground](https://github.com/saharmor/dalle-playground)
