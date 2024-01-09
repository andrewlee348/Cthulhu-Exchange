from app import create_app
import json
from pycoingecko import CoinGeckoAPI
from flask import Flask, jsonify, session, abort, redirect, request
import requests
from flask_cors import CORS  # Import the CORS module
from flask_caching import Cache
import firebase_admin
from firebase_admin import credentials, firestore, auth

app = create_app()
CORS(app)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
