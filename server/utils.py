from time import strftime
import base64
import os
from pathlib import Path
from io import BytesIO
from consts import ModelSize, IMAGES_OUTPUT_DIR

def generate_model_images(model, text_prompt, num_images, args):
  imgs = model.generate_images(text_prompt, num_images)

  list_of_imgs = []
  if args.save_to_disk:
    dir_name = os.path.join(IMAGES_OUTPUT_DIR,f"{strftime('%Y-%m-%d_%H:%M:%S')}_{text_prompt}")
    Path(dir_name).mkdir(parents=True, exist_ok=True)

  for idx, img in enumerate(imgs):
    if args.save_to_disk:
      img.save(os.path.join(dir_name, f'{idx}.jpeg'), format="JPEG")

    buffered = BytesIO()
    img.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    print(f"generated [{text_prompt}] image #{idx}")
    list_of_imgs.append(img_str)

  print(f"generated {num_images} images from text prompt [{text_prompt}]")
  return list_of_imgs

def parse_request_and_generate_images(model, json_data, args):
  text_prompt, num_images = json_data["text"], json_data["num_images"]

  print(f"attempting to generate {num_images} image(s) for: ${text_prompt}")

  generated_imgs = generate_model_images(model, text_prompt, num_images, args)

  return generated_imgs

def get_request_data(key, request):
  request_data = {
    "text": "a gorilla running after a giant banana car",
    "num_images": 1,
    "error": None
  }
  if key == "post":
    json_data = request.get_json(force=True)
    request_data["text"] = json_data["text"]
    request_data["num_images"]  = json_data["num_images"]
  elif key == "get":
    reqArgs = request.args
    request_data["text"] = reqArgs.get("text", default="a basketball humanoid sitting on a chair", type=str)
    request_data["num_images"]  = reqArgs.get("num_images", default=2, type=int)
  else:
    request_data["error"] = 1

  return request_data

def parse_arg_boolean(value):
  value = value.lower()

  if value in ["true", "yes", "y", "1", "t"]:
    return True
  elif value in ["false", "no", "n", "0", "f"]:
    return False

  return False

def parse_arg_dalle_version(value):
  value = value.lower()
  return ModelSize[value.upper()]