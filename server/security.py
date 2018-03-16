# pyUmbral encryption script
# https://github.com/nucypher/pyUmbral
# invoked from nodejs server.
import sys

from umbral import pre, keys, config
from nucypher import MockNetwork

# Setup pyUmbral
config.set_default_curve()
mock_kms = MockNetwork()

def encrypt_and_save(file_content, filename, public_key):
    # Convert to UTF-8 bytes if not already in bytes format.
    if not isinstance(file_content, (bytes, bytearray)):
        file_content = str(file_content).encode('utf-8')

    # TODO: pass keys in as params.
    priv_key = keys.UmbralPrivateKey.gen_key()
    pub_key = priv_key.get_pubkey()

    # Encrypt file data with public key.
    ciphertext, capsule = pre.encrypt(pub_key, file_content)

    # Save file locally on the server.
    # TODO: can use external (nonlocal) service such as S3 for storing/retrieving encrypted files.
    bytes_written = 0
    with open(filename, 'wb') as f:
        bytes_written = f.write(ciphertext)

    print('wrote %d bytes to %s' % (bytes_written, filename))

def decrypt_and_return(fileName, private_key, public_key):
    # Decrypt data with Alice's private key.
    with open(fileName, 'rb') as f:
        ciphertext = f.read()
        cleartext = pre.decrypt(capsule, private_key, ciphertext, alices_public_key)
        print(cleartext)

argv = sys.argv[1:]
command = argv[0]

# TODO: add other security commands and error checking.
if command == 'encrypt':
    encrypt_and_save(argv[1], argv[2], argv[3])
else:
    print('undefined')

