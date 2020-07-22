import sys
from cs50 import SQL
# Program prints a list of students for a given house in alphabetical order
if len(sys.argv) != 2:
    print("Usage: roster.py 'house'")
    sys.exit(1)
# Getting the name of a house
query = sys.argv[1]
# Open a file for SQLite
db = SQL("sqlite:///students.db")
# Selecting students
rows = db.execute("SELECT * FROM students WHERE house = ? ORDER BY last, first", query)
# Printing out data of students
for row in rows:
    if row["middle"] == None:
        # If a student doesn't have a middle name
        print("{} {}, born {}".format(row["first"], row["last"], row["birth"]))
    else:
        # If a student has a middle_name
        print("{} {} {}, born {}".format(row["first"], row["middle"], row["last"], row["birth"]))