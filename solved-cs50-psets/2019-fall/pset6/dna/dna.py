import re
import sys
from csv import reader, DictReader


def main():
    if len(sys.argv) != 3:
        print("Usage: python dna.py data.scv sequence.txt")
        sys.exit(1)
    # Loading DNA sequance
    seq = load_sequence(sys.argv[2])
    # Loading database
    load_database(sys.argv[1], seq)


def load_sequence(name):
    with open(name, "r") as file:
        if not file:
            print("Could not load {}.".format(name))
            sys.exit(1)
        sequence = ""
        while True:
            c = file.read(1)
            # Putting into sequeance only letters
            if not c or not re.match(r"[A-Za-z]", c):
                break
            sequence += c
    return sequence


def load_database(data_b, sequence):
    with open(data_b, "r") as csvfile:
        if not csvfile:
            print(f"Could not load {csvfile}.")
        reader = DictReader(csvfile)
        keys = []
        count = 0
        database = {}
        # Iterating over dictionaries in databases
        # Reading dict from database with top row of db as keys and each other as values
        for dct in map(dict, reader):
            # Creating nested dictionaries with keys as person names
            database[dct["name"]] = dct
            # Only once add into an array keys (STR sequence) from database
            if count == 0:
                for key in dct:
                    keys.append(key)
                count += 1

    check(keys, database, sequence)


def check(keys, database, sequence):
    # Adding default value
    data = {
        "name": "name"
    }
    len_seq = len(sequence)
    # Iterating over keys except first key (over STR sequence)
    for i in range(1, len(keys)):
        # Counting a number of repeated STR sequence
        count = 0
        length = len(keys[i])
        max_rep = 0
        # Looked through the DNA sequence for the longest consecutive sequence of repeated STR sequence
        for j in range(length * 2, len_seq):
            # Comparing key with subsequence in sequence
            if keys[i] == sequence[j - length * 2:j - length]:
                count += 1
                # When next elements doesn't match this key
                if keys[i] != sequence[j - length:j] or j == len_seq:
                    if max_rep < count:
                        max_rep = count
                    count = 0
                j += length - 1
        # Adding the highest number of repeated STR sequence into data
        data[f"{keys[i]}"] = max_rep

    result(data, database)


# Figuring out if anybody's sequences from database match this data
def result(data, database):
    # Total of all STR sequences except first "name" element
    total = len(data) - 1
    for dct in database:
        count = 0
        for y in database[dct]:
            # Comparing a number of repeated STR sequences in db and data
            if database[dct][y] == str(data[y]):
                count += 1
        # All numbers of repeated STR sequences match
        if count == total:
            print(f"{database[dct]['name']}")
            return

    print("No match")


if __name__ == "__main__":
    main()