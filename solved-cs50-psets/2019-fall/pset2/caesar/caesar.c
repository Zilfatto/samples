#include <stdio.h>
#include <cs50.h>
#include <string.h>

int main(int argc, string argv[])
{
    if (argc != 2)
    {
        printf("Wrong...\n");
        return 1;
    }

    int n = strlen(argv[1]);

    // Making sure that input is a number
    for (int i = 0; i < n; i++)
    {
        if ((argv[1][i] < '0') || (argv[1][i] > '9'))
        {
            printf("Usage: ./caesar key\n");
            return 1;
        }
    }

    n -= 1;
    int key = 0;
    // Converting a string input into an integer
    for (int z = 1; n >= 0; z *= 10, n--)
    {
        key += (argv[1][n] - 48) * z;
    }
    // Key must be between the range of all letters
    key %= 26;
    if (key == 0)
    {
        printf("Unscrambling...");
        return 1;
    }

    // Prompting the user for a plaintext
    string s = get_string("plaintext: ");

    printf("ciphertext: ");
    // Scrambling
    for (int i = 0, v = strlen(s); i < v; i++)
    {
        if (s[i] >= 'A' && s[i] <= 'Z')
        {
            s[i] += key;
            if (s[i] > 'Z')
            {
                s[i] -= 26;
            }
        }
        else if (s[i] >= 'a' && s[i] <= 'z')
        {
           s[i] += key;
            if (s[i] < 'a' || s[i] > 'z')
            {
                s[i] -= 26;
            }
        }
    }
    printf("%s\n", s);
    return 0;
}