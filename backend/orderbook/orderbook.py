import heapq
from datetime import datetime
from enum import Enum

class MinHeapObj(object):
  def __init__(self, order):
    self.price = order.get_price()
    self.pq = [order]
  def __lt__(self, other): return self.price < other.price
  def __eq__(self, other): return self.price == other.price
  def __str__(self): return str(self.price)
  def __repr__(self): return f"\nPrice of Queue: {self.price}\nOrders in Queue: {self.pq}"
  def push(self, order):
    self.pq.append(order)
  def pop(self):
    if len(self.pq) == 0:
      return "bruh"
    return self.pq.pop(0)
  def remove(self, orderid):
    self.pq = [obj for obj in self.pq if obj.get_order_id() != orderid]

class MaxHeapObj(MinHeapObj):
  def __lt__(self, other): return self.price > other.price
  
class MinHeap(object):
  def __init__(self): self.h = []
  def __repr__(self):
    return f"{self.h}"
  def heappush(self, order): 
    toggle = True
    for instance in self.h:
      if instance.price == order.get_price():
        instance.push(order)
        toggle = False
        break
    if toggle:
      min_heap = MinHeapObj(order)
      heapq.heappush(self.h, min_heap)
      return min_heap
  def heappop(self): return heapq.heappop(self.h)
  def __getitem__(self, i): return self.h[i].pq
  def __len__(self): return len(self.h)

class MaxHeap(MinHeap):
  def heappush(self, order): 
    toggle = True
    for instance in self.h:
      if instance.price == order.get_price():
        instance.push(order)
        toggle = False
        break
    if toggle:
      max_heap = MaxHeapObj(order)
      heapq.heappush(self.h, max_heap)
      return max_heap

class Order:
  def __init__(self, side:str, price:float, volume:float, client_id:str):
    self.__time_stamp = datetime.timestamp(datetime.now())
    self.__order_id = f"{self.__time_stamp}_{client_id}"
    # self.__order_id = client_id
    self.__side = side
    self.__price = price
    self.__volume = volume
    self.__client_id = client_id
  def __repr__(self):
    return f"(Order Id: {self.__order_id}, Side: {'BUY' if self.__side == 'BUY' else 'SELL'}, Price: {self.__price}, Volume: {self.__volume})"
  
  def get_time_stamp(self) -> float:
    return self.__time_stamp
  
  def get_order_id(self) -> str:
    return self.__order_id
  
  def get_side(self) -> str:
    return self.__side
  
  def get_price(self) -> float:
    return self.__price
  
  def get_volume(self) -> float:
    return self.__volume
  
  def sub_volume(self, volume):
    self.__volume -= volume
  
  def get_client_id(self) -> str:
    return self.__client_id

class OrderBook:
  def __init__(self):
    self.__best_ask = MinHeap()
    self.__best_bid = MaxHeap()
    self.__order_map = {}
    self.__volume_map = {}
    self.__queue_map = {}
  
  def place_order(self, order:Order):
    same_book = self.__best_bid if order.get_side() == "BUY" else self.__best_ask
    opposite_book = self.__best_ask if order.get_side() == "BUY" else self.__best_bid
    self.__order_map[order.get_order_id()] = order
    
    while order.get_volume() > 0 and len(opposite_book) != 0 and ((order.get_side() == "BUY" and opposite_book.h[0].price <= order.get_price()) or (order.get_side() == "SELL" and opposite_book.h[0].price >= order.get_price())):
      other_order:Order = opposite_book[0][0]
      
      trade_price = other_order.get_price()
      trade_volume = min(order.get_volume(),other_order.get_volume())
      
      other_order.sub_volume(trade_volume)
      order.sub_volume(trade_volume)
      
      self.__volume_map[(other_order.get_price(),other_order.get_side())] -= trade_volume
      if self.__volume_map[(other_order.get_price(),other_order.get_side())] == 0:
        self.__volume_map.pop((other_order.get_price(),other_order.get_side()))

      if other_order.get_volume() == 0:
        opposite_book[0].pop(0)
        if len(opposite_book[0]) == 0:
          opposite_book.heappop()
      
      #output payload to firebase of other_order and order volumes and prices and update existing wallet
      print(f"Made by {other_order.get_client_id()}, taken by {order.get_client_id()}, volume of {trade_volume} @ ${trade_price}")
      
    if order.get_volume() > 0:
      self.add_order_to_book(order, same_book)
    
  def add_order_to_book(self, order:Order, book):
    queue = book.heappush(order)
    if queue is not None:
      self.__queue_map[(order.get_price(),order.get_side())] = queue
    if (order.get_price(),order.get_side()) not in self.__volume_map:
      self.__volume_map[(order.get_price(),order.get_side())] = order.get_volume()
    else:
      self.__volume_map[(order.get_price(),order.get_side())] += order.get_volume()
      
  def cancel_order(self, order_id):
    if order_id in self.__order_map:
      order:Order = self.__order_map.pop(order_id)
      self.__queue_map[(order.get_price(),order.get_side())].remove(order_id)
      self.__volume_map[self.__volume_map[(order.get_price(),order.get_side())]] -= order.get_volume()
      if self.__volume_map[(order.get_price(),order.get_side())] == 0:
        self.__volume_map.pop((order.get_price(),order.get_side()))
    else:
      print(f"No order with id: {order_id}")
  
  def print_book(self):
    print("Sell Side:")
    if len(self.__best_ask) == 0:
      print("EMPTY")
    else:
      print(self.__best_ask)
    print("Buy Side:")
    if len(self.__best_bid) == 0:
      print ("EMPTY")
    else:
      print(self.__best_bid)
    # print()
    # print("Order Map:")
    # print(self.__order_map)
    print("Volume Map:")
    print(self.__volume_map)
    # print("Queue Map:")
    # print(self.__queue_map)
    # print()
      
