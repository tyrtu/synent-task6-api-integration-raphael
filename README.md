# GitHub Explorer

A small client-side application to look up GitHub user profiles and repositories.

## Features
- Search for a GitHub username and view profile details
- List public repositories for the user with basic metadata
- Loading and error states for a smoother UX
- Saves recent searches locally for quick recall

## Tech
- Vanilla HTML, CSS, and JavaScript (no build step)
- Uses the GitHub REST API (no authentication required for public data)

## Run locally
You can open index.html directly in the browser, or run a simple file server for correct fetch behavior:

Python 3 (recommended):

```bash
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Or with Node (http-server):

```bash
npm install -g http-server
http-server -c-1
# then open the shown URL in your browser
```

## Usage
- Type a GitHub username into the search box and submit
- Click a repository to view basic details
- Recent searches are stored locally in your browser

## Notes
- This project uses only public GitHub endpoints; if you encounter rate limits, try again later or use an authenticated token in a development fork.

## License
MIT
