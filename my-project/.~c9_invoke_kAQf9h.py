import os
import re

from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session, send_file
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import login_required, apology

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

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///data.db")

# For validation a password
password_regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*(\s))(?=.{6,})(?!.{41,})"
# For checking a whitespaces in an input
space_regex = "^(?=.*(\s))"
# For validating an Email
email_regex = "^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$"
# For checking imojies
# Ref: https://gist.github.com/Alex-Just/e86110836f3f93fe7932290526529cd1#gistcomment-3208085
# Ref: https://en.wikipedia.org/wiki/Unicode_block
EMOJI_PATTERN = re.compile(
    "(["
    "\U0001F1E0-\U0001F1FF"  # flags (iOS)
    "\U0001F300-\U0001F5FF"  # symbols & pictographs
    "\U0001F600-\U0001F64F"  # emoticons
    "\U0001F680-\U0001F6FF"  # transport & map symbols
    "\U0001F700-\U0001F77F"  # alchemical symbols
    "\U0001F780-\U0001F7FF"  # Geometric Shapes Extended
    "\U0001F800-\U0001F8FF"  # Supplemental Arrows-C
    "\U0001F900-\U0001F9FF"  # Supplemental Symbols and Pictographs
    "\U0001FA00-\U0001FA6F"  # Chess Symbols
    "\U0001FA70-\U0001FAFF"  # Symbols and Pictographs Extended-A
    "\U00002702-\U000027B0"  # Dingbats
    "])"
)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""

    # Forget any user_id
    session.clear()

    countries = ["afghanistan","albania","algeria","andorra","angola","anguilla","antigua & barbuda","argentina","armenia","aruba","australia","austria","azerbaijan","bahamas","bahrain","bangladesh","barbados","belarus","belgium","belize","benin","bermuda","bhutan","bolivia","bosnia & herzegovina","botswana","brazil","british virgin islands","brunei","bulgaria","burkina faso","burundi","cambodia","cameroon","canada","cape verde","cayman islands","central arfrican republic","chad","chile","china","colombia","congo","cook islands","costa rica","cote d ivoire","croatia","cuba","curacao","cyprus","czech republic","denmark","djibouti","dominica","dominican republic","ecuador","egypt","el salvador","equatorial guinea","eritrea","estonia","ethiopia","falkland islands","faroe islands","fiji","finland","france","french polynesia","french west indies","gabon","gambia","georgia","germany","ghana","gibraltar","greece","greenland","grenada","guam","guatemala","guernsey","guinea","guinea bissau","guyana","haiti","honduras","hong kong","hungary","iceland","india","indonesia","iran","iraq","ireland","isle of man","israel","italy","jamaica","japan","jersey","jordan","kazakhstan","kenya","kiribati","kosovo","kuwait","kyrgyzstan","laos","latvia","lebanon","lesotho","liberia","libya","liechtenstein","lithuania","luxembourg","macau","macedonia","madagascar","malawi","malaysia","maldives","mali","malta","marshall islands","mauritania","mauritius","mexico","micronesia","moldova","monaco","mongolia","montenegro","montserrat","morocco","mozambique","myanmar","namibia","nauro","nepal","netherlands","netherlands antilles","new caledonia","new zealand","nicaragua","niger","nigeria","north korea","norway","oman","pakistan","palau","palestine","panama","papua new guinea","paraguay","peru","philippines","poland","portugal","puerto rico","qatar","reunion","romania","russia","rwanda","saint pierre & miquelon","samoa","san marino","sao tome and principe","saudi arabia","senegal","serbia","seychelles","sierra leone","singapore","slovakia","slovenia","solomon islands","somalia","south africa","south korea","south sudan","spain","sri lanka","st kitts & nevis","st lucia","st vincent","sudan","suriname","swaziland","sweden","switzerland","syria","taiwan","tajikistan","tanzania","thailand","timor l'este","togo","tonga","trinidad & tobago","tunisia","turkey","turkmenistan","turks & caicos","tuvalu","uganda","ukraine","united arab emirates","united kingdom","united states of america","uruguay","uzbekistan","vanuatu","vatican city","venezuela","vietnam","virgin islands (us)","yemen","zambia","zimbabwe"]

    if request.method == "GET":
        # In case if request from a page via AJAX
        if request.args.get("array"):
            return jsonify(countries)
        return render_template("register.html")
    else:
        # This POST method is also used by AJAX to validate user data without loading a new page after it
        # For making sure that request was made by AJAX
        request_xhr_key = request.headers.get("X-Requested-With")

        # For AJAX retrieve data in a bit different way
        if request_xhr_key and request_xhr_key == "XMLHttpRequest":
            data = request.get_json()
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")
            country = data.get("country")
            age = data.get("age")
            transport = data.get("transport")
            gender = data.get("gender")

        # In case if a bad guy trying to trick a web site
        else:
            username = request.form.get("username")
            email = request.form.get("email")
            password = request.form.get("password")
            confirm = request.form.get("confirm")
            country = request.form.get("country")
            age = request.form.get("age")
            transport = request.form.get("transport")
            gender = request.form.get("gender")
            # Values for a transport field
            transports = ["bike", "car", "plain", "boat", "no"]
            # Values for a gender input
            genders = ["male", "female", "other"]

            # Validating a username
            if not username or username.strip() == "":
                return apology("Please provide your username")
            elif re.search(EMOJI_PATTERN, username) or re.search(space_regex, username):
                return apology("Imojis or whitespaces are not allowed!")
            elif username.lower() == "admin" or username.lower() == "administrator":
                return apology("Such username is not allowed")
            elif len(username) > 127:
                return apology("Too long username")

            # Validating an email
            if not email or email.strip() == "":
                return apology("Please provide your email")
            elif not re.search(email_regex, email) or re.search(EMOJI_PATTERN, email):
                return apology("Please provide a valid email")
            elif len(email) > 255:
                return apology("Too long email")

            # Validating a password
            if not password or password.strip() == "":
                return apology("Please provide a password")
            elif not re.search(password_regex, password) or re.search(EMOJI_PATTERN, password):
                return apology("Please provide a valid password")

            # Validating a confirm
            if not confirm or confirm.strip() == "" or confirm != password:
                return apology("Your passwords do not match")

            # Validating a country
            if not country or country.strip() == "" or country.lower() not in countries:
                return apology("Please provide a valid country")

            #Validating an age
            if not age or age.strip() == "":
                return apology("Please provide your age")
            elif not age.isdigit() or int(age) < 1 or int(age) > 150:
                return apology("Please provide a valid number")

            if not transport or transport.strip() == "" or transport.lower() not in transports:
                return apology("Please specify your transport")

            if not gender or gender.strip() == "" or gender.lower() not in genders:
                return apology("Please specify your gender")

            country = country.lower()
            age = int(age)
            transport = transport.lower()
            gender = gender.lower()


        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = :username",
                          username=username)
        # If some user already register with such name
        if rows:
            if request_xhr_key and request_xhr_key == "XMLHttpRequest":
                return jsonify({"validated": False, "username": "Such username already exists"})
            else:
                return apology("Such username already exists")

        # Adding a user into a database and then remembering which user has registered
        session["user_id"] = db.execute("INSERT INTO users (username, email, hash, country, age, transport, gender) VALUES (:username, :email, :hashed, :country, :age, :transport, :gender)",
                        username=username, email=email, hashed=generate_password_hash(password), country=country, age=age, transport=transport, gender=gender)

        if request_xhr_key and request_xhr_key == "XMLHttpRequest":
            # All the user data is valid, return - true in order to redirect a user to a home page in JS
            return jsonify({"validated": True})
        else:
            # Redirect user which disabled JS to home page
            return redirect("/")


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    if request.method == "GET":
        return render_template("login.html")
    else:
        # This route with POST method is also used by AJAX to validate user data without loading
        # a new page after it

        # For making sure that request was made by AJAX
        request_xhr_key = request.headers.get("X-Requested-With")

        username = request.form.get("username")
        password = request.form.get("password")

        # In case if a bad guy disabled JS and submitted the form
        if not request_xhr_key or request_xhr_key != "XMLHttpRequest":
            # Ensure username is submitted and valid
            if not username or username.strip() == "" or len(username) > 127 or re.search(EMOJI_PATTERN, username) or re.search(space_regex, username):
                return apology("Please provide a valid username")
            # Ensure password was submitted and valid as well
            elif not password or password.strip() == "" or not re.search(password_regex, password) or re.search(EMOJI_PATTERN, password):
                return apology("Please provide a valid password")

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = :username",
                          username=username)

        # Validating and responding for AJAX

        # Ensure username exists
        if len(rows) != 1:
            if request_xhr_key and request_xhr_key == "XMLHttpRequest":
                return jsonify({"validated": False, "username": "Invalid username"})
            else:
                return apology("Invalid username")
        # Ensure a password is correct
        elif not check_password_hash(rows[0]["hash"], password):
            if request_xhr_key and request_xhr_key == "XMLHttpRequest":
                return jsonify({"validated": False, "password": "Your password is wrong"})
            else:
                return apology("Invalid password")

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]
        # Return a respective answer for AJAX or make redirection for disabled JS
        if request_xhr_key and request_xhr_key == "XMLHttpRequest":
            return jsonify({"validated": True})
        else:
            # Redirect user to home page
            return redirect("/")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/contact", methods=["GET", "POST"])
