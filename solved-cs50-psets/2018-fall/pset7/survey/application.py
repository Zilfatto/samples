import cs50
import csv
import os.path
from flask import Flask, jsonify, redirect, render_template, request

# Configure application
app = Flask(__name__)

# Reload templates when they are changed
app.config["TEMPLATES_AUTO_RELOAD"] = True


@app.after_request
def after_request(response):
    """Disable caching"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/", methods=["GET"])
def get_index():
    return redirect("/form")


@app.route("/form", methods=["GET"])
def get_form():
    return render_template("form.html")


@app.route("/form", methods=["POST"])
def post_form():
    # Putting obtained data from the user into dictionary
    data = {
        "name": request.form.get("name"),
        "country": request.form.get("country"),
        "age": request.form.get("age"),
        "transport": request.form.get("transport"),
        "device": request.form.get("device")
    }

    # Checking for erros. If the user didn't provide any input
    for item in data:
        if not data[item]:
            return render_template("error.html", message="You did not provide" + item)
    # Checking if a file exists
    isfile = os.path.isfile("survey.csv")

    # Adding data from the dictionary to a csv file
    with open("survey.csv", "a") as file:
        headers = ["name", "country", "age", "transport", "device"]
        writer = csv.DictWriter(file, fieldnames=headers)
        # If a file exists not add a header
        if not isfile:
            writer.writeheader()
        writer.writerow(data)
    return redirect("/sheet")


@app.route("/sheet", methods=["GET"])
def get_sheet():
    # Reading data from a file and putting it to html
    with open("survey.csv", "r") as file:
        reader = csv.DictReader(file)
        data = list(reader)
    return render_template("sheet.html", data=data)
