# Flask Login Application - End-to-End Test Documentation

## Application Overview
This project is a **Flask-based Login Web Application** created as part of a Software Quality Analyst technical assessment.  
The application allows users to log in using an **email** and **password**, with the following requirements:

- **Successful Login**: Valid credentials redirect the user to the dashboard.
- **Invalid Credentials**: Shows an error message without reloading to a different page.
- **Password Rules**: Password must be at least 8 characters.
- **Account Lockout**: After 3 consecutive failed login attempts, the account is locked for 5 minutes.
- **Hardcoded Credentials**:  
  - Email: `user@example.com`  
  - Password: `password123`
- **UI Features**:  
  - Clean, modern login page using HTML templates and CSS.  
  - Inline validation for email format and password length via JavaScript.

---

## Login Feature Test Scenarios

| **Scenario ID** | **Type** | **Description** |
|-----------------|----------|-----------------|
| **S001** | Positive | User logs in with valid email and password credentials. |
| **S002** | Negative | User attempts to log in with incorrect email or password. |
| **S003** | Negative | User attempts to log in with password less than 8 characters. |
| **S004** | Edge Case | User account gets locked after 3 consecutive failed login attempts. |
| **S005** | Edge Case | User submits login form with empty email or password fields. |

---

## End-to-End Test Cases (Playwright POM)

| **Test Case ID** | **Objective** | **Test Steps** | **Expected Result** |
|------------------|---------------|----------------|---------------------|
| **TC001** | Verify successful login with valid credentials | 1. Navigate to the login page.<br>2. Enter `user@example.com` in the email field.<br>3. Enter `password123` in the password field.<br>4. Click the **Login** button. | User is redirected to the dashboard and sees the message **"Welcome to the Dashboard!"**. |
| **TC002** | Verify error message for invalid credentials | 1. Navigate to the login page.<br>2. Enter `user@example.com` in the email field.<br>3. Enter `wrongpass` in the password field.<br>4. Click the **Login** button. | User stays on the login page and sees the error message **"Invalid credentials. Please try again."**. |
| **TC003** | Verify password length validation (short password) | 1. Navigate to the login page.<br>2. Enter `user@example.com` in the email field.<br>3. Enter `short` in the password field.<br>4. Click the **Login** button. | User sees the error message **"Password must be at least 8 characters long."** and cannot proceed. |
| **TC004** | Verify account lockout after 3 failed login attempts | 1. Navigate to the login page.<br>2. Enter `user@example.com` in the email field and `wrongpass` in the password field.<br>3. Click the **Login** button.<br>4. Repeat steps 2–3 two more times (total 3 failed attempts).<br>5. Attempt login again with the same incorrect password. | User sees the error message **"Account locked. Try again later."** and is prevented from logging in for 5 minutes. |
| **TC005** | Verify error when submitting empty fields | 1. Navigate to the login page.<br>2. Leave both email and password fields blank.<br>3. Click the **Login** button. | User sees appropriate error messages indicating required fields. |

---

## Notes
- All tests are implemented in **Playwright** using **TypeScript** and follow the **Page Object Model (POM)** design pattern.
- Tests are located in the `tests/e2e/` directory.
- The `LOCK_DURATION` is set to `300` seconds (5 minutes) in the Flask app.
- Base URL: `http://127.0.0.1:5000/`
- The Playwright configuration is set up to generate HTML reports for test runs.

---
