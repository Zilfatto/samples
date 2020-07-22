#include <cs50.h>
#include <stdio.h>
// Creating a pyramid of a given height
int main(void)
{
    int n;
    do
    {
        n = get_int("Height between 1 and 8: ");
    }
    while (n < 1 || n > 8);
    for (int j = 0; j < n; j++)
    {
        for (int k = 1 + j; k < n; k++)
        {
            printf(" ");
        }
        for (int i = -1; i < j; i++)
        {
            printf("#");
        }
        printf("\n");
    }
}
