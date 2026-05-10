# Green Card Guide

A static informational website in Turkish that helps users navigate the US DV Lottery (Green Card) application process. Built with plain HTML, CSS, and JavaScript — no server or build step required.

## Contents

```
greencard-guide/
├── index.html              # Home page (countdown, statistics, news)
├── guide.html              # Step-by-step application guide
├── documents.html          # Filterable document checklist
├── belgeler-detay.html     # Document detail page
├── faq.html                # FAQ (accordion layout)
├── contact.html            # Contact form (mailto)
├── sitemap.xml
├── robots.txt
├── css/
│   └── style.css
├── js/
│   ├── components.js       # Navbar/footer loader
│   └── site.js             # News and document management
├── templates/
│   ├── navbar.html
│   └── footer.html
└── data/
    └── news.json           # News content (edit to update)
```

## Requirements

- A modern web browser
- A local HTTP server (required for the component system to load templates via `fetch`)

## Run

**Option 1: Python**
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

**Option 2: VS Code Live Server**

Right-click `index.html` → Open with Live Server.

## Usage

The site has five main sections accessible from the navbar: home, guide, documents, FAQ, and contact. News is loaded dynamically from `data/news.json` — edit that file to add or update news items. The document list is filterable by marital status, number of children, and education level.

## Notes

- All processing is client-side — no data is collected or sent anywhere.
- No cookies or analytics.
- This site is for informational purposes only. For official Green Card information, visit [travel.state.gov](https://travel.state.gov).

## Author

Abdülsamet Akan

## License

[MIT](https://opensource.org/licenses/MIT)
