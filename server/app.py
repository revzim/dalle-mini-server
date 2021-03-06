import argparse
import time

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from utils import parse_arg_boolean, parse_arg_dalle_version, get_request_data, parse_request_and_generate_images, parse_arg_dalle_seed
from consts import ModelSize, DEFAULT_SEED

app = Flask(__name__)
CORS(app)

start_time = int(time.time())
print(f"start [{start_time}] => dalle-mini-server begin init...")

from dalle_model import DalleModel
dalle_model = None

parser = argparse.ArgumentParser(description = "dalle-mini-server: generate images from a text propmt")
parser.add_argument("--port", type=int, default=8000, help = "port")
parser.add_argument("--model_version", type = parse_arg_dalle_version, default = ModelSize.MINI, help = "Mini, Mega, Mega_full")
parser.add_argument("--seed", type = parse_arg_dalle_seed, default = DEFAULT_SEED, help = "pass a seed to replicate generation")
parser.add_argument("--save_to_disk", type = parse_arg_boolean, default = False, help = "save generated images to disk")
args = parser.parse_args()

dalle_seed = parse_arg_dalle_seed(args.seed)
# dalle_seed_hash = hash(dalle_seed)

@app.route("/dalle", methods=["POST"])
@cross_origin()
def api_gen_imgs_post():
  json_data = get_request_data("post", request)
  if json_data["error"] is not None:
    print("bad post data")
    return jsonify({
      "error": "bad request",
    })

  generated_imgs = parse_request_and_generate_images(dalle_model, json_data, args, dalle_seed)

  return jsonify(generated_imgs)

@app.route("/dalleg", methods=["GET"])
@cross_origin()
def api_gen_imgs_get():
  json_data = get_request_data("get", request)
  if json_data["error"] is not None:
    print("bad post data")
    return jsonify({
      "error": "bad request",
    })

  generated_imgs = parse_request_and_generate_images(dalle_model, json_data, args, dalle_seed)

  return jsonify(generated_imgs)

@app.route("/", methods=["GET"])
@cross_origin()
def health_check():
  return jsonify(success=True)

def dotprint(line_len):
  for i in range(line_len):
    print("." * 100)

with app.app_context():
  dotprint(2)
  print(f"dalle-mini-server model: {args.model_version}")
  print(f"dalle-mini seed: {parse_arg_dalle_seed(args.seed)}")
  # print(f"dalle-mini hashed seed: {dalle_seed_hash}")
  dotprint(2)
  dalle_model = DalleModel(args.model_version)
  dalle_model.generate_images("warm-up", 1, "")
  init_duration = (int(time.time()) - start_time)
  print(f"startup duration: {init_duration} seconds")
  print("dalle-server init and ready")
  dotprint(2)

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=args.port, debug=False)