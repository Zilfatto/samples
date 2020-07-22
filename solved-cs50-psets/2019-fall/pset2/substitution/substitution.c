#include <stdio.h>
#include <cs50.h>
#include <string.h>
#include <ctype.h>

int main(int argc, string argv[])
{
    // If the user provided not 2 arguments
    if (argc != 2)
    {
        printf("Usage: ./substitution\n");
        return 1;
    }

    int n = strlen(argv[1]);
    // There must be only 26 letters of the alphabet
    if (n != 26)
    {
        printf("Wrong number of characters\n");
        return 1;
    }
    // Making sure that there is no anything except letters and there are not the same letters
    for (int i = 0; i < n; i++)
    {
        if ((argv[1][i] < 'A') || (argv[1][i] > 'Z' && argv[1][i] < 'a') || (argv[1][i] > 'z'))
        {
            printf("Only letters\n");
            return 1;
        }
        else
        {
            for (int j = 0; j < i; j++)
            {
                if ((argv[1][i] == argv[1][j]) || (argv[1][i] == argv[1][j] - 32) || (argv[1][i] == argv[1][j] + 32))
                {
                    printf("Twice typed the same letter\n");
                    return 1;
                }
            }
        }
    }
    // Getting a plain text from the user
    string s = get_string("plaintext: ");

    printf("ciphertext: ");
    // Scrambling
    int x;
    // Iterating over each character in a plain text
    for (int i = 0, z = strlen(s); i < z; i++)
    {
        // Uppercase letter must be staing upper
        if (s[i] >= 'A' && s[i] <= 'Z')
        {
            x = s[i] - 65;
            s[i] = argv[1][x];
            if (islower(argv[1][x]))
            {
                s[i] -= 32;
            }
        }
        // Lowercase letter must be staing lower
        else if (s[i] >= 'a' && s[i] <= 'z')
        {
            x = s[i] - 97;
            s[i] = argv[1][x];
            if (isupper(argv[1][x]))
            {
                s[i] += 32;
            }
        }
    }
    // Printing out the scrambled text
    printf("%s\n", s);
}