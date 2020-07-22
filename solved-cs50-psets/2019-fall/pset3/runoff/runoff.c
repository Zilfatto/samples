#include <stdio.h>
#include <cs50.h>
#include <string.h>

#define MAX_VOTERS 100
#define MAX_CANDIDATES 9

int preferences[MAX_VOTERS][MAX_CANDIDATES];

typedef struct
{
    string name;
    int votes;
    bool eliminated;
}
candidate;

candidate candidates[MAX_CANDIDATES];

// A number of voters
int voter_count;
// A number of candidates
int candidate_count;

bool vote(int voter, int rank, char *name);
void tabulate(void);
bool print_winner(void);
int find_min(void);
bool is_tie(int min);
void eliminate(int min);

int main(int argc, char *argv[])
{
    if (argc < 2)
    {
        printf("Usage: runoff [candidate ...]\n");
        return 1;
    }

    candidate_count = argc - 1;
    if (candidate_count > MAX_CANDIDATES)
    {
        printf("Maximum number of candidates is %i\n", MAX_CANDIDATES);
        return 2;
    }

    for (int i = 0; i < candidate_count; i++)
    {
        // Filling out candidaate's name, number of votes and if he is eliminated
        candidates[i].name = argv[i + 1];
        candidates[i].votes = 0;
        candidates[i].eliminated = false;
    }

    voter_count = get_int("Number of voters: ");
    if (voter_count > MAX_VOTERS)
    {
        printf("Maximum number of voters is %i\n", MAX_VOTERS);
        return 3;
    }

    for (int i = 0; i < voter_count; i++)
    {
        for (int j = 0; j < candidate_count; j++)
        {
            // Voting for the candidate according to the current rank
            char *name = get_string("Rank %i: ", j + 1);
            // To make sure that candidate is in the list
            if (!vote(i, j, name))
            {
                printf("Invalid vote.\n");
                return 4;
            }
        }
        printf("\n");
    }

    while (true)
    {
        // Ccomputing the current vote totals
        tabulate();

        bool won = print_winner();
        // If there is a winner - jump out of a while loop
        if (won)
        {
            break;
        }
        // A min number of votes that candidate(s) has (have)
        int min = find_min();
        // Is there a tie among candidates that has a min number of votes
        bool tie = is_tie(min);

        // Print out all candidates if they are tied
        if (tie)
        {
            for (int i = 0; i < candidate_count; i++)
            {
                if (!candidates[i].eliminated)
                {
                    printf("%s\n", candidates[i].name);
                }
            }
            break;
        }
        // Eliminating the last place candidate(s)
        eliminate(min);

        // Reset the votes to zero in order to ccompute the new vote totals
        for (int i = 0; i < candidate_count; i++)
        {
            candidates[i].votes = 0;
        }
    }
    return 0;
}


bool vote(int voter, int rank, char *name)
{
    // Iterating over each candidate to compare his name with a name given by voter
    for (int i = 0; i < candidate_count; i++)
    {
        if (!strcmp(name, candidates[i].name))
        {
            // Set candidate for which voter has voted
            preferences[voter][rank] = i;
            return true;
        }
    }
    // If there is no such candidate
    return false;
}


void tabulate(void)
{
    // Add a vote to a candidate (if he is not eliminated) which is the first in the rank of a voter
    for (int i = 0; i < voter_count; i++)
    {
        for (int j = 0; j < candidate_count; j++)
        {
            if (!candidates[preferences[i][j]].eliminated)
            {
                candidates[preferences[i][j]].votes++;
                break;
            }
        }
    }
}


bool print_winner(void)
{
    for (int i = 0; i < candidate_count; i++)
    {
        // For the win, candidate must have at list 50% of the votes
        if (candidates[i].votes > voter_count / 2)
        {
            printf("%s\n", candidates[i].name);
            return true;
        }
    }
    // If there is no such candidate
    return false;
}


int find_min(void)
{
    // A max number of votes
    int n = voter_count;
    for (int i = 0; i < candidate_count; i++)
    {
        if (!candidates[i].eliminated)
        {
            if (n > candidates[i].votes)
            {
                // A min number of votes
                n = candidates[i].votes;
            }
        }
    }
    return n;
}


bool is_tie(int min)
{
    // If it turns out that everyone in the election is tied
    // with the same number of votes
    for (int i = 0; i < candidate_count; i++)
    {
        if (!candidates[i].eliminated)
        {
            if (min != candidates[i].votes))
            {
                return false;
            }
        }
    }
    return true;
}


void eliminate(int min)
{
    // Eliminating candidate(s) with a min number of votes
    for (int i = 0; i < candidate_count; i++)
    {
        if (min == candidates[i].votes)
        {
            candidates[i].eliminated = true;
        }
    }
    return;
}