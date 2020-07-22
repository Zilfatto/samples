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
        // If the word was not added because of some reasons
        if (!insert(root, word))
        {
            unload();
            break;
        }

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
    // there is no word for now
    ptr->is_word = false;

    // Making sure that all new pointers point to nowhere
    for (int i = 0; i < N; i++)
    {
        ptr->children[i] = NULL;
    }
    return ptr;
}

bool insert(node *ptr, const char *word)
{
    // Creating an additional temporary pointer to the source of a trie
    node *tmp = ptr;
    // Iterating over each letter in the word
    for (int i = 0, s = strlen(word); i < s; i++)
    {
        // Position of the letter among 26 cells of the next node
        int n = letter_place(word[i]);

        // if there is no further node
        if (tmp->children[n] == NULL)
        {
            // Creating a new node
            tmp->children[n] = create_node();
        }

        // Come over to the next node
        tmp = tmp->children[n];

        // In case if for some reason new node was not created
        if(!tmp)
        {
            return false;
        }
    }
    // Mark that the word exists in the dictionary
    tmp->is_word = true;
    return true;
}