# Typing Analyzer

A modern **Typing Speed Analyzer Web App** with login functionality, multiple difficulty levels, and real-time performance tracking. This project helps users improve their typing speed and accuracy through interactive practice.

---

## Project Overview

This application allows users to:

- Create an account and log in  
- Practice typing using different difficulty levels  
- Track typing speed (WPM), accuracy, and time  
- View final performance results after completion  

It provides a complete typing test experience with analytics.

---

## Problem Statement

To build an interactive system that measures typing performance and helps users improve speed and accuracy through structured practice.

---

## Features

- User **Signup & Login system** :contentReference[oaicite:0]{index=0}  
- Multiple difficulty levels: Easy, Medium, Hard :contentReference[oaicite:1]{index=1}  
- Real-time typing stats:
  - Time tracking  
  - Speed (Words Per Minute)  
  - Accuracy percentage  
- Paragraph-based typing test (5 levels per difficulty)  
- Reset, Stop, and Continue functionality  
- Final result popup with performance feedback  
- Data saving via backend API (localhost)  

---

## Application Flow

1. User signs up or logs in  
2. Selects difficulty level  
3. Starts typing the given paragraph  
4. System tracks:
   - Time  
   - Speed (WPM)  
   - Accuracy  
5. On completion:
   - Final result is displayed  
   - Performance message is shown  

---

## How It Works

### Speed Calculation
- Based on total characters typed  
- Formula: `Words = Total Characters / 5`  

### Accuracy Calculation
- Compares typed input with original text  
- Calculates percentage of correct characters  

### Paragraph Progression
- Moves to next paragraph automatically after completion  
- Ends test after all paragraphs are completed  

---

## Tech Stack

- HTML  
- CSS :contentReference[oaicite:2]{index=2}  
- JavaScript :contentReference[oaicite:3]{index=3}  
- Backend API (for login & data storage)  

---

## Project Structure

```text
typing-analyzer/
  index.html
  style.css
  script.js
```

## Output

- Real-time typing statistics  

- Final result summary including:
  - Total words typed  
  - Time taken  
  - WPM (speed)  
  - Accuracy  

- Performance feedback message  

---

## Future Improvements

- Add leaderboard system  
- Store user history and progress  
- Add more dynamic paragraphs (API-based)  
- Improve UI animations and themes  

---

## Developer

**Grishma C.D**
