#include <stdio.h>
#include <cs50.h>
#include <string.h>

#define MAX 9

// A number of candidates
int candidate_count;

typedef struct
{
    string name;
    int votes;
}
candidate;

candidate candidates[MAX];

bool vote(char *name);
void print_winner(void);


int main(int argc, char *argv[])
{
    // Only 2 arguments is valid
    if (argc < 2)
    {
        printf("Usage: pluraluty [candidate...]\n");
        return 1;
    }

    candidate_count = argc - 1;
    // If number of candidates is more, than 9
    if (candidate_count > 9)
    {
        printf("Maximum number of candidates is %i\n", MAX);
        return 2;
    }

    for (int i = 0; i < candidate_count; i++)
    {
        // Filling out candidates name and setting votes to 0
        candidates[i].votes = 0;
        candidates[i].name = argv[i + 1];
    }
    // Getting the number of voters
    int vote_count = get_int("Number of voters: ");

    for (int i = 0; i < vote_count; i++)
    {
        // For which candidate voter vites
        string name = get_string("Vote: ");

        // To make sure that such candidate in the list
        if (!vote(name))
        {
            printf("Invalid vote.\n");
        }
    }
    // Printing out the winner(s)
    print_winner();
}

bool vote(char *name)
{
    for (int i = 0; i < candidate_count; i++)
    {
        if (!strcmp(name, candidates[i].name))
        {
            candidates[i].votes++;
            return true;
        }
    }
    return false;
}

void print_winner(void)
{
    // Min number of votes for now
    int max = 0;
    // There are two loops because there might be more than one winner
    for (int i = 0; i < candidate_count; i++)
    {
        // Finding the biggest number of votes
        if (max < candidates[i].votes)
        {
            max = candidates[i].votes;
        }
    }
    for (int i = 0; i < candidate_count; i++)
    {
        // Printing out the candidate(s) who has(have) max number of votes
        if (max == candidates[i].votes)
        {
            // Printing out the name of the winner
            printf("%s\n", candidates[i].name);
        }
    }
}