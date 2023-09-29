from pycoingecko import CoinGeckoAPI
from flask import Flask, jsonify
from flask_cors import CORS  # Import the CORS module

app = Flask(__name__)
CORS(app)

cg = CoinGeckoAPI()


@app.route('/')
def hello():
    return jsonify(message='Hello, World!')


@app.route('/get_allcrypto')
def get_allcrypto():
    try:
        data = cg.get_coins_markets(vs_currency='usd')
        return data, 200

    except Exception as e:
        return {'error': str(e)}, 500  # Handle exceptions

# @app.route('/coins/{:id}/history')
# def get_allcrypto():
#   try:
#     data = cg.get_coins_markets(vs_currency='usd')
#     return data, 200

#   except Exception as e:
#     return {'error': str(e)}, 500  # Handle exceptions


if __name__ == '__main__':
    app.run(debug=True, port=5000)
