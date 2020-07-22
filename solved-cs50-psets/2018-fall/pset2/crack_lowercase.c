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

void recursion(char *s, char t[], int count, int n, char salt[]);

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        printf("Usage: ./crack hash\n");
        return 1;
    }

    FILE *file = fopen("dictionary/large", "r");
    if (file == NULL)
    {
        return false;
    }

    int t = 5;
    char s[45];
    char p[45];
    char salt[2] = {argv[1][0], argv[1][1]};
    while (t != EOF)
    {
        t = fscanf(file, "%s", s);
        for (int i = 0, z = strlen(s); i < z; i++)
        {
            p[i] = toupper(s[i]);
        }

        if (!strcmp(crypt(s, salt), argv[1]))
        {
            printf("%s\n", s);
            return 0;
        }
        else if (!strcmp(crypt(p, salt), argv[1]))
        {
            printf("%s\n", p);
            return 0;
        }
    }
    fclose(file);

    int n = 5;
    char array[n + 1];
    array[n] = 0;
    int count = 0;
    recursion(argv[1], array, count, n, salt);
    if (!found)
    {
        printf("Password could not be cracked.\n");
    }
    return 0;
}

void recursion(char *s, char t[], int count, int n, char salt[])
{
    if (count >= n)
    {
        return;
    }
    for (int i = 122; i > 64 ; i--)
    {
        if (i == 96)
        {
            i -= 6;
        }
        t[count] = i;
        recursion(s, t, count + 1, n, salt);
        if (count == n - 1)
        {
            for (int j = 0; j < n; j++)
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
        if (stop != 0)
        {
            i = 64;
        }
    }
}