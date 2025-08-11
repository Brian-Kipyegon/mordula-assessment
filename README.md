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
| **TC003** | Verify account lockout after 3 failed login attempts | 1. Navigate to the login page.<br>2. Enter `user@example.com` in the email field and `wrongpass` in the password field.<br>3. Click the **Login** button.<br>4. Repeat steps 2–3 two more times (total 3 failed attempts).<br>5. Attempt login again with the same incorrect password. | User sees the error message **"Account locked. Try again later."** and is prevented from logging in for 5 minutes. |

---

## Bug Report

**Bug Title:** Valid credentials redirect back to login page without error  

**Jira Link:** [SQT-1](https://doesnment-team.atlassian.net/browse/SQT-1)  

**Description:**  

**Steps to Reproduce:**  
1. Navigate to the login page (`http://localhost:5000/login`).  
2. Enter valid email credentials: `user@example.com`.  
3. Enter valid password: `password123`.  
4. Click the **Login** button.  
5. Observe the page behaviour.  

**Expected Result:**  
- User should be successfully authenticated.  
- User should be redirected to the dashboard page (`/dashboard`).  
- Dashboard should display a welcome message with the user’s email.  
- A success message `"Login successful!"` should be shown.  

**Actual Result:**  
- User is redirected back to the login page (`/login`).  
- No error message is displayed.  
- No success message is shown.  
- User remains unauthenticated.  
- Dashboard is not accessible.  

**Additional Information:**  
- Issue occurs consistently with all valid credential combinations.  
- Browser network tab shows successful POST request to `/login` endpoint.  
- No JavaScript console errors observed.  
- Session data appears to not be persisting correctly.  
- Affects all test user accounts:  
  - `user@example.com`  
  - `admin@test.com`  
  - `john.doe@company.com`  

**Priority:** High  
**Labels:** login, critical, regression  
**Status:** Open  
**Reported By:** QA Tester  

---

## Question 3 – Agile Scenario Task (Summary)

As part of the sprint team, the following Jira issues were assigned:  
- **Feature-101:** Implement login  
- **Bug-208:** Login redirects to wrong page  
- **Task-330:** Create regression test suite  

**Workflow Summary:**
1. **Sprint Planning:**  
   - Reviewed user stories and clarified acceptance criteria for Feature-101.  
   - Identified potential risk areas and created QA subtasks (test case creation, manual testing, automation).  

2. **During Development:**  
   - Wrote test cases in parallel while developers worked on implementation.  
   - Linked test cases to Jira stories for traceability.  

3. **Testing Phase:**  
   - Executed manual test cases for Feature-101 once a testable build was available.  
   - Logged Bug-208 in Jira with detailed reproduction steps and linked it to Feature-101.  

4. **Bug Verification & Regression:**  
   - Retested Bug-208 after fix, ensuring no regression in related features.  
   - Updated Task-330 by adding critical scenarios to the regression suite.  

5. **Tracking & Collaboration:**  
   - Updated test case statuses in Jira immediately after execution (Pass, Fail, Blocked).  
   - Used a Jira dashboard to track progress with filters for “QA Coverage” and “Defect Status”.  
   - Collaborated with developers via daily stand-ups and Jira comments to resolve issues quickly.

**Outcome:**  
This approach ensured clear communication, full test coverage visibility on the Jira board, and quick turnaround on bug fixes while maintaining sprint timelines.


## Notes
- All tests are implemented in **Playwright** using **TypeScript** and follow the **Page Object Model (POM)** design pattern.
- Tests are located in the `tests/e2e/` directory.
- The `LOCK_DURATION` is set to `300` seconds (5 minutes) in the Flask app.
- Base URL: `http://127.0.0.1:5000/`
- The Playwright configuration is set up to generate HTML reports for test runs.

---
