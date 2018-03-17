from .server import application
from .api import api

application.register_blueprint(api)

if __name__ == "__main__":
    application.run(host='0.0.0.0')
