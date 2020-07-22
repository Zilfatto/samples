#include <cs50.h>
#include <stdio.h>
#include <math.h>

int main(void)
{
    long number;
    do
    {
        number = get_long("Your card number: ");
    }
    while (number <= 0);

    // Variables for sum of even digits and for sum of odd digits,
    int even_sum = 0, odd_sum = 0, track = 0;

    // Sum of all even and odd digits
    int total, last_digit;

    // Copy of a card number which can be changed
    long num_copy = number;

    while (num_copy > 0)
    {
        // Starting from first digit
        track++;
        // Getting last digit of a card number
        last_digit = num_copy % 10;
        // Deleting the last digit
        num_copy /= 10;

        if (track % 2 == 0)
        {
            // All even digit must be multiplied by 2
            int x = last_digit * 2;
            // Getting second digit from "x"
            int y = x % 10;
            // Getting first digit from "x"
            x /= 10;
            // Total of all results from even digits
            even_sum += y + x;
        }
        else
        {
            // Total of all odd digits
            odd_sum += last_digit;
        }
    }
    // Total of all even and odd digits
    total = even_sum + odd_sum;

    if (total % 10 == 0)
    {
        if ((number >= 340000000000000 && number < 350000000000000) ||
            (number >= 370000000000000 && number < 380000000000000))
        {
            printf("AMEX\n");
        }
        else if (number >= 5100000000000000 && number < 5600000000000000)
        {
            printf("MASTERCARD\n");
        }
        else if ((number >= 4000000000000 && number < 5000000000000) ||
                 (number >= 4000000000000000 && number < 5000000000000000))
        {
            printf("VISA\n");
        }
        else
        {
            printf("INVALID\n");
        }
    }
    else
    {
        printf("INVALID\n");
    }
}