def contact():
    # User reached route via GET (as by clicking a link)
    if request.method == "GET":
        return render_template("contact.html")
    # User reached route via POST (as by submitting a form via POST) or AJAX was made
    else:
        # Get all the data
        fullname = request.form.get("fullname")
        email = request.form.get("email")
        subject = request.form.get("subject")
        message = request.form.get("message")

        # For making sure that request was made by AJAX
        request_xhr_key = request.headers.get("X-Requested-With")
        # Respond not for AJAX
        if not request_xhr_key or request_xhr_key != "XMLHttpRequest":
            # Actions for browsers that do not support JS or bad people who disabled it
            # Validating a fullname
            if not fullname or fullname.strip() == "":
                return apology("Please provide your username")
            elif re.search(EMOJI_PATTERN, fullname):
                return apology("Imojis are not allowed!")
            elif len(fullname) > 255:
                return apology("Too long username")

            # Validating an email
            if not email or email.strip() == "":
                return apology("Please provide your email")
            elif not re.search(email_regex, email) or re.search(EMOJI_PATTERN, email):
                return apology("Please provide a valid email")
            elif len(email) > 255:
                return apology("Too long email")

            # Validating a subject
            if not subject or subject.strip() == "":
                return apology("Please provide your username")
            elif re.search(EMOJI_PATTERN, subject):
                return apology("Imojis are not allowed!")
            elif len(subject) > 63:
                return apology("Too long username")

            # Validating a subject
            if not message or message.strip() == "":
                return apology("Please provide your message")
            elif re.search(EMOJI_PATTERN, message):
                return apology("Imojis are not allowed!")
            elif len(message) > 2047:
                return apology("Too long message")

            # Adding a message and relative data into a database
            db.execute("INSERT INTO messages (fullname, email, subject, message) VALUES (:fullname, :email, :subject, :message)",
                        fullname=fullname, email=email, subject=subject, message=message)
        # Return an corresponding response for AJAX or make redirection if JS was disabled
        if request_xhr_key and request_xhr_key == "XMLHttpRequest":
            return jsonify({"received": True})
        else:
            return redirect("/")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/shop")
