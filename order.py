
def get_order_status(order_id, responseText,db):
    print("order_id = ", order_id)
    #sql = text('SELECT item_t1.code  FROM orders item_t0 JOIN enumerationvalues0 item_t1 ON  item_t0.StatusPK = item_t1.PK WHERE  item_t0.Code :val',{'val': order_id})
    sql="SELECT item_t1.code  FROM orders item_t0 JOIN enumerationvalues0 item_t1 ON  item_t0.StatusPK = item_t1.PK WHERE item_t0.Code ='"+order_id+"'"
    result = db.engine.execute(sql)
    status=""
    for row in result:
        status=row[0]
        print(status)
    if status == "":
        return responseText
    elif status == "CONFIRMED":
        return "Your order is <strong>confirmed</strong>"
    elif status == "ACCEPTED":
        return "Your order is <strong>accepted</strong>"
    elif status == "PICK_STARTED":
        return "Your order is in <strong>transit</strong>"
    elif status == "SHIPPED":
        return "Your order has <strong>delivered</strong>"
    elif status == "CANCELLED":
        return "Your  order is <strong>cancelled</strong>"
    else:
        return "Your order status is <strong>"+status.replace("_"," ").lower()+"</strong>"
