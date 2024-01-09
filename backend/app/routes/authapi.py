from flask import Blueprint
import json
from flask import Flask, jsonify, session, abort, redirect, request
import requests
import firebase_admin
from firebase_admin import credentials, firestore, auth

authapi_bp = Blueprint('authapi_bp', __name__)

cred = credentials.Certificate("./credentials.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
user_Ref = db.collection('users')
cred_file = json.load(open("./credentials.json"))
firebase_cert_url = cred_file["client_x509_cert_url"]
response = requests.get(firebase_cert_url)
public_keys = response.json

@authapi_bp.before_request
def auth():
  if request.endpoint in ['route2']:
    auth_token = request.headers.get('Authorization')

    if not auth_token:
      return jsonify({'error': 'Unauthorized'}), 401

    try:
      decoded_token = firebase_admin.auth.verify_id_token(auth_token)
      session['uid'] = decoded_token['uid']
      session['verified'] = True
      # request.user = decoded_token  # Attach user data to request
    except Exception as e:
      return jsonify({'error': str(e)}), 401