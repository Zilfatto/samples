#include <stdio.h>
#include <cs50.h>
#include <string.h>

#define MAX 9
// The number of voters who prefer candidate one over candidate another
int preferences[MAX][MAX];

// The candidate graph that represents the existence of an edge pointing
// from one candidate to another
bool locked[MAX][MAX];

typedef struct
{
    int winner;
    int loser;
}
pair;

char *candidates[MAX];
// Unique pairs of candidates
pair pairs[MAX * (MAX - 1) / 2];

bool sign;
// A number of pairs
int pair_count;
// A number of candidates
int candidate_count;

bool vote(int rank, char *name, int ranks[]);
void record_preferences(int ranks[]);
void add_pairs(void);
void sort_pairs(int min, int max);
void lock_pairs(void);
void print_winner(void);
// Indicating if there will be a cycle of candidates
void is_cycle(int winner, int loser, int n);


int main(int argc, char *argv[])
{
    if (argc < 2)
    {
        printf("Usage: tideman [candideta ...]\n");
        return 1;
    }

    candidate_count = argc - 1;
    if (candidate_count > MAX)
    {
        printf("Maximum number of candidate is %i\n", MAX);
        return 2;
    }
    for (int i = 0; i < candidate_count; i++)
    {
        candidates[i] = argv[i + 1];
        // Setting to default values
        for (int j = 0; j < candidate_count; j++)
        {
            locked[i][j] = false;
            preferences[i][j] = 0;
        }
    }

    pair_count = 0;
    int voter_count = get_int("Number of voters: ");

    for (int i = 0; i < voter_count; i++)
    {
        // Ranks of candidates
        int ranks[candidate_count];

        for (int j = 0; j < candidate_count; j++)
        {
            char *name = get_string("Rank %i: ", j + 1);
            // Add candidate into a current array of ranks
            if (!vote(j, name, ranks))
            {
                printf("Invalid vote.\n");
                return 3;
            }
        }
        record_preferences(ranks);
        printf("\n");
    }
    // Creating all pairs of candidates except there is a tie
    add_pairs();

    sort_pairs(0, (pair_count * (pair_count - 1) / 2) - 1);

    // Locking pairs in order to avoid a cycle of candidates
    lock_pairs();
    print_winner();
    return 0;
}


bool vote(int rank, char *name, int ranks[])
{
    // Assigning current rank of candidate to an array of all candidates
    for (int i = 0; i < candidate_count; i++)
    {
        if (!strcmp(name, candidates[i]))
        {
            ranks[rank] = i;
            return true;
        }
    }
    return false;
}


void record_preferences(int ranks[])
{
    for (int i = 0; i < candidate_count - 1; i++)
    {
        for (int j = i + 1; j < candidate_count; j++)
        {
            preferences[ranks[i]][ranks[j]]++;
        }
    }
}


void add_pairs(void)
{
    for (int i = 0; i < candidate_count - 1; i++)
    {
        for (int j = i + 1; j < candidate_count; j++)
        {
            // If i candidate beats j one
            if (preferences[i][j] > preferences[j][i])
            {
                pairs[pair_count].winner = i;
                pairs[pair_count].loser = j;
                pair_count++;
            }
            // Vice versa
            else if (preferences[i][j] < preferences[j][i])
            {
                pairs[pair_count].winner = j;
                pairs[pair_count].loser = i;
                pair_count++;
            }
            // (else) If there is a tie not to add a pair
        }
    }
}

