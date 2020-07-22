import os

from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")

# Make sure API key is set
if not os.environ.get("API_KEY"):
    raise RuntimeError("API_KEY not set")


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""
    # Getting a user id
    user_id = session["user_id"]
    # Selecting data of a user and purchases
    rows = db.execute("SELECT * FROM users JOIN stocks JOIN accounts ON users.id = accounts.user_id AND stocks.id = accounts.stock_id WHERE users.id = :user_id",
                        user_id=user_id)

    # If there is no such data, query only user data
    if not rows:
        # Query database for user data
        rows = db.execute("SELECT * FROM users WHERE id = :user_id", user_id=user_id)
        return render_template("index.html", rows=rows)
    else:
        # Else add a current price to all stocks
        for row in rows:
            row["price"] = lookup(row["symbol"])["price"]
        return render_template("index.html", rows=rows)


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""

    # User reached route via GET (as by clicking a link)
    if request.method == "GET":
        return render_template("buy.html")

    # User reached route via POST (as by submitting a form via POST)
    else:
        # Getting user inputs
        symbol = request.form.get("symbol").upper()
        shares = request.form.get("shares")

        # Ensure a user provided a symbol
        if not symbol:
            return apology("You did not specify a stock")

        # Ensure a user provided shares
        elif not shares:
            return apology("You did not specify shares")

        elif no
        # And finally if the value is greater than 0
        elif float(shares) < 1:
            return apology("Provide a positive integer")

        # In case if a user provided a number with more than one '0' after decimal point
        shares = int(float(shares))
        # Getting user id for furhter actions
        user_id = session["user_id"]

        # Requesting stock data
        info = lookup(symbol)
        if info == None:
            return apology("There is no such stock")

        # How much money it needs to buy a number of shares at the current price
        all_sum = info["price"] * shares

        # Query database for user cash
        rows = db.execute("SELECT cash FROM users WHERE id = :user_id", user_id=user_id)

        # If a user don't have enough money
        if all_sum > rows[0]["cash"]:
            return apology("You do not have enough money")

        else:
            # Determine if such stock is in database
            stock_id = db.execute("SELECT id FROM stocks WHERE symbol = :symbol", symbol=symbol)

            if stock_id:
                # If so, only getting the id of it for constrainting with others tablse in database
                rows[0]["stock_id"] = stock_id[0]["id"]
            else:
                # If not, inserting it into database and getting its id for constrainting with others tablse in database
                rows[0]["stock_id"] = db.execute("INSERT INTO stocks (symbol, company_name) VALUES (:symbol, :name)",
                                                        symbol=symbol, name=info["name"])

            # Find out if a user has shares of the specified stock
            shares_on_account = db.execute("SELECT shares FROM accounts WHERE user_id = :user_id AND stock_id = :stock_id",
                                                user_id=user_id, stock_id=rows[0]["stock_id"])

            if not shares_on_account:
                # If a user doesn't, then add them to his account
                db.execute("INSERT INTO accounts (stock_id, user_id, shares) VALUES (:stock_id, :user_id, :shares)",
                            stock_id=rows[0]["stock_id"], user_id=user_id, shares=shares)
            else:
                # Else add them to available ones
                db.execute("UPDATE accounts SET shares = shares + :shares WHERE user_id = :user_id AND stock_id = :stock_id",
                                shares=shares, user_id=user_id, stock_id=rows[0]["stock_id"])

            # Subtract from current user cash a sum paid for shares
            db.execute("UPDATE users SET cash = :cash WHERE id = :user_id", cash=rows[0]["cash"] - all_sum, user_id=user_id)

            # Adding a user's transacion into history table
            db.execute("INSERT INTO history (stock_id, user_id, trade, price) VALUES (:stock_id, :user_id, :trade, :price)",
                                stock_id=rows[0]["stock_id"], user_id=user_id, trade=shares, price=info["price"])

            # Relay message to another route for the user to see
            flash("Bought")

            # Redirect user to home page
            return redirect("/")


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""
    # Enquiry the history of all of a user's transactions
    rows = db.execute("SELECT stocks.symbol, history.trade, history.price, history.date FROM history JOIN stocks ON stocks.id = history.stock_id WHERE history.user_id = :user_id",
                                user_id=session["user_id"])

    return render_template("history.html", rows=rows)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = :username",
                          username=request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]
        # Relay message to another page for a user
        flash("Logged in!")
        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""

    # User reached route via GET (as by clicking a link)
    if request.method == "GET":
        return render_template("quote.html")

    # User reached route via POST (as by submitting a form via POST)
    else:
        # Ensure a user povided a symbol
        if not request.form.get("symbol"):
            return apology("You did not specify a symbol")
        # Requesting stock data
        info = lookup(request.form.get("symbol"))
        # Ensure such stock exists
        if info == None:
            flash('There is no such stock')
            return redirect("/quote")
        return render_template("quote.html", info=info)


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""

    # Forget any user_id
    session.clear()

    # User reached route via GET
    if request.method == "GET":
        return render_template("register.html")

    # # User reached route via POST
    else:
        # Getting a user name
        username = request.form.get("username")
        # Getting a user password
        password = request.form.get("password")
        # Getting a confirmed user password
        confirm_pass = request.form.get("confirmation")

        # Validating inputs
        if not username:
            return apology("You must provide a name", 403)
        elif not password:
            return apology("You must provide a password", 403)
        elif not confirm_pass:
            return apology("You must confirm a password", 403)
        elif password != confirm_pass:
            return apology("You passwords does not match!", 403)

        # Checking if such username already is in database
        rows = db.execute("SELECT * FROM users WHERE username = :username", username=username)

        # If so, reject a user claim
        if rows:
            return apology("Such username alredy exists", 403)

        # Adding a user into a database and then remembering which user has registered
        session["user_id"] = db.execute("INSERT INTO users (username, hash) VALUES (:username, :hashed)",
                        username=username, hashed=generate_password_hash(password))

        # Relay a message to another page
        flash("You were successfully registered!")
        # Redirect user to home page
        return redirect("/")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""

    # Following data needs for both GET and POST requests
    user_id = session["user_id"]

    # Query databse for stock id, symbol of a stock and a number of shares of each stock that user has
    rows = db.execute("SELECT accounts.stock_id, accounts.shares, stocks.symbol FROM accounts JOIN stocks ON accounts.stock_id = stocks.id WHERE accounts.user_id = :user_id",
                                    user_id=user_id)

    # User reached route via GET
    if request.method == "GET":
        return render_template("sell.html", rows=rows)

    # User reached route via POST
    else:
        # Getting a number of shares for selling
        shares_to_sell = request.form.get("shares")

        # Ensure a user provide a number of shares
        if not shares_to_sell:
            return apology("You did not specify a number of shares")

        # Ensure a user provided a positive integer
        elif float(shares_to_sell) < 1:
            return apology("You picked a wrong number.")

        # Ensure a user submitted a symbol
        elif not request.form.get("symbol"):
            return apology("You did not specify a symbol. Or may be you have not bought any stocks yet?")

        # In case if a user provided a number with more than one '0' after decimal point
        shares_to_sell = int(float(shares_to_sell))
        # Getting a user input of a symbol and converting to uppercase
        symbol = request.form.get("symbol").upper()

        # Requesting stock data
        info = lookup(symbol)

        # If there is no such stock
        if info == None:
            return apology("There is not such stock")

        # There is no checking whether 'rows' exist because user can only select
        # a symbol of a stock that he has bought

        # Determine a number of specified shares in the user account
        for row in rows:
            if row["symbol"] == symbol:
                account_shares = row["shares"]
                stock_id = row["stock_id"]

        # Ensure that a user has the same or a bigger number of shares than he wants to sell
        if account_shares < shares_to_sell:
            return apology(f"You do not have {shares_to_sell} stocks of {symbol} to sell")
        else:
            # Remaining shares on a user account after selling
            remaining_shares = account_shares - shares_to_sell

            # If he will have 0 shares, then remove this stock from his account
            if remaining_shares == 0:
                db.execute("DELETE FROM accounts WHERE user_id = :user_id AND stock_id = :stock_id",
                            user_id=user_id, stock_id=stock_id)

            # Otherwise update a current number of shares
            else:
                db.execute("UPDATE accounts SET shares = :shares WHERE user_id = :user_id AND stock_id = :stock_id",
                            shares=remaining_shares, user_id=user_id, stock_id=stock_id)

            # Update user cash, adding a money for selling
            db.execute("UPDATE users SET cash = cash + :cash WHERE id = :user_id", cash=shares_to_sell * info["price"], user_id=user_id)

            # Adding a user's transacion into history table
            db.execute("INSERT INTO history (user_id, stock_id, trade, price) VALUES (:user_id, :stock_id, :trade, :price)",
                            user_id=user_id, stock_id=stock_id, trade=0 - shares_to_sell, price=info["price"])

            # Relay message to another page
            flash("Sold")
            # Redirecting to home page
            return redirect("/")

