
# # Example 01
# def great_user(username : str):
#     print(f"Hello, {username}! ")

# great_user("Aqeel Shahzad")

# # Exercise 01
# def display_message (learning : str):
#     print(f"What are you learning in this chapter? : {learning}")

# display_message("Functions")

# # Exercise 02
# def favorite_book (title : str):
#     print("""One of the my favorite book is : {}""".format(title))

# favorite_book("Alice in Wonderland")

# Positional Arguments

# def describe_pet (pet_name : str,animal_type = "dog"):
#     print(f"\nI have a {animal_type}")
#     print(f"My {animal_type} name is {pet_name.title()}.")

# describe_pet(pet_name="willie")


# from typing import Optional

# def make_shirt(size: Optional[str] = "L", message: Optional[str] = "I love Python"):
#   """Prints a message about the size and message on a shirt."""
#   print(f"\nThe size of the shirt is {size.capitalize()}.")
#   print(f"The message on the shirt is '{message.title()}'.")

# make_shirt()
# # making shirt of medium size
# make_shirt(size='M')

# make_shirt(message="i love c++")

# def describe_city (city_name : str , country : str = "Pakistan") :
#     print(f"{city_name} is in {country}")

# describe_city("Lahore")
# describe_city("Islamabad")
# describe_city("Karachi")


# # returning simple value 

# def get_formatted_name (fname : str , lname : str) -> str:
#     full_name = f"{fname} {lname}"

#     return full_name.title()

# myname = get_formatted_name("AqeEl","sHahZaD")
# print(myname)

# making a middle name optional


# from typing import Optional

# def get_formatted_name(fname: str, mname: Optional[str], lname: str) -> str:
#   """Returns a formatted full name, including the middle name if provided."""
#   full_name = f"{fname} {(mname or '')} {lname}"
#   return full_name.title()


# myname = get_formatted_name("AqeEl", "sHahZaD", "kHaN")
# print(myname)

# from typing import Optional 

# def get_formatted_name (fname : str, mname :Optional[str]  , lname : str) -> str:
   
#     full_name = f"{fname} {(mname or '')} {lname}"

#     return full_name.title()

# myname = get_formatted_name("AqeEl","sHahZaD","kHaN")
# print(myname)

# from typing import Union

# def get_formatted_name (fname : str  , lname : str, mname: str | None ) -> str:
   
#     full_name = f"{fname} {mname} {lname}"

#     return full_name.title()

# myname = get_formatted_name("AqeEl","sHahZaD","kHaN")
# missing_middle_name = get_formatted_name("AqeEl","sHahZaD")

# print(myname)
# print(missing_middle_name)

# def get_formatted_name(fname: str, lname: str, mname: str | None) -> str:
#   """Returns a formatted full name, including the middle name if provided."""
#   full_name = f"{fname} {mname} {lname}"

#   return full_name.title()

# # Call the function with the middle name.
# myname = get_formatted_name("AqeEl", "ShahZaD", "Khan")

# # Call the function without the middle name.
# missing_middle_name = get_formatted_name("AqeEl", "ShahZaD")

# print(myname)
# print(missing_middle_name)


# returning a dictionary

# def build_pserson (fname : str, lname : str, age : [int,None]=None) -> dict[str,str]:
#     person = { 'first' : fname , 'last' : lname }
#     if age : 
#       person['age'] = age
#     return person

# musician = build_pserson('jimi','hendrix')
# print(musician)

# returning a dictionary


# def build_person(fname: str, lname: str, age: int = 0) -> dict[str, str]:
#     """Builds a dictionary representing a person.

#     Args:
#         fname: The person's first name.
#         lname: The person's last name.
#         age: The person's age (default: 0).

#     Returns:
#         A dictionary representing the person.
#     """

#     person = {"first": fname, "last": lname}
#     if age:
#         person["age"] = age 
#     return person


# musician = build_person("jimi", "hendrix",23)
# print(musician)

# print(f"\nThe musician's name is {musician['first']} {musician['last']} and age is {musician.get('age', 0)}.")



# def get_formatted_name(fname: str, lname: str) -> dict[str,str]:
#   """Returns a formatted full name, including the middle name if provided."""
  
