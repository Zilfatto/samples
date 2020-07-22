#include <cs50.h>
#include <math.h>
#include <stdio.h>

int main(void)
{
    // Promt the customer for how much change a cashier ows a customer
    float cash;
    do
    {
        cash = get_float("Change owed: ");
    }
    while (cash <= 0);
    // Converting Dollars into pennies
    int total = round(cash * 100);

    // The number of coins that needs to hand to the customer
    int coins = 0;
    // By 25 cents
    coins += total / 25;
    total = total % 25;
    // By 10 cents
    coins += total / 10;
    total = total % 10;
    // By 5 cents
    coins += total / 5;
    total = total % 5;
    // By 1 cents
    coins += total;

    printf("%i\n", coins);
}
