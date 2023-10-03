from pycoingecko import CoinGeckoAPI
from flask import Flask, jsonify
from flask_cors import CORS  # Import the CORS module
from flask_caching import Cache

app = Flask(__name__)
CORS(app)

cache = Cache(app, config={'CACHE_TYPE': 'simple'})

cg = CoinGeckoAPI()


@app.route('/')
def hello():
    return jsonify(message='Hello, World!')


@app.route('/get_allcrypto')
@cache.cached(timeout=600)
def get_allcrypto():
    cached_data = cache.get('data')  # Attempt to fetch data from cache
    if cached_data is not None:
        return jsonify(cached_data)  # Return cached data if available

    try:
        data = cg.get_coins_markets(vs_currency='usd')[:10]
        cache.set('data', data)  # Store the API response in the cache
        return data, 200

    except Exception as e:
        return {'error': str(e)}, 500  # Handle exceptions


@app.route('/coins/<string:id>', methods=['GET'])
def get_coin_details(id):
    try:
        pageData = cg.get_coin_by_id(id)
        graphData = cg.get_coin_market_chart_by_id(id, 'usd', 30)
        pointsData = [{
            'data': list(map(lambda x: x, graphData["prices"][:-1])),
            'name': "bitcoin"
        }]
        # pointsData = [
        # {
        #     'name': "Revenue",
        #     'data': [55, 64, 48, 66, 49, 68, 50],
        # }
        # ]
        return [pageData, pointsData], 200
    except Exception as e:
        return {'error': str(e)}, 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
