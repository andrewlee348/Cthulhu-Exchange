from flask import Flask
from flask_caching import Cache

app = Flask(__name__)

cache = Cache(app = Flask(__name__), config={'CACHE_TYPE': 'simple'})

class Config:
  debug=True
  port=5000

def create_app(config_class=Config):
  app = Flask(__name__)
  app.config.from_object(config_class)
  cache.init_app(app)
  
  # Blueprints
  from app.routes.authapi import authapi_bp
  from app.routes.publicapi import publicapi_bp
  
  # from app.orderbook.orderbook import orderbook_bp
  
  app.register_blueprint(authapi_bp)
  app.register_blueprint(publicapi_bp)
  
  # app.register_blueprint(orderbook_bp)
  
  return app