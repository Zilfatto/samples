#include <stdio.h>
#include <cs50.h>
#include <string.h>
#include <ctype.h>

int shift(char c);

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        printf("Usage: ./vigenere keyword\n");
        return 1;
    }

    int n = strlen(argv[1]);

    for (int i = 0; i < n; i++)
    {
        if (!isalpha(argv[1][i]))
        {
            printf("Usage: ./vigenere keyword\n");
            return 1;
        }
    }

    char *s = get_string("plaintext: ");

    printf("ciphertext: ");

    int x = 0;
    int t = 0;

    for (int i = 0, z = strlen(s); i < z; i++)
	{
	    int b = t % n;

		x = shift(argv[1][b]);

		if (isupper(s[i]))
		{
			s[i] += x;
			if (s[i] > 'Z')
			{
			    s[i] -= 26;
			}
			t++;
		}
		else if (islower(s[i]))
		{
			s[i] += x;

			if (s[i] < 'a' || s[i] > 'z')
			{
				s[i] -= 26;
			}
			t++;
		}
	}
    printf("%s\n", s);
    return 0;
}

int shift(char c)
{
	int w;
	if (islower(c))
		{
		    w = c - 97;
		}
		else
		{
		    w = c - 65;
		}
	return w;
}