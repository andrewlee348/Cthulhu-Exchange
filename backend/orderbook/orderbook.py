import heapq
from datetime import datetime

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
  def __init__(self, is_bid, price, volume, client_id):
    self.__time_stamp = datetime.timestamp(datetime.now())
    # self.__order_id = f"{self.__time_stamp}_{client_id}"
    self.__order_id = client_id
    self.__is_bid = is_bid
    self.__price = price
    self.__volume = volume
    self.__client_id = client_id
  def __repr__(self):
    return f"(Order Id: {self.__order_id}, Side: {'Buy' if self.__is_bid else 'Sell'}, Price: {self.__price}, Volume: {self.__volume})"
  
  def get_time_stamp(self) -> float:
    return self.__time_stamp
  
  def get_order_id(self) -> str:
    return self.__order_id
  
  def get_is_bid(self) -> bool:
    return self.__is_bid
  
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
    same_book = self.__best_bid if order.get_is_bid() == True else self.__best_ask
    opposite_book = self.__best_ask if order.get_is_bid() == True else self.__best_bid
    self.__order_map[order.get_order_id()] = order
    
    while order.get_volume() > 0 and len(opposite_book) != 0 and ((order.get_is_bid() and opposite_book.h[0].price <= order.get_price()) or (not order.get_is_bid() and opposite_book.h[0].price >= order.get_price())):
      print("WHY")
      other_order:Order = opposite_book[0][0]
      
      trade_price = other_order.get_price()
      trade_volume = min(order.get_volume(),other_order.get_volume())
      
      other_order.sub_volume(trade_volume)
      order.sub_volume(trade_volume)

      if other_order.get_volume() == 0:
        print("HI")
        opposite_book[0].pop(0)
        self.__volume_map[(other_order.get_price(),other_order.get_is_bid())] -= trade_volume
      
      print(f"Made by {other_order.get_client_id()}, taken by {order.get_client_id()}, volume of {trade_volume} @ ${trade_price}")
      
    if order.get_volume() > 0:
      self.add_order_to_book(order, same_book)
    
  def add_order_to_book(self, order:Order, book):
    queue = book.heappush(order)
    if queue is not None:
      self.__queue_map[(order.get_price(),order.get_is_bid())] = queue
    if (order.get_price(),order.get_is_bid()) not in self.__volume_map:
      self.__volume_map[(order.get_price(),order.get_is_bid())] = order.get_volume()
    else:
      self.__volume_map[(order.get_price(),order.get_is_bid())] += order.get_volume()
      
  def cancel_order(self, order_id):
    if order_id in self.__order_map:
      order:Order = self.__order_map.pop(order_id)
      self.__queue_map[(order.get_price(),order.get_is_bid())].remove(order_id)
      self.__volume_map[self.__volume_map[(order.get_price(),order.get_is_bid())]] -= order.get_volume()
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
  print("Testing")
  ob = OrderBook()
  # orders = [Order(True, 12.23, 10, "1"),
  #           Order(True, 12.31, 20, "2"),
  #           Order(False, 13.55, 5, "3"),
  #           Order(True, 12.23, 5, "4"),
  #           Order(True, 12.25, 15, "5"),
  #           Order(False, 13.31, 5, "6"),
  #           Order(True, 12.25, 30, "7"),
  #           Order(False, 13.31, 5, "8")]
  orders = [Order(True,10,10,"3"),
            Order(False,10,10,"2"),
            ]
  
  for order in orders:
    ob.place_order(order)
  ob.print_book()
  # ob.cancel_order("5")
  # ob.print_book()