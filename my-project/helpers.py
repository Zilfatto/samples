import os
import decimal
import requests
import urllib.parse
import sqlalchemy
from flask import redirect, render_template, request, session
from functools import wraps


def login_required(f):
    """
    Decorate routes to require login.

    http://flask.pocoo.org/docs/1.0/patterns/viewdecorators/
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function


# Used for SQL SELECT results
def convertSQLToDict(result):
    # Coerce types
    rows = [dict(row) for row in result.fetchall()]
    for row in rows:
        for column in row:

            # Coerce decimal.Decimal objects to float objects
            # https://groups.google.com/d/msg/sqlalchemy/0qXMYJvq8SA/oqtvMD9Uw-kJ
            if type(row[column]) is decimal.Decimal:
                row[column] = float(row[column])

            # Coerce memoryview objects (as from PostgreSQL's bytea columns) to bytes
            elif type(row[column]) is memoryview:
                row[column] = bytes(row[column])
            if isinstance(row[column], str):
                row[column] = row[column].strip()
    return rows


def apology(message):
    """Render message as an apology to user."""
    def escape(s):
        """
        Escape special characters.

        https://github.com/jacebrowning/memegen#special-characters
        """
        for old, new in [("-", "--"), (" ", "-"), ("_", "__"), ("?", "~q"),
                         ("%", "~p"), ("#", "~h"), ("/", "~s"), ("\"", "''")]:
            s = s.replace(old, new)
        return s
    return render_template("apology.html", message=message)