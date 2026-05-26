# GitHub Explorer

A client-side GitHub profile explorer built with vanilla JavaScript. Enter a username and the app fetches the user profile, stats, and recent public repositories directly from the GitHub API.

## Features

- Search any public GitHub username.
- Load avatar, bio, location, follower counts, and repository totals.
- Display the most recent public repositories for the selected user.
- Open repositories directly from the results list.
- Try quick-pick example users with one click.
- Store recent searches in `localStorage` for a smoother repeat visit.
- Show clear loading and error states when the API fails or a user is not found.

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- GitHub REST API
- Browser `localStorage`

## How It Works

The app sends two API requests for each search: one for the user profile and one for the user’s repositories. The response data is then rendered into the profile card and repository list in the browser.

## Run Locally

1. Open `index.html` in your browser, or use a local server such as VS Code Live Server.
2. Search for a GitHub username or use one of the quick-pick buttons.

## Demo

https://youtu.be/-8Mqjd6fg4E?si=6tsHEIsx-XVe_L9B
