from cs50 import get_float

while True:
    cash = get_float("Change owed: ")
    if cash > 0:
        break
# Converting Dollars into pennies
total = round(cash * 100)
# The number of coins that needs to hand to the customer
# By 25 cents
coins = total // 25
total %= 25
# By 10 cents
coins += total // 10
total %= 10
# By 5 cents
coins += total // 5
total %= 5
# By 1 cents
coins += total

print(coins)