@app.route("/add", methods=["GET", "POST"])
@login_required
def add():
    """Adding cash to user account"""

    # User reached route via GET (as by clicking a button)
    if request.method == "GET":
        return render_template("add.html")

    # User reached route via POST (as by submitting a form via POST)
    else:
        # Getting a user id
        user_id = session["user_id"]
        # Getting a cash provided from user
        cash = request.form.get("cash")

        # Ensure a user provided cash
        if not cash:
            return apology("Provide a number of USD")

        # Ensure a user provided a positive integer and less than 900000
        elif float(cash) < 0.01 or float(cash) > 900000:
            return apology("Only positive integers are allowed and less than 900,000")

        # Converting cash to int. There is a float in case if a number of base 10 or more
        cash = float(cash)

        # Update user cash, adding a money for selling
        db.execute("UPDATE users SET cash = cash + :cash WHERE id = :user_id", cash=cash, user_id=user_id)

        # Relay message to home page
        flash("Successfully")
        # Redirect to home page
        return redirect("/")


@app.route("/withdraw", methods=["GET", "POST"])
@login_required
def withdraw():
    """Withdrawing cash from user account"""

    # User reached route via GET (as by clicking a button)
    if request.method == "GET":
        return render_template("withdraw.html")

    # User reached route via POST (as by submitting a form via POST)
    else:
        # Getting a user id
        user_id = session["user_id"]
        # Getting a cash provided from user
        cash = request.form.get("cash")

        # Ensure a user provided cash
        if not cash:
            return apology("Provide a number of USD")

        # Ensure a user provided an integer
        elif float(cash) <= 0:
            return apology("Only positive numbers are allowed")

        # Converting cash to float
        cash = float(cash)

        # Query database for user cash
        rows = db.execute("SELECT cash FROM users WHERE id = :user_id", user_id=user_id)

        # Comparing cash which user has with cash he wants to withdraw
        if rows[0]["cash"] < cash:
            return apology("You do not have enough cash")

        # Update user cash, adding a money for selling
        db.execute("UPDATE users SET cash = cash - :cash WHERE id = :user_id", cash=cash, user_id=user_id)

        # Relay message to home page
        flash("Successfully")
        # Redirect to home page
        return redirect("/")


def errorhandler(e):
    """Handle error"""
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)


# Listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)
