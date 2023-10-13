# # Example 01
# message : str = input("Please enter your name : ")
# roll_number : str = input("Roll Number : PIAIC-")
# batch : str = input("Please enter your batch number : batch-")

# print("\n\tWelcome to student management system")
# print(f"\nHi {message}!  , Welcome to your first input ")
# print(f"\nYour roll Number : {roll_number}")
# print(f"\nYour batch Number : {batch}")

# example 02
# age : str = input("How old are you? ")

# modifyAe : int = int(age)

# print(age)

# print(modifyAe)
# print(type(modifyAe))

# # error because input value is string and cannot compare number on 
# # string values , U have to convert it to number for operations
# print(int(age) >= 18)

# (((( Example 03 ))))

# number_str = input("Enter a number, and I'll tell you if it is even or odd: ")
# number = int(number_str)

# if number % 2 == 0:
#     print(f"{number} is even.")
# else:
#     print(f"{number} is odd.")

# (((( Example 04 ))))

responses : dict = {}
# Set a flag to indicate that polling is active.
polling_active : bool = True
#User Input and while Loops
while polling_active:
    # Prompt for the person's name and response.
    name = input("\nWhat is your name? ")
    response = input("Which mountain would you like to climb someday? ")
    # Store the response in the dictionary.
    responses[name] = response
    # Find out if anyone else is going to take the poll.
    repeat = input("Would you like to let another person respond? (yes/ no) ")
    if repeat == 'no':
        polling_active = False
    # Polling is complete. Show the results.
print("\n--- Poll Results ---")
for name, response in responses.items():
    print(f"{name} would like to climb {response}.")
