#handle a POST request
from flask import Flask, render_template, request, url_for, jsonify
import json
app = Flask(__name__)
# pyUmbral encryption script
# https://github.com/nucypher/pyUmbral
# invoked from nodejs server.
import sys

from nucypher import MockNetwork
from umbral import pre, keys, config

UNDEFINED_MESSAGE = "command undefined"

# Setup pyUmbral
config.set_default_curve()
mock_kms = MockNetwork()

def encrypt_and_save(file_content, file_name, key):
    # Convert to UTF-8 bytes if not already in bytes format.
    # if not isinstance(file_content, (bytes, bytearray)):
    #     file_content = str(file_content).encode('utf-8')

    # TODO: pass keys in as params.
    priv_key = keys.UmbralPrivateKey.gen_key()
    pub_key = priv_key.get_pubkey()

    # Encrypt file data with public key.
    ciphertext, capsule = pre.encrypt(pub_key, file_content)

    # Save file locally on the server.
    # TODO: can use external (nonlocal) service such as S3 for storing/retrieving encrypted files.
    bytes_written = 0
    # if '.' in file_name:
    #     file_name = file_name.split('.')[0]
    with open('uploads/%s' % file_name, 'wb') as f:
        bytes_written = f.write(ciphertext)

    return 'wrote %d bytes to %s' % (bytes_written, file_name)

def decrypt_and_return(fileName, private_key, public_key):
    # Decrypt data with Alice's private key.
    try:
        with open(fileName, 'rb') as f:
            ciphertext = f.read()
            cleartext = pre.decrypt(capsule, private_key, ciphertext, alices_public_key)
            return cleartext, None
    except Exception as e:
        return None, e

def create_proxy_key(private_key):
    # TODO: implement.
    print(COMMAND_UNDEFINED)

# # Retrieve the parameters from the subprocess call
# argv = sys.argv[1:]
# command = argv[0]

# if command == 'encrypt':
#     encrypt_and_save(argv[1], argv[2], argv[3])
# elif command == 'decrypt':
#     decrypt_and_return(argv[1], argv[2], argv[3])
# elif command == 'proxy':
#     create_proxy_key(argv[1])
# else:
#     print(COMMAND_UNDEFINED)

@app.route('/api/encrypt', methods=['POST'])
def encrypt():
    try:
        data = json.loads(request.data)
        # print('encrypt', str(data))
        file_content = data['fileContent']
        file_name = data['fileName']
        key = data['key']
        print('encrypt', file_content, file_name, key)
        # TODO: has problem with bytes.
        res = encrypt_and_save(file_content, file_name, key)
        return jsonify(res)
    except Exception as e:
        return jsonify(e)

if __name__ == '__main__':
    app.run(debug=True, port=9002)