if __name__ == '__main__':
  # ob = OrderBook()
  # ob.print_book()
  # while True:
  #   print("Please place an order:")
  #   print("Buy or Sell:")
  #   side = input()
  #   print("Price:")
  #   price = float(input())
  #   print("Volume:")
  #   volume = float(input())
  #   print("Client ID:")
  #   id = input()
  #   order = Order(side,price,volume,id)
  #   ob.place_order(order)
  #   ob.print_book()
  #   print()
  
  print("Testing")
  ob = OrderBook()
  # orders = [
  #   # BUY orders
  #   Order("BUY", 12.23, 10, "1"),
  #   Order("BUY", 12.31, 20, "2"),
  #   Order("BUY", 12.23, 5, "3"),
  #   Order("BUY", 12.25, 15, "4"),
  #   Order("BUY", 12.25, 30, "5"),
  #   Order("BUY", 12.22, 7, "6"),
  #   Order("BUY", 12.23, 3, "7"),
  #   Order("BUY", 12.25, 18, "8"),
    
  #   # SELL orders
  #   Order("SELL", 13.55, 5, "9"),
  #   Order("SELL", 13.31, 10, "10"),
  #   Order("SELL", 13.50, 2, "11"),
  #   Order("SELL", 13.45, 7, "12"),
  #   Order("SELL", 13.40, 9, "13"),
  #   Order("SELL", 13.60, 4, "14"),
  #   Order("SELL", 13.50, 8, "15"),
  #   Order("SELL", 13.55, 6, "16"),
    
  #   # Edge cases
  #   Order("BUY", 0.01, 1, "17"),
  #   Order("BUY", 0.001, 5, "18"),
  #   Order("BUY", 1000000, 0.5, "19"),
  #   Order("SELL", 999.99, 10, "20"),
  #   Order("SELL", 1000.00, 1, "21"),
  #   Order("BUY", 12.25, 0.001, "22"),
  #   Order("BUY", 12.23, 0.0001, "23"),
  #   Order("SELL", 13.31, 0.00001, "24"),
    
  #   # Large volume
  #   Order("BUY", 12.23, 10000, "25"),
  #   Order("SELL", 13.55, 5000, "26"),
    
  #   # Decimal prices and volumes
  #   Order("BUY", 12.234, 10.123, "27"),
  #   Order("BUY", 12.315, 20.456, "28"),
  #   Order("SELL", 13.556, 5.789, "29"),
    
  #   # # Negative prices
  #   # Order("BUY", -12.23, 10, "30"),
  #   # Order("BUY", -12.31, 20, "31"),
  #   # Order("SELL", -13.55, 5, "32"),
    
  #   # # Negative volumes
  #   # Order("BUY", 12.23, -10, "33"),
  #   # Order("BUY", 12.31, -20, "34"),
  #   # Order("SELL", 13.55, -5, "35"),
    
  #   # Large client IDs
  #   Order("BUY", 12.23, 10, "100000"),
  #   Order("BUY", 12.31, 20, "100001"),
  #   Order("SELL", 13.55, 5, "100002"),
  #   ]
  orders = [
    # BUY orders
    Order("SELL", 12.23, 10, "1"),
    Order("SELL", 12.31, 20, "2"),
    Order("SELL", 12.23, 5, "3"),
    Order("SELL", 12.25, 15, "4"),
    Order("SELL", 12.25, 30, "5"),
    Order("SELL", 12.22, 7, "6"),
    Order("SELL", 12.23, 3, "7"),
    Order("SELL", 12.25, 18, "8"),
    
    # SELL orders
    Order("BUY", 13.55, 5, "9"),
    Order("BUY", 13.31, 10, "10"),
    Order("BUY", 13.50, 2, "11"),
    Order("BUY", 13.45, 7, "12"),
    Order("BUY", 13.40, 9, "13"),
    Order("BUY", 13.60, 4, "14"),
    Order("BUY", 13.50, 8, "15"),
    Order("BUY", 13.55, 6, "16"),
    
    # Edge cases
    Order("SELL", 0.01, 1, "17"),
    Order("SELL", 0.001, 5, "18"),
    Order("SELL", 1000000, 0.5, "19"),
    Order("BUY", 999.99, 10, "20"),
    Order("BUY", 1000.00, 1, "21"),
    Order("SELL", 12.25, 0.001, "22"),
    Order("SELL", 12.23, 0.0001, "23"),
    Order("BUY", 13.31, 0.00001, "24"),
    
    # Large volume
    Order("SELL", 12.23, 10000, "25"),
    Order("BUY", 13.55, 5000, "26"),
    
    # Decimal prices and volumes
    Order("SELL", 12.234, 10.123, "27"),
    Order("SELL", 12.315, 20.456, "28"),
    Order("BUY", 13.556, 5.789, "29"),
    
    # # Negative prices
    # Order("SELL", -12.23, 10, "30"),
    # Order("SELL", -12.31, 20, "31"),
    # Order("BUY", -13.55, 5, "32"),
    
    # # Negative volumes
    # Order("SELL", 12.23, -10, "33"),
    # Order("SELL", 12.31, -20, "34"),
    # Order("BUY", 13.55, -5, "35"),
    
    # Large client IDs
    Order("SELL", 12.23, 10, "100000"),
    Order("SELL", 12.31, 20, "100001"),
    Order("BUY", 13.55, 5, "100002"),
    ]
  
  for order in orders:
    ob.place_order(order)
  ob.print_book()
  # ob.cancel_order("5")
  # ob.print_book()