// My implementation of a merge sort for this task
// Sorting the pairs of candidates in decreasing order of strength of victory
void sort_pairs(int min, int max)
{
    // If only one element is left
    if (max - min == 0)
    {
        return;
    }
    // Finding the middle of an array
    int middle = (max + min) / 2;

    // Fictive splitting an array in half if the sum is even
    // (halfs won't always be equal in length)
    if ((max + min) % 2 == 0)
    {
        // Sorting left and right halves
        sort_pairs(min, middle - 1);

        sort_pairs(middle, max);
    }
    // Fictive splitting an array in half if the sum is odd
    else
    {
        // Sorting left and right halves
        sort_pairs(min, middle);

        sort_pairs(middle + 1, max);
    }
    // A temporary array for sorting and storing compared pairs
    pair array[(max - min) + 1];

    for (int i = 0, j = 0, k = 0; k <= max - min;)
    {
        // For even sum
        if ((max + min) % 2 == 0)
        {
            // Comparing winners between two pairs
            if (preferences[pairs[min + i].winner][pairs[min +
                                                   i].loser] > preferences[pairs[middle +
                                                           j].winner][pairs[middle + j].loser])
            {
                // If the winner from left fictive array beats one from right fictive array
                // Put first one into temporary array
                array[k] = pairs[min + i];
                i++;
                k++;
            }
            else if (preferences[pairs[min + i].winner][pairs[min +
                     i].loser] < preferences[pairs[middle +
                                                   j].winner][pairs[middle + j].loser])
            {
                // In opposite way, put a winner from right fictive array into temporary array
                array[k] = pairs[middle + j];
                j++;
                k++;
            }
            else
            {
                // If there is a tie, put both winners into a temporary array,
                // the order doesn't matter
                array[k] = pairs[min + i];
                array[k + 1] = pairs[middle + j];
                i++;
                j++;
                k += 2;
            }
            // If all winners from left fictive array are already put into a tmp array
            if (min + i == middle)
            {
                for (; k <= max - min;)
                {
                    // Putting the rest winners from right fictive array into a tmp array
                    array[k] = pairs[middle + j];
                    j++;
                    k++;
                }
            }
            // If all winners from right fictive array are already put into a tmp array
            else if (middle + j == max + 1)
            {
                for (; k <= max - min;)
                {
                    // Putting the rest winners from left fictive array into a tmp array
                    array[k] = pairs[min + i];
                    i++;
                    k++;
                }
            }
        }
        // The same way of sorting only for odd sum
        else
        {
            if (preferences[pairs[min + i].winner][pairs[min +
                                                   i].loser] > preferences[pairs[middle +
                                                           1 + j].winner][pairs[middle + 1 + j].loser])
            {
                array[k] = pairs[min + i];
                i++;
                k++;
            }
            else if (preferences[pairs[min + i].winner][pairs[min +
                     i].loser] < preferences[pairs[middle + 1 + j].winner][pairs[middle +
                             1 + j].loser])
            {
                array[k] = pairs[middle + 1 + j];
                j++;
                k++;
            }
            else
            {
                array[k] = pairs[min + i];
                array[k + 1] = pairs[middle + 1 + j];
                i++;
                j++;
                k += 2;
            }

            if (min + i == middle + 1)
            {
                for (; k <= max - min;)
                {
                    array[k] = pairs[middle + 1 + j];
                    j++;
                    k++;
                }
            }
            else if (middle + 1 + j == max + 1)
            {
                for (; k <= max - min;)
                {
                    array[k] = pairs[min + i];
                    i++;
                    k++;
                }
            }
        }
    }
    // Returning sorted winners into original array
    for (int i = 0; i <= max - min; i++)
    {
        pairs[min + i] = array[i];
    }
}

// Locking in the strongest edges first
void lock_pairs(void)
{
    for (int i = 0; i < pair_count; i++)
    {
        // Setting the dafault value
        sign = false;

        // Checking if there will be a cycle of candidates
        is_cycle(pairs[i].winner, pairs[i].loser, candidate_count);

        // If locking is possible
        if (!sign)
        {
            locked[pairs[i].winner][pairs[i].loser] = true;
        }
    }
}


void is_cycle(int winner, int loser, int total_cand)
{
    // If all possible connection are checked
    if (total_cand == 0)
    {
        return;
    }
    // If locked array will allow, then the last called recursive function
    // will determine if we will have a cycle of candidates
    if (winner == loser)
    {
        sign = true;
    }

    for (int i = 0; i < candidate_count; i++)
    {
        // Go through only if there is an arrow to another candidate
        // If y candidate beats i one
        if (locked[loser][i])
        {
            // Call a function to another level of comparison
            is_cycle(winner, i, total_cand - 1);
        }
    }
}


void print_winner(void)
{
    // For a number of defeats
    int defeats;
    // Iterating over each candidate
    for (int i = 0; i < candidate_count; i++)
    {
        // Setting to default value
        defeats = 0;
        for (int j = 0; j < candidate_count; j++)
        {
            // If i candidate loose out to y one, then add a defeat
            if ((!(i == j)) && (!locked[i][j]) && (locked[j][i]))
            {
                defeats++;
            }
        }
        // Print out the winner
        if (defeats == 0)
        {
            printf("%s\n", candidates[i]);
            return;
        }
    }
}