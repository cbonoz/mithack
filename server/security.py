# pyUmbral encryption script
# https://github.com/nucypher/pyUmbral
# invoked from nodejs server.


from umbral import umbral, keys

def encrypt_and_save(file, filename, public_key):
    # TODO: determine where to retrieve this data.
    # Generate umbral keys for Alice.
    alices_private_key = keys.UmbralPrivateKey.gen_key()
    alices_public_key = private_key.get_pubkey()

    # Encrypt file data with Alice's public key.
    # plaintext = b'Proxy Re-encryption is cool!'
    ciphertext, capsule = umbral.encrypt(alices_public_key, file)
    # TODO: save to external (nonlocal) service such as S3.
    with open(filename, 'w') as f:
        f.write(ciphertext)
    return 'wrote %s' % filename



def decrypt_and_return(fileName, private_key, public_key):
    # Decrypt data with Alice's private key.
    cleartext = umbral.decrypt(capsule, alices_private_key,
                               ciphertext, alices_public_key)

    return cleartext


