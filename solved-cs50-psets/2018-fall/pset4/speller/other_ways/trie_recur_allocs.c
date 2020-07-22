// before calling first time
// allocated = false;
// int len = strlen(word);

// Implements a dictionary's functionality

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#include "dictionary.h"

unsigned int all_words = 0;

int all = 0;
#define ALLOCS 150000
node *arrays[ALLOCS];

bool allocated;
node *array;
int nodes;

// Loads dictionary into memory, returning true if successful else false
bool load(const char *dictionary)
{
    root = malloc(sizeof(node));
    if (root == NULL)
    {
        return false;
    }
    root->is_word = false;
    for (int i = 0; i < N; i++)
    {
        root->children[i] = NULL;
    }
    // Open dictionary
    FILE *file = fopen(dictionary, "r");
    if (file == NULL)
    {
        unload();
        return false;
    }

    // Buffer for a word
    char word[LENGTH + 1];

    // Insert words into trie
    while (fscanf(file, "%s", word) != EOF)
    {
        allocated = false;
        int len = strlen(word);
        adding(0, len, word, &root);
    }

    // Close dictionary
    fclose(file);

    // Indicate success
    return true;
}

// Returns number of words in dictionary if loaded else 0 if not yet loaded
unsigned int size(void)
{
    return all_words;
}

// Returns true if word is in dictionary else false
bool check(const char *word)
{
    node *ptr = root;
    for (int i = 0, j = strlen(word); i < j; i++)
    {
        int n = letter_place(word[i]);
        ptr = ptr->children[n];
        if (ptr == NULL)
        {
            return false;
        }
    }
    return ptr->is_word;
}

// Unloads dictionary from memory, returning true if successful else false
bool unload(void)
{
    for (int i = 0; i < all; i++)
    {
        free(arrays[i]);
    }
    free(root);
    return true;
}


void adding(int count, int len, const char *word, node **ptr)
{
    int n = letter_place(word[count]);

    if (*ptr == NULL)
    {
        if (!allocated)
        {
            nodes = len - count + 1;
            arrays[all] = calloc(nodes, sizeof(node));
            if (arrays[all] == NULL)
            {
                return;
            }
            array = arrays[all];
            all++;
            allocated = true;
        }
        nodes--;
        *ptr = array + nodes;
        for (int i = 0; i < N; i++)
        {
            (*ptr)->children[i] = NULL;
        }

        if (word[count] == 0)
        {
            (*ptr)->is_word = true;
            all_words++;
            return;
        }
        else
        {
            (*ptr)->is_word = false;
            adding(count + 1, len, word, &((*ptr)->children[n]));
        }
    }
    else
    {
        if (word[count] == 0)
        {
            (*ptr)->is_word = true;
            all_words++;
            return;
        }
        else
        {
            adding(count + 1, len, word, &((*ptr)->children[n]));
        }
    }
}

int letter_place(char c)
{
    if (c == '\'')
    {
        return N - 1;
    }
    return tolower(c) - 97;
}