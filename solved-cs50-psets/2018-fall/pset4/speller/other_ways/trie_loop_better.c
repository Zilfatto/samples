 /*             // it might be better, but not i don't know why not faster
                node **child;
                // for (int i = 0; i < N; i++)
                child = &(tmp->children[0]);
                // then - *(child + i) in the lopp
                {
                    tmp->children[i] = NULL;
                }
     */

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
    node **ptr;

    // Buffer for a word
    char word[LENGTH + 1];

    // Insert words into trie
    while (fscanf(file, "%s", word) != EOF)
    {
        int count = 0;
        ptr = &root;
        node *tmp = root;
        while (true)
        {
            int n = letter_place(word[count]);
            if (tmp == NULL)
            {
                tmp = create_node();
                if (tmp == NULL)
                {
                    return false;
                }

                if (word[count] == 0)
                {
                    *ptr = tmp;
                    tmp->is_word = true;
                    all_words++;
                    break;
                }
                else
                {
                    *ptr = tmp;
                    tmp->is_word = false;
                    ptr = &(tmp->children[n]);
                    tmp = tmp->children[n];
                    count++;
                }
            }
            else
            {
                if (word[count] == 0)
                {
                    tmp->is_word = true;
                    all_words++;
                    break;
                }
                ptr = &(tmp->children[n]);
                tmp = tmp->children[n];
                count++;
            }
        }
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