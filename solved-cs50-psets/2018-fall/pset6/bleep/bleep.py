from cs50 import get_string
import sys

# Program censors messages that contain words that appear on a list
# of supplied "banned words."
def main():
    if len(sys.argv) != 2:
        print("Usage: python bleep.py dictionary")
        sys.exit(1)

    banned = load_banned_words(sys.argv[1])
    string = get_string("What message would you like to censor?\n")
    check(ban, string)

def load_banned_words(banned):
    with open(banned, "r") as file:
        if not file:
            print(f"Could not load {file}")
        banned = set()
        for line in file:
            if line:
                banned.add(line.strip())
        return banned


def check(ban, string):
    words = string.split()
    for word in words:
        if word.lower() in ban:
            n = len(word)
            word = "*" * n
        print(f"{word}", end=" ")
    print()


if __name__ == "__main__":
    main()