@login_required
def shop():
    rows = db.execute("SELECT * FROM items")
    return render_template("shop.html", rows=rows)


@app.route("/profile", methods=["GET", "POST"])
@login_required
def profile():
    # Getting a user id
    user_id = session["user_id"]
    if request.method == "GET":
        rows = db.execute("SELECT * FROM items")
        user_data = db.execute("SELECT username, email, country, age, transport, gender, cash, all_cash FROM users WHERE id = :user_id", user_id=user_id)[0]
        return render_template("profile.html", rows=rows, user_data=user_data)
    else:
        # For making sure that request was made by AJAX
        request_xhr_key = request.headers.get("X-Requested-With")
        # Responses for different AJAXs
        if request_xhr_key and request_xhr_key == "XMLHttpRequest":
            data = request.get_json()
            if data.get("account"):
                user_purchases = db.execute("SELECT name, number FROM purchases JOIN items ON purchases.item_id = items.id WHERE purchases.user_id = :user_id",
                                                user_id=user_id)
                return jsonify(user_purchases)
            elif data.get("history"):
                history = db.execute("SELECT name, price, number, date FROM history JOIN items ON history.item_id = items.id WHERE history.user_id = :user_id",
                                        user_id=user_id)
                return jsonify(history)
            else:
                total = data.get("total")
                picked_items = data.get("items")
                cancelled_items = []
                rows = db.execute("SELECT * FROM items")
                for item_id in picked_items:
                    db_item_id = int(item_id) + 1
                    left_items = rows[int(item_id)]["current_number"] - picked_items[item_id]
                    if left_items >= 0:
                        # Update a number of item left in the shop
                        db.execute("UPDATE items SET current_number = :number WHERE id = :item_id", number=left_items, item_id=db_item_id)
                        # Check if a user has alredy bought such item before
                        bought_item = db.execute("SELECT * FROM purchases WHERE user_id = :user_id AND item_id = :item_id",
                                                    user_id=user_id, item_id=db_item_id)
                        if not bought_item:
                            # If a user has not bought such item yet, then add it to his purchases
                            db.execute("INSERT INTO purchases (user_id, item_id, number) VALUES (:user_id, :item_id, :number)",
                                            user_id=user_id, item_id=db_item_id, number=picked_items[item_id])
                        else:
                            # Else update the number of this item in purchases
                            db.execute("UPDATE purchases SET number = number + :number WHERE user_id = :user_id AND item_id = :item_id",
                                            number=picked_items[item_id], user_id=user_id, item_id=db_item_id)
                        # Insert into history this purchase
                        db.execute("INSERT INTO history (user_id, item_id, number) VALUES (:user_id, :item_id, :number)",
                                            user_id=user_id, item_id=db_item_id, number=picked_items[item_id])
                    else:
                        cancelled_items.append(int(item_id))
                        total -= rows[int(item_id)]["price"] * picked_items[item_id]

                if total != 0:
                    db.execute("UPDATE users SET cash = cash - :cash WHERE id = :user_id", cash=total, user_id=user_id)

                if cancelled_items:
                    return jsonify({"bought":False, "total":total, "cancelledItems":cancelled_items, "rows":rows})
                else:
                    return jsonify({"bought":True})


