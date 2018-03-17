# pyUmbral encryption script
# https://github.com/nucypher/pyUmbral
# invoked from nodejs server.
import pickle
import sys

from nucypher import MockNetwork
from umbral import pre, keys, config

UNDEFINED_MESSAGE = "command undefined"
DEST_FOLDER = "uploads"

# Setup pyUmbral
config.set_default_curve()
mock_kms = MockNetwork()

def encrypt_and_save(file_content, filename, key):
    # Convert to UTF-8 bytes if not already in bytes format.
    try:
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
        with open("%s/%s" % (DEST_FOLDER, filename), 'wb') as f:
            bytes_written = f.write(ciphertext)

        capsule_written = 0
        with open("%s/capsule_%s" % (DEST_FOLDER, filename), 'wb') as f:
            capsule_written = f.write(str(capsule).encode())

        print('wrote %d encrypted bytes to %s, with %d capsule bytes' % (bytes_written, filename, capsule_written))
    except Exception as e:
        print(e)

def decrypt_and_return(filename, private_key, public_key):
    # Use the encrypted file and capsule to decrypt.
    try:
        with open(filename, 'rb') as f:
            capsule_file = "capsule_" + filename;
            with open(capsule_file, 'rb') as f2:
                capsule = f2.read().fromBytes()
                ciphertext = f.read()
                cleartext = pre.decrypt(capsule, private_key, ciphertext, public_key)
                print(cleartext)
    except Exception as e:
        print(e)

def reproxy_data(owner_public_key, owner_private_key, target_public_key, plaintext):
    # Create a new proxy private key for the owner of the target address on the given file.
    ciphertext, capsule = pre.encrypt(owner_public_key, plaintext)

    # Perform split-rekey and grant re-encryption policy
    frags = pre.split_rekey(owner_private_key, target_public_key, 10, 20)

    policy_id = mock_kms.grant(frags)

    # Perform re-encryption request
    target_frags = mock_kms.reencrypt(policy_id, capsule, 10)

    target_capsule = capsule
    for cfrag in target_frags:
        target_capsule.attach_cfrag(cfrag)

    # decrypted_data = pre.decrypt(target_capsule, target_private_key, ciphertext, owner_public_key)
    print(target_capsule)

# Retrieve the parameters from the subprocess call
if len(sys.argv) < 2:
    # p = pickle.Pickler()
    priv_key = keys.UmbralPrivateKey.gen_key()
    pub_key = priv_key.get_pubkey()

    print('test keys:')
    print(priv_key)
    print(pub_key)
    print('Usage: security.py <command> <args...>')
    sys.exit()

argv = sys.argv[1:]
command = argv[0]

if command == 'encrypt':
    encrypt_and_save(argv[1], argv[2], argv[3])
elif command == 'decrypt':
    decrypt_and_return(argv[1], argv[2], argv[3])
elif command == 'proxy':
    reproxy_data(argv[1], argv[2], argv[3], argv[4], argv[5])
else:
    print(COMMAND_UNDEFINED)



