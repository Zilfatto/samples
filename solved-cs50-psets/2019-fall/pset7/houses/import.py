import sys
import csv
from cs50 import SQL
# Program imports data from a CSV spreadsheet
if len(sys.argv) != 2:
    print("Usage: import.py characters.csv")
    sys.exit(1)
# creating an empty database called students.db
open("students.db", "w").close()
# Open that file for SQLite
db = SQL("sqlite:///students.db")
# Creating a table called students in database
db.execute("CREATE TABLE students (first TEXT, middle TEXT, last TEXT, house TEXT, birth NUMERIC)")
# Reading a given csv file
with open(sys.argv[1], "r") as file:
    reader = csv.DictReader(file)

    for row in reader:
        # Getting a birth
        birth = row["birth"]
        # Getting a house
        house = row["house"]
        # Getting and splitting a name
        names = row["name"].split()

        # In the case if the middle name is missing
        if len(names) == 2:
            first_name = names[0]
            middle_name = None
            last_name = names[1]
        else:
            first_name = names[0]
            middle_name = names[1]
            last_name = names[2]

        # Inserting data into a table
        db.execute("INSERT INTO students (first, middle, last, house, birth) VALUES(?, ?, ?, ?, ?)",
                   first_name, middle_name, last_name, house, birth)

