// Implements a dictionary's functionality

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#include "dictionary.h"

// To calculate a number of words in given text
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
    // Creating an additional pointer to the source of a trie
    node *ptr = root;
    for (int i = 0, j = strlen(word); i < j; i++)
    {
        // Position of the letter among 26 cells of the next node
        int n = letter_place(word[i]);
        // Come over to the next node
        ptr = ptr->children[n];

        // There is no such word in the dictionary
        if (ptr == NULL)
        {
            return false;
        }
    }
    // Returning boolean in order to determine is whether or not a word in the dictionary
    return ptr->is_word;
}

// Unloads dictionary from memory, returning true if successful else false
bool unload(void)
{
    destroy(root);
    return true;
}

// To free all allocated memory
void destroy(node *ptr)
{
    int count = 0;

    // Calling a function for each pointer of a current node
    while (count < N)
    {
        // If there is the next node
        if (ptr->children[count] != NULL)
        {
            // Continue recersion if the next node exists
            destroy(ptr->children[count]);
        }
        count++;
    }
    free(ptr);
}

// Recursive function
void add(int count, const char *word, node **ptr)
{
    // variable count - needs for the traversing through word
    // Determining the position for the current letter
    int n = letter_place(word[count]);
    if (*ptr == NULL)
    {
        // if there is no further node
        *ptr = create_node();
        if (*ptr == NULL)
        {
            return;
        }
        // Determining the end of a word
        if (word[count] == 0)
        {
            // if so, to mark that this word exists
            (*ptr)->is_word = true;
            all_words++;
            return;
        }
        else
        {
            // It is not the end of a word, so marking as false
            (*ptr)->is_word = false;
            // go to the next node through current letter in order to add next letter of a word
            add(count + 1, word, &((*ptr)->children[n]));
        }
    }
    else
    {
        // Determining the end of a word
        if (word[count] == 0)
        {
            // mark the end of a word
            (*ptr)->is_word = true;
            all_words++;
            return;
        }
        else
        {
            // go to the next node through current letter in order to add next letter of a word
            add(count + 1, word, &((*ptr)->children[n]));
        }
    }
}

int letter_place(char c)
{
    // the place for \' is in the end
    if (c == '\'')
    {
        return N - 1;
    }
    // convert any letter to lower and then define the position for it
    return tolower(c) - 97;
}

node* create_node(void)
{
    // Allocating memory for the node and asigning to the pointer
    node *ptr = malloc(sizeof(node));
    if (ptr == NULL)
    {
        return NULL;
    }

    // Making sure that all new pointers point to nowhere
    for (int i = 0; i < N; i++)
    {
        ptr->children[i] = NULL;
    }
    return ptr;
}