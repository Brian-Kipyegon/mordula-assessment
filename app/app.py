from flask import Flask, render_template, request, redirect, url_for, flash
import time

app = Flask(__name__)
app.secret_key = "supersecretkey"  # Needed for flash messages

# Hardcoded credentials
VALID_EMAIL = "user@example.com"
VALID_PASSWORD = "password123"

# Tracking failed attempts and lock state
failed_attempts = {}
lock_time = {}
LOCK_DURATION = 300  # 5 minutes


@app.route("/", methods=["GET", "POST"])
def login():
    ip = request.remote_addr

    # Check if account is locked
    if ip in lock_time and time.time() < lock_time[ip]:
        flash("Account locked. Try again later.", "error")
        return render_template("login.html")

    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        if email == VALID_EMAIL and password == VALID_PASSWORD:
            failed_attempts[ip] = 0
            return redirect(url_for("dashboard"))
        else:
            failed_attempts[ip] = failed_attempts.get(ip, 0) + 1
            if failed_attempts[ip] >= 3:
                lock_time[ip] = time.time() + LOCK_DURATION
                flash("Account locked. Try again later.", "error")
                return render_template("login.html")
            flash("Invalid credentials. Please try again.", "error")

    return render_template("login.html")


@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


if __name__ == "__main__":
    app.run(debug=True)
