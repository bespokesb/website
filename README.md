# BeSpoke Integrated Sdn Bhd – Landing Page

- Live website: https://bespokesb.com
- Tech stack: HTML5, CSS3, Vanilla JavaScript
- Features: bilingual (BM/EN), responsive layout, smooth animations, contact form validation

## Overview
This repository contains a modern, attention‑grabbing landing page for BeSpoke Integrated Sdn Bhd. It highlights the company’s core services (SaaS, Server Tuning, Deployment, Custom Web Apps, Mobile Apps, IT Training), and includes complete contact details and a bilingual experience in Bahasa Melayu (BM) and English (EN).

## Quick Start
- Open `index.html` directly in any web browser.
- Use the language toggle (EN/BM) in the header to switch content.
- Optional: serve locally with any static server if preferred.

## Project Structure
- `index.html` – page markup and content sections (Hero, Services, About, Contact, Footer)
- `styles.css` – modern responsive styling and animations
- `script.js` – language toggle, smooth scrolling, form validation, interactive effects

## Editing Content
- Company details (address, phone, email) are located in the Contact and Footer sections of `index.html`.
- Services text and headings are in the Services section of `index.html`.
- To change hero headings or descriptions, edit the elements in `index.html` that include `data-en` and `data-bm` attributes.

## Bilingual (BM/EN) Content
- Translatable elements in `index.html` include `data-en` and `data-bm` attributes.
- The language toggle updates text on the page and remembers the preference using `localStorage`.
- Form placeholders are mapped via the `translations` object in `script.js`. To add new placeholders, extend that object accordingly.

## Deployment
This is a static site and can be deployed on any static hosting provider (e.g., Netlify, Vercel, GitHub Pages, AWS S3). Upload the three files (`index.html`, `styles.css`, `script.js`) and configure your host to serve them from the site root.

## Contact
- Address: F-05-06, 5th Floor, Block F, StarParc Point, Jln Taman Ibu Kota, 53300 Kuala Lumpur
- Phone: 017-2388058
- Email: info@bespokesb.com
