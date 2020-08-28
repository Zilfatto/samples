// Here I implemented a "hash table" structure for the problem set 5 of CS50
// To see the all related files and find more information go to (solved-cs50-psets -> 2019-fall -> pset5 -> speller)
// This file will be called "dictionary.c" there

#include <stdbool.h>
#include <strings.h>
#include <ctype.h>
#include <stdlib.h>
#include <stdio.h>

#include "dictionary.h"

// Number of buckets in hash table
const unsigned int N = 33133;

// Count the number of words in the dictionary
unsigned int count = 0;

// Hash table
node *table[N];

// Returns true if word is in dictionary else false
bool check(const char *word)
{
    // Finding out the bucket where the word could be placed
    unsigned int position = hash(word);

    // Pointer to this bucket (linked list)
    node *ptr = table[position];

    // Traversing through the list
    while (ptr != NULL)
    {
        // Comparing words
        if ((strcasecmp(ptr->word, word)) != 0)
        {
            // If word is not in this node, go further to the next node
            ptr = ptr->next;
        }
        else
        {
            return true;
        }
    }
    // If word was not found
    return false;
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    int index = 0;
    char letter = word[index];
    // Result of hashing
    unsigned int result = 1;

    // Hashing a word, if a word has more 7 letters, then up to 7
    do
    {
        // Converting uppercase letters to lowercase
        if (isupper(letter))
        {
            letter += 32;
        }
        // Multiplying a result by ascii value of a letter
        result *= letter;
        // Coming over to the next letter
        index++;
        letter = word[index];
    }
    while ((letter != '\0') && (index < 7));

    // For words which has 3 or less letters
    if (index <= 3)
    {
        result = result * 3333 % 33133;
    }
    // For others
    else
    {
        result %= 33133;
    }
    return result;
}

// Loads dictionary into memory, returning true if successful else false
bool load(const char *dictionary)
{
    FILE *file = fopen(dictionary, "r");
    if (file == NULL)
    {
        return false;
    }

    // Setting all pointers to NULL
    for (int i = 0; i < N; i ++)
    {
        table[i] = NULL;
    }

    // the pointer for loading a word from the dict
    node *ptr = NULL;
    unsigned int position;

    while (true)
    {
        ptr = malloc(sizeof(node));
        if (ptr == NULL)
        {
            return false;
        }
        // Making sure if it is the end of a file
        int is_end = fscanf(file, "%s", ptr->word);
        if (is_end != EOF)
        {
            count++;
            position = hash(ptr->word);
            // Adding a word in hash table
            insert(position, ptr);
        }
        else
        {
            free(ptr);
            break;
        }
    }
    fclose(file);
    return true;
}

// Returns number of words in dictionary if loaded else 0 if not yet loaded
unsigned int size(void)
{
    return count;
}

// Unloads dictionary from memory, returning true if successful else false
bool unload(void)
{
    for (int i = 0; i < N; i++)
    {
        // Freeing all allocated memory
        destroy(table[i]);
    }
    return true;
}

void insert(unsigned int position, node *ptr)
{
    // If there is a linked list in this bucket
    if (table[position] != NULL)
    {
        // Making the pointer to point to the same node as Table bucket
        ptr->next = table[position];
        // Then Table bucket points to this pointer
        table[position] = ptr;
    }
    else
    {
        ptr->next = NULL;
        table[position] = ptr;
    }
}

// Going to all the way to the end of a linked list,
// then freeing each node from end
void destroy(node *ptr)
{
    if (ptr != NULL)
    {
        if (ptr->next != NULL)
        {
            destroy(ptr->next);
        }
        free(ptr);
    }
}