#   full_name = {"first": fname, "last": lname}

#   return full_name
# while True : 
#   print("\nPlease tell me your name : ")
#   f_name = input("First name : ")
#   l_name = input("Last name : ")

#   formated_name = get_formatted_name(f_name, l_name)
  
#   print(f"Hello, {formated_name}")

# def city_country (city_name : str , country_name : str):
#     print(f'''{city_name.title(), country_name.title()}''')

# city_country("santiAgO","chIlE")


# def make_album(artist_name: str, album_title: str, number_of_songs: int = None) -> dict[str, str]:

#     print("Please enter album detail")
#     album = {}
#     album["artist_name"] = artist_name
#     album["album_title"] = album_title

#     if number_of_songs is not None:
#         album["number_of_songs"] = number_of_songs

#     return album


# while True:
#     artist_name = input("Enter artist name: ")
#     if artist_name == "quit":
#         break

#     album_title = input("Enter album title: ")
#     if album_title == "quit":
#         break

#     number_of_songs = input("Enter number of songs: ")
#     if number_of_songs == "quit":
#         break

#     ready_album = make_album(artist_name, album_title, int(number_of_songs))
#     print(f"\nThe album is:\n{ready_album}")

       


# def greet_users(names : list[str] ) :
#     for name in names :
#         msg = f"Hello, {name.title()}"
#         print(msg)

# usernames = ["hannah","ty","margot"]

# greet_users(usernames)

# def send_messages(list_messages : list[str], recieve_messages : list[str]) : 
#     while list_messages:
#         sent_message = list_messages.pop()
#         print(f"\nMessage, '{sent_message}' has been sent successfully")
#         recieve_messages.append(sent_message)


# def recieve_messages (sent_messages : list[str]):
#     for recieve_message in sent_messages:
#         print(f"Message, {recieve_message} recived successfully")

# messages : list[str] = ["I love Python","I love c++","great somehow"]
# recieved_messages : list[str] = [] # 
# send_messages(messages , recieved_messages)
# recieve_messages(recieved_messages)


# def make_pizza(size : int , *toppings : str) -> None:
#     print(f"\nMaking {size}-inch pizza with the following toppins.")
#     for topping in toppings : 
#         print(f"- {topping}")
# make_pizza(16,'pepperoni')
# make_pizza(12,'mushrooms', 'green peppers', 'extra cheese')

# def build_profile(first : str, last : str, **user_info : str) -> dict[str,str]:
#     user_info['first_name'] = first
#     user_info['last_name'] = last
#     return user_info
# user_profile = build_profile('albert', 'einstein', location='princeton', field='physics')
# print(user_profile)


# def make_car(manufacturer: str, model_name: str, **more_info: str) -> dict[str,str]:
#     car_info = {
#         'manufacturer': manufacturer,
#         'model_name': model_name,
#     }
#     car_info.update(more_info)
#     print(car_info)
#     return car_info

# car = make_car('subaru', 'outback', color='blue', tow_package="True")
# print(car)
# print()


import math

# Test the function 01
def calculate_area(radius : int) -> float:
    """Calculate the area of a circle given its radius."""
    area = math.pi * radius ** 2
    return area

# Test the function
circle_radius = 5
circle_area = calculate_area(circle_radius)
print(f"The area of a circle with radius {circle_radius} is {circle_area:.2f}")

def celsius_to_fahrenheit(celsius : int) -> float:
    """Convert temperature from Celsius to Fahrenheit."""
    fahrenheit = (celsius * 9/5) + 32
    return fahrenheit

# Test the function 02
celsius_temp = 25
fahrenheit_temp = celsius_to_fahrenheit(celsius_temp)
print(f"{celsius_temp} degrees Celsius is equal to {fahrenheit_temp:.1f} degrees Fahrenheit")

# Test the function 03
def find_maximum(numbers : list[int]) -> int | None :
    """Find the maximum number from a list of numbers."""
    if not numbers:
        return None
    max_number = numbers[0]
    for number in numbers:
        if number > max_number:
            max_number = number
    return max_number

# Test the function
number_list = [10, 5, 27, 14, 8]
maximum_number = find_maximum(number_list)
print(f"The maximum number in {number_list} is {maximum_number}")



