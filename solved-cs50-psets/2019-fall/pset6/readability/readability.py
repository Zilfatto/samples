import re
from cs50 import get_string
# The program computes the approximate grade level needed to comprehend some text
user_inp = get_string("Text: ")

all_let, all_words, all_sent = 0, 1, 0
length = len(user_inp)

for i in range(length):
    if user_inp[i].isalpha():
        all_let += 1
    elif user_inp[i] == " " and user_inp[i + 1] != " ":
        all_words += 1
    elif user_inp[i] == "." or user_inp[i] == "!" or user_inp[i] == "?":
        all_sent += 1

if user_inp[length - 1] == " " or user_inp[length - 2] == " ":
    all_words -= 1

if all_words < 100:
    avgwords = 100 / all_words
    l = all_let * avgwords
    s = all_sent * avgwords
else:
    avgwords = all_words / 100
    l = all_let / avgwords
    s = all_sent / avgwords

index = 0.0588 * l - 0.296 * s - 15.8

if index < 1:
    print("Before Grade 1")
else:
    grade = round(index)

    if grade >= 1 and grade < 16:
        print(f"Grade {grade}")
    else:
        print("Grade 16+")