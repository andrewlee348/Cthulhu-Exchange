from flask import Blueprint
import json
from flask import Flask, jsonify, session, abort, redirect, request
import requests
import firebase_admin
from firebase_admin import credentials, firestore, auth
from io import StringIO

from ..orderbook.orderbook import OrderBook, Order

authapi_bp = Blueprint('authapi_bp', __name__)

cred = credentials.Certificate("./credentials.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
user_Ref = db.collection('users')
cred_file = json.load(open("./credentials.json"))
firebase_cert_url = cred_file["client_x509_cert_url"]
response = requests.get(firebase_cert_url)
public_keys = response.json

order_book_dict:dict[str, OrderBook] = {}

# @authapi_bp.before_request
# def auth():
#   if request.endpoint in ['route2']:
#     auth_token = request.headers.get('Authorization')

#     if not auth_token:
#       return jsonify({'error': 'Unauthorized'}), 401

#     try:
#       decoded_token = firebase_admin.auth.verify_id_token(auth_token)
#       session['uid'] = decoded_token['uid']
#       session['verified'] = True
#       # request.user = decoded_token  # Attach user data to request
#     except Exception as e:
#       return jsonify({'error': str(e)}), 401
    
@authapi_bp.route('/order', methods=['POST'])
def place_order():
  body = request.get_json()
  coin = body['coin']
  order_details = body['order_details']
  if coin not in order_book_dict:
    temp = OrderBook()
    order_book_dict.update({coin:temp})
  order = Order(order_details['side'],order_details['price'],order_details['volume'],order_details['client_id'])
  order_book_dict[coin].place_order(order)
  
  order_book_dict[coin].print_book()
  
  return jsonify(message=f'order placed for {coin}', body=jsonifyPrint(order)),200

@authapi_bp.route('/order', methods=['DELETE'])
def get_order():
  body = request.get_json()
  coin = body['coin']
  order_id = body['order_id']
  order_book_dict[coin].cancel_order(order_id)
  
  order_book_dict[coin].print_book()
  
  return jsonify(message=f'order {order_id} has been cancelled'),200

def jsonifyPrint(toPrint):
  output_buffer = StringIO()
  print(toPrint, file=output_buffer)
  return output_buffer.getvalue()