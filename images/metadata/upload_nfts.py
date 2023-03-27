import os
import requests
import json

API_KEY = 'e376349afcfece39b493'
API_SECRET = '82d79ddd3f9112980f58479bc2482652af1e30e983320ceab49af6daae61b099'
IMAGE_FOLDER_PATH = '../images'

def get_content_type(file_path):
    _, ext = os.path.splitext(file_path)
    if ext.lower() == '.jpg' or ext.lower() == '.jpeg':
        return 'image/jpeg'
    elif ext.lower() == '.png':
        return 'image/png'
    elif ext.lower() == '.gif':
        return 'image/gif'
    else:
        return None

def pin_file_to_pinata(file_path):
    content_type = get_content_type(file_path)
    if content_type is None:
        raise Exception(f"Unsupported file type: {file_path}")

    url = "https://api.pinata.cloud/pinning/pinFileToIPFS"

    headers = {
        "pinata_api_key": API_KEY,
        "pinata_secret_api_key": API_SECRET,
    }

    with open(file_path, "rb") as file:
        result = requests.post(
            url,
            files={"file": (os.path.basename(file_path), file, content_type)},
            headers=headers
        )

    if result.status_code != 200:
        raise Exception("Failed to pin file: " + result.text)

    return json.loads(result.text)["IpfsHash"]

def pin_json_to_pinata(json_data):
    url = "https://api.pinata.cloud/pinning/pinJSONToIPFS"
    
    headers = {
        "Content-Type": "application/json",
        "pinata_api_key": API_KEY,
        "pinata_secret_api_key": API_SECRET,
    }

    result = requests.post(
        url,
        data=json.dumps(json_data),
        headers=headers
    )

    if result.status_code != 200:
        raise Exception("Failed to pin JSON: " + result.text)

    return json.loads(result.text)["IpfsHash"]

image_info = {
    "Brad": {
        "description": "Before he turned into the Hulk",
        "attributes": [
            {
                "trait_type": "creatine",
                "value": 86
            }
        ]
    },
    "Cion": {
        "description": "I hope you get the hob but if not you'll get the next hob",
        "attributes": [
            {
                "trait_type": "covid",
                "value": 72
            }
        ]
    },
    "Gray": {
        "description": "Where are you I can't see you",
        "attributes": [
            {
                "trait_type": "blogooor",
                "value": 81
            }
        ]
    },
    "greg": {
        "description": "If soup was a picture, it would be this",
        "attributes": [
            {
                "trait_type": "spelling",
                "value": 12
            }
        ]
    },
    "Hob": {
        "description": "Hob, Ron, Carmelo, no matter what you call him we all love him",
        "attributes": [
            {
                "trait_type": "mets",
                "value": 100
            }
        ]
    },
    "Jrein": {
        "description": "a young jrein, boy is he cute",
        "attributes": [
            {
                "trait_type": "Cuteness",
                "value": 100
            }
        ]
    },
    "Mams": {
        "description": "Feel better mams :(",
        "attributes": [
            {
                "trait_type": "Wealth",
                "value": 91
            }
        ]
    },
    "Mike": {
        "description": "the international man of mystery",
        "attributes": [
            {
                "trait_type": "swing",
                "value": 88
            }
        ]
    },
    "Mrinal": {
        "description": "look at the swag mrinal has",
        "attributes": [
            {
                "trait_type": "Cure_Cancer",
                "value": 0
            }
        ]
    },
    "Pete": {
        "description": "thumbs up if you like this",
        "attributes": [
            {
                "trait_type": "groupme",
                "value": 2
            }
        ]
    },
    "Ryder": {
        "description": "nice weiner dog with a nice smile",
        "attributes": [
            {
                "trait_type": "improv",
                "value": 68
            }
        ]
    },
    "Semen": {
        "description": "Wait, what was Paul calling you?",
        "attributes": [
            {
                "trait_type": "ankles",
                "value": 12
            }
        ]
    },
    "Sergio": {
        "description": "The most handsome feller I've ever seen",
        "attributes": [
            {
                "trait_type": "weiner_size",
                "value": 7
            }
        ]
    },
    "Willie": {
        "description": "wildcard bitches",
        "attributes": [
            {
                "trait_type": "drunk",
                "value": 89
            }
        ]
    },
    "Will": {
        "description": "The one that got away",
        "attributes": [
            {
                "trait_type": "links",
                 "value": 99
            }
        ]
    },
}

metadata_list = []


for image_name, info in image_info.items():
    image_file = os.path.join(IMAGE_FOLDER_PATH, f"{image_name.lower()}.jpeg")
    image_hash = pin_file_to_pinata(image_file)
    image_url = f"ipfs://{image_hash}"

    metadata = {
        "name": image_name,
        "description": info["description"],
        "image": image_url,
        "attributes": info["attributes"]
    }

    metadata_hash = pin_json_to_pinata(metadata)
    print(f"Metadata JSON IPFS hash for {image_name}: {metadata_hash}")