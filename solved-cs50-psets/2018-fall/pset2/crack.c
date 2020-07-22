#define _XOPEN_SOURCE
#include <stdio.h>
#include <cs50.h>
#include <crypt.h>
#include <ctype.h>
#include <stdbool.h>
#include <string.h>
#include <unistd.h>

int stop = 0;
bool found = false;
int max = 5;

void find(char *s, char t[], int count, char salt[]);

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        printf("Usage: ./crack hash\n");
        return 1;
    }

    // Some passwords may be words, so it will be faster to find them by using dictionary
    FILE *file = fopen("dictionary/large", "r");
    if (file == NULL)
    {
        return false;
    }
    // Random number except -1 or any other negative ones
    int t = 5;
    // A storage for a word from the dictionary
    char s[45];
    char p[45];

    // Determining the salt in hash encryption
    char salt[2] = {argv[1][0], argv[1][1]};

    while (t != EOF)
    {
        // For tracking the end of a file
        t = fscanf(file, "%s", s);

        // Comparing an encrypted word with a given argument
        if (!strcmp(crypt(s, salt), argv[1]))
        {
            printf("%s\n", s);
            return 0;
        }

        // Converting a word to uppercase
        for (int i = 0, j = strlen(s); i < j; i++)
        {
            s[i] = toupper(s[i]);
        }

        // One mo comparison with an argument
        if (!strcmp(crypt(s, salt), argv[1]))
        {
            printf("%s\n", s);
            return 0;
        }
    }
    fclose(file);
    // If there was no match, to continue find among all combination of characters
    // A max number of characters among which to find
    int n = 5;

    // A starage for combinations of characters
    char array[n + 1];

    // The end of a string
    array[n] = 0;
    // For comparing up to certain character
    int count = 0;

    find(argv[1], array, count, salt);

    if (!found)
    {
        printf("Password could not be cracked.\n");
    }
    return 0;
}

void find(char *s, char *t, int count, char *salt)
{
    // Up to 5 characters and not included, because counting from 0
    if (count >= max)
    {
        return;
    }
    // Compare in range of A-Z and a-z
    for (int i = 65; i < 123; i++)
    {
        if (i == 91)
        {
            i += 6;
        }
        // Assign a letter to current (according to count) position
        t[count] = i;
        // For assigning a letter to the next position of an array
        find(s, t, count + 1, salt);

        // Compare only the last called function in which all 5 letters are filled
        if (count == max - 1)
        {
            // In order to compare 1, 2, 3, 4 and 5 letters in an array
            for (int j = 0; j < max; j++)
            {
                if (!strcmp(crypt(t + j, salt), s))
                {
                    printf("%s\n", t + j);
                    found = true;
                    stop++;
                    return;
                }
            }
        }
        // Because there are recursive functions it needs to stop others if in one of them a word was found
        if (stop != 0)
        {
            i = 123;
        }
    }
}