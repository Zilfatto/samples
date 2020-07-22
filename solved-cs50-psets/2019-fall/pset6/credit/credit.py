from cs50 import get_int

while True:
    number = int(get_int("Your card number: "))
    if number > 0:
        break
# Variables for sum of even digits and for sum of odd digits,
even_sum, odd_sum, track = 0, 0, 0
# Copy of a card number which can be changed
copy = number

while copy > 0:
    # Starting from first digit
    track += 1
    # Getting last digit of a card number
    last_digit = copy % 10
    # Deleting the last digit
    copy = copy // 10

    if track % 2 == 0:
        # All even digit must be multiplied by 2
        x = last_digit * 2
        # Getting second digit from "x"
        y = x % 10
        # Getting first digit from "x"
        x = x // 10
        # Total of all results from even digits
        even_sum += x + y
    else:
        # Total of all odd digits
        odd_sum += last_digit
# Total of all even and odd digits
total = even_sum + odd_sum
# If total is even
if total % 10 == 0:
    if ((number >= 340000000000000 and number < 350000000000000) or
            (number >= 370000000000000 and number < 380000000000000)):
        print("AMEX")
    elif (number >= 5100000000000000 and number < 5600000000000000):
        print("MASTERCARD")
    elif ((number >= 4000000000000 and number < 5000000000000) or
          (number >= 4000000000000000 and number < 5000000000000000)):
        print("VISA")
    else:
        print("INVALID")
else:
    print("INVALID")