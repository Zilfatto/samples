// Implements a dictionary's functionality

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#include "dictionary.h"

unsigned int all_words = 0;

// Loads dictionary into memory, returning true if successful else false
bool load(const char *dictionary)
{
    root = create_node();
    if (root == NULL)
    {
        return false;
    }
    root->is_word = false;

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
        add(0, word, &root);
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
    destroy(root);
    return true;
}

void destroy(node *ptr)
{
    int count = 0;
    while (count < N)
    {
        if (ptr->children[count] != NULL)
        {
            destroy(ptr->children[count]);
        }
        count++;
    }
    free(ptr);
}

void add(int count, const char *word, node **ptr)
{
    int n = letter_place(word[count]);
    if (*ptr == NULL)
    {
        *ptr = create_node();
        if (*ptr == NULL)
        {
            return;
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
            add(count + 1, word, &((*ptr)->children[n]));
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
            add(count + 1, word, &((*ptr)->children[n]));
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

node* create_node(void)
{
    node *ptr = malloc(sizeof(node));
    if (ptr == NULL)
    {
        return NULL;
    }

    for (int i = 0; i < N; i++)
    {
        ptr->children[i] = NULL;
    }
    return ptr;
}