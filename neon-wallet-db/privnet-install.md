Note: This is a complete solution. It expects you're not already running the privnet docker image. It will set up a new one.

[Also available using a prebuilt image here: https://gist.github.com/slipo/f18f1a0b5e6adb7b0bf172b93379d891]

Build and start up the container
```
docker-compose build && docker-compose up
```

If you already have neo-privnet running, it's recommended to just stop/remove it and run the command above. If you really don't want to do that, you can delete the neo-privnet container and neo-privnet links in the compose file. Then run:

```
docker-compose build && docker-compose up
docker network create privnet
docker network connect privnet neo-privnet
docker network connect privnet neon-wallet-db
```

Either way, next step is to add this line to your hosts file:
```
127.0.0.1 neo-privnet
```

It'll take a bit of time to fully initialize but you can now confirm it's working
```
root@69f0fde7af50:/# curl http://127.0.0.1:5000/v2/network/nodes
{
  "net": "private",
  "nodes": [
    {
      "block_height": 70,
      "status": true,
      "time": 0.013408660888671875,
      "url": "http://neo-privnet:30333"
    },
    {
      "block_height": 70,
      "status": true,
      "time": 0.008440256118774414,
      "url": "http://neo-privnet:30334"
    },
    {
      "block_height": 70,
      "status": true,
      "time": 0.02714824676513672,
      "url": "http://neo-privnet:30335"
    },
    {
      "block_height": 70,
      "status": true,
      "time": 0.007632017135620117,
      "url": "http://neo-privnet:30336"
    }
  ]
}
```
