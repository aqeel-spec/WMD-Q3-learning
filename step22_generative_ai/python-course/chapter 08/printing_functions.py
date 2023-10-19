
from pizza import make_pizza


import os

def clear():
    os.system("cls || clear")

i = 0
def printing_model ():
    # clear()
    global i
    i += 1
    print(f"\nThis is the printing model : {i}")
    make_pizza(16, 'pepperoni')
    make_pizza(12, 'mushrooms', 'green peppers', 'extra cheese')


