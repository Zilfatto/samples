#include <cs50.h>
#include <stdio.h>
#include <math.h>
#include <string.h>
#include <ctype.h>

int main(void)
{
    // Prompting the user for a text
    string t = get_string("Text: ");
    // Vsriables for all the letters, words and sentences in a text
    int all_letters = 0, all_words = 1, all_sentences = 0, n = strlen(t);
    // Iterating over every character in a text
    for (int i = 0; i < n; i++)
    {
        if ((t[i] >= 'a' && t[i] <= 'z') || (t[i] >= 'A' && t[i] <= 'Z'))
        {
            all_letters++;
        }
        else if ((t[i] == ' ') && (t[i + 1] != ' '))
        {
            all_words++;
        }
        else if ((t[i] == '.') || (t[i] == '?') || (t[i] == '!'))
        {
            all_sentences++;
        }
    }
    // Making sure that there is no whitespaces after a last word with trailing characters
    // and that there is no white space before a first word
    if ((t[n - 1] == ' ') || (t[n - 2] == ' ') || (t[0] == ' '))
    {
        all_words -= 1;
    }

    float avgwords, l, s;
    // Different approaches for calculating L and S values
    if (all_words < 100)
    {
        avgwords = 100 / (float) all_words;
        l = all_letters * avgwords;
        s = all_sentences * avgwords;
    }
    else
    {
        avgwords = (float) all_words / 100;
        l = all_letters / avgwords;
        s = all_sentences / avgwords;
    }
    // Finding a grade level
    float index = 0.0588 * l - 0.296 * s - 15.8;
    // Printing a grade level according to the index
    if (index < 1)
    {
        printf("Before Grade 1\n");
    }

    if (index >= 1)
    {
        int rounded = round(index);

        if (rounded >= 1 && rounded < 16)
        {
            printf("Grade %i\n", rounded);
        }
        else
        {
            printf("Grade 16+\n");
        }
    }
}