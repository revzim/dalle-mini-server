import argparse
import base64
import os
from pathlib import Path
from io import BytesIO
import time

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from consts import IMAGES_OUTPUT_DIR
from utils import parse_arg_boolean, parse_arg_dalle_version
from consts import ModelSize

app = Flask(__name__)
CORS(app)

start_time = int(time.time())
print(f"start [{start_time}] => dalle-mini-server begin init...")

from dalle_model import DalleModel
dalle_model = None

parser = argparse.ArgumentParser(description = "A DALL-E app to turn your textual prompts into visionary delights")
parser.add_argument("--port", type=int, default=8000, help = "backend port")
parser.add_argument("--model_version", type = parse_arg_dalle_version, default = ModelSize.MINI, help = "Mini, Mega, or Mega_full")
parser.add_argument("--save_to_disk", type = parse_arg_boolean, default = False, help = "Should save generated images to disk")
args = parser.parse_args()

@app.route("/dalle", methods=["POST"])
@cross_origin()
def generate_images_api():
    print("generate images api - /dalle")
    json_data = request.get_json(force=True)
    text_prompt = json_data["text"]
    num_images = json_data["num_images"]

    print(f"attempting to generate {num_images} image(s) for: ${text_prompt}")

    generated_imgs = dalle_model.generate_images(text_prompt, num_images)

    generated_images = []
    if args.save_to_disk:
        dir_name = os.path.join(IMAGES_OUTPUT_DIR,f"{time.strftime('%Y-%m-%d_%H:%M:%S')}_{text_prompt}")
        Path(dir_name).mkdir(parents=True, exist_ok=True)

    for idx, img in enumerate(generated_imgs):
        if args.save_to_disk:
            img.save(os.path.join(dir_name, f'{idx}.jpeg'), format="JPEG")

        buffered = BytesIO()
        img.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        print(f"generated [{text_prompt}] image #{idx}")
        generated_images.append(img_str)

    print(f"Created {num_images} images from text prompt [{text_prompt}]")
    return jsonify(generated_images)

@app.route("/dalleg", methods=["GET"])
@cross_origin()
def generate_images_api2():
    reqArgs = request.args
    # json_data = args.to_dict()
    text_prompt = reqArgs.get("text", default="a basketball humanoid sitting on a chair", type=str)
    num_images = reqArgs.get("num_images", default=2, type=int)
    print(f"attempting to generate {num_images} image(s) for: ${text_prompt}")
    # if type(num_images) != "int" or type(text_prompt) != "str":
    #     failedQuery = {
    #         "success": False,
    #         "types": {
    #             "text": type(text_prompt),
    #             "num_images": type(num_images)
    #         }
    #     }
    #     return jsonify(failedQuery)
    generated_imgs = dalle_model.generate_images(text_prompt, num_images)

    generated_images = []
    if args.save_to_disk:
        dir_name = os.path.join(IMAGES_OUTPUT_DIR,f"{time.strftime('%Y-%m-%d_%H:%M:%S')}_{text_prompt}")
        Path(dir_name).mkdir(parents=True, exist_ok=True)

    for idx, img in enumerate(generated_imgs):
        if args.save_to_disk:
            img.save(os.path.join(dir_name, f'{idx}.jpeg'), format="JPEG")

        buffered = BytesIO()
        img.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        print(f"generated [{text_prompt}] image #{idx}")
        generated_images.append(img_str)

    print(f"Created {num_images} images from text prompt [{text_prompt}]")
    return jsonify(generated_images)



@app.route("/", methods=["GET"])
@cross_origin()
def health_check():
    return jsonify(success=True)


with app.app_context():
    # print(f"--> Model selected - DALL-E {args.model_version}")
    dalle_model = DalleModel(args.model_version)
    dalle_model.generate_images("warm-up", 1)
    model_finish = (int(time.time()) - start_time) / 100000
    print(f"startup duration [{start_time}]")
    print("." * 100)
    print("dalle-server init and ready")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=args.port, debug=False)