import sys
from cs50 import SQL

if len(sys.argv) != 2:
    print("Usage: roster.py 'house'")
    sys.exit(1)

query = sys.argv[1]

db = SQL("sqlite:///students.db")

rows = db.execute("SELECT * FROM students WHERE house = ? ORDER BY last_name, first_name", query)

for row in rows:
    if row["middle_name"] == None:
        print("{} {}, born {}".format(row["first_name"], row["last_name"], row["birth"]))
    else:
        print("{} {} {}, born {}".format(row["first_name"], row["middle_name"], row["last_name"], row["birth"]))