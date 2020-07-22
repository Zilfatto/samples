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
int position;
node *array;

// Loads dictionary into memory, returning true if successful else false
bool load(const char *dictionary)
{
    root = crt_nodes(1);
    if (root == NULL)
    {
        return false;
    }

    // Open dictionary
    FILE *file = fopen(dictionary, "r");
    if (file == NULL)
    {
        unload();
        return false;
    }

    for (int i = 0; i < ALLOCS; i++)
    {
        arrays[i] = NULL;
    }

    // Buffer for a word
    char word[LENGTH + 1];

    // Insert words into trie
    while (fscanf(file, "%s", word) != EOF)
    {
        allocated = false;
        node *ptr = root;
        position = 0;
        for (int i = 0, s = strlen(word); i < s; i++)
        {
            int n = letter_place(word[i]);
            if (ptr->children[n] == NULL)
            {
                if (!allocated)
                {
                    arrays[all] = crt_nodes(s - i);
                    if (arrays[all] == NULL)
                    {
                        return false;
                    }
                    array = arrays[all];
                    all++;
                    allocated = true;
                }
                ptr->children[n] = array + position;
                position++;
            }

            ptr = ptr->children[n];

        }
        ptr->is_word = true;
        all_words++;
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

int letter_place(char c)
{
    if (c == '\'')
    {
        return N - 1;
    }
    return tolower(c) - 97;
}

node* crt_nodes(int amount)
{
    array = malloc(amount * sizeof(node));
    if (array == NULL)
    {
        return NULL;
    }

    for (int i = 0; i < amount; i++)
    {
        for (int j = 0; j < N; j++)
        {
            (array + i)->children[j] = NULL;
        }
        (array + i)->is_word = false;
    }
    return array;
}