@app.route("/data-change", methods=["POST"])
@login_required
def data_change():
    # For making sure that request was made by AJAX
    request_xhr_key = request.headers.get("X-Requested-With")
    # Responses for different AJAXs
    if request_xhr_key and request_xhr_key == "XMLHttpRequest":
        data = request.get_json()
        # Getting a user id
        user_id = session["user_id"]
        if data.get("data") == "add":
            adding_cash = data.get("value")
            db.execute("UPDATE users SET cash = cash + :cash, all_cash = all_cash + :cash WHERE id = :user_id",
                        cash = adding_cash, user_id=user_id)
            return jsonify({'action':'add', 'cash':adding_cash})

        elif data.get("data") == "withdraw":
            withdraw_cash = data.get("value")
            db.execute("UPDATE users SET cash = cash - :cash, all_cash = all_cash - :cash WHERE id = :user_id",
                        cash = withdraw_cash, user_id=user_id)
            return jsonify({'action':'withdraw', 'cash':withdraw_cash})

        else:
            old_password = data.get("old_password")
            new_password = data.get("new_password")
            row = db.execute("SELECT * FROM users WHERE id = :user_id", user_id=user_id)[0]

            # Ensure a password is correct
            if not check_password_hash(row["hash"], old_password):
                return jsonify({"correct": False})
            else:
                db.execute("UPDATE users SET hash = :hashed WHERE id = :user_id",
                            hashed=generate_password_hash(new_password), user_id=user_id)
                return jsonify({"correct": True})


@app.route("/countries")
def countries():
    return send_file("templates/data/countries.txt")


@app.route("/shop-items", methods=["GET", "POST"])
@login_required
def items():
    # For making sure that request was made by AJAX
    request_xhr_key = request.headers.get("X-Requested-With")
    # Responses for different AJAXs
    if request_xhr_key and request_xhr_key == "XMLHttpRequest":
        # For method GET
        if request.method == "GET":
            if request.args.get("data") == "part8":
                return send_file("templates/data/part8.html")
            else:
                return send_file("templates/data/part16.html")
        # In POST request return only needed rows of items instead of just sending it all at once
        else:
            data = request.get_json()
            first = data["part4"]
            second = data["part8"]
            third = data["part12"]
            forth = data["part16"]
            fifth = data["part20"]
            sixth = data["part24"]
            return render_template("data/items.html", first=first, second=second, third=third, forth=forth, fifth=fifth, sixth=sixth)


@app.route("/solar-system")
def solar():
    return render_template("solar-system/solar-system.html")


@app.route("/sun")
def sun():
    return render_template("solar-system/sun.html")


@app.route("/mercury")
def mercury():
    return render_template("solar-system/mercury.html")


@app.route("/venus")
def venus():
    return render_template("solar-system/venus.html")


@app.route("/earth")
def earth():
    return render_template("solar-system/earth.html")


@app.route("/mars")
def mars():
    return render_template("solar-system/mars.html")


@app.route("/jupiter")
def jupiter():
    return render_template("solar-system/jupiter.html")


@app.route("/saturn")
def saturn():
    return render_template("solar-system/saturn.html")


@app.route("/uranus")
def uranus():
    return render_template("solar-system/uranus.html")


@app.route("/neptune")
def neptune():
    return render_template("solar-system/neptune.html")

@app.route("/pluto")
def pluto():
    return render_template("solar-system/pluto.html")

@app.route("/asteroid-belt")
def asteroid_belt():
    return render_template("solar-system/asteroid-belt.html")


@app.route("/comets")
def comets():
    return render_template("solar-system/comets.html")


@app.route("/precursors")
def precursors():
    return render_template("history/precursors.html", prev="/milestones", next_link="/early-rocket-development")


@app.route("/early-rocket-development")
def early_rocket_development():
    return render_template("history/early-rocket-development.html", prev="/precursors", next_link="/first-satellites")


@app.route("/first-satellites")
def satellites():
    return render_template("history/first-satellites.html", prev="/early-rocket-development", next_link="/first-human-spaceflights")


@app.route("/first-human-spaceflights")
def human_spaceflights():
    return render_template("history/first-human-spaceflights.html", prev="/first-satellites", next_link="/race-to-the-moon")


@app.route("/race-to-the-moon")
def moon_race():
    return render_template("history/race-to-the-moon.html", prev="/first-human-spaceflights", next_link="/space-stations")


@app.route("/space-stations")
def space_stations():
    return render_template("history/space-stations.html", prev="/race-to-the-moon", next_link="/space-shuttle")


@app.route("/space-shuttle")
def space_shuttle():
    return render_template("history/space-shuttle.html", prev="/space-stations", next_link="/milestones")


@app.route("/milestones")
def milestones():
    return render_template("history/milestones.html", prev="/space-shuttle", next_link="/precursors")


@app.route("/universe")
def universe():
    return render_template("universe/universe.html")


@app.route("/big-bang")
def big_bang():
    return render_template("universe/big-bang.html")


@app.route("/galaxy")
def galaxy():
    return render_template("universe/galaxy.html")


@app.route("/milky-way")
def milky_way():
    return render_template("universe/milky-way.html")


@app.route("/whirlpool")
def whirlpool():
    return render_template("universe/whirlpool.html")


@app.route("/andromeda")
def andromeda():
    return render_template("universe/andromeda.html")


@app.route("/sombrero")
def sombrero():
    return render_template("universe/sombrero.html")


@app.route("/black-hole")
def black_hole():
    return render_template("universe/black-hole.html")


@app.route("/cosmic-dust")
def cosmic_dust():
    return render_template("universe/cosmic-dust.html")


def errorhandler(e):
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)


# Listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)
