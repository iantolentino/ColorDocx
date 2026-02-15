# ColorDocx

ColorDocx is a web-based document reader and formatter optimized for **DOCX and EPUB** files. It allows users to upload documents and read them with customizable text styling, theme controls, and export options. While PDF files are supported, **PDF rendering and formatting are inherently unreliable** due to the limitations of text extraction and layout preservation.

---

## Primary Focus

- **DOCX:** High-fidelity conversion with reliable structure and styling.
- **EPUB:** Native reflowable reading experience, ideal for long-form content.
- **PDF:** Supported for basic text extraction only; formatting accuracy is not guaranteed.

---

## Features

- **Document Upload**
  - Optimized support for DOCX and EPUB
  - Limited, best-effort support for PDF

- **Text Styling**
  - Apply underline, highlight, bold, and italic
  - Styles are applied using a randomized color palette for visual distinction

- **Theme Management**
  - Toggle between light and dark reading modes

- **Export Options**
  - **HTML Export:** Preserves applied styles with embedded CSS
  - **PDF Export:** Renders current content state via canvas capture

- **Full-Screen Reading**
  - Distraction-free reading using the Fullscreen API

- **Responsive UI**
  - Mobile-friendly layout built with Bootstrap

---

## Architecture Overview

### File Processing
- Files are read using the FileReader API.
- **DOCX:** Converted to semantic HTML using Mammoth.js.
- **EPUB:** Rendered using epub.js with native flow and pagination.
- **PDF:** Text extracted via PDF.js (layout and spacing may degrade).

### Rendering & Styling
- Parsed content is injected into a controlled reading container.
- Styling actions are applied dynamically without mutating source content.

### Export Pipeline
- **HTML:** Inline styles are injected to ensure visual parity.
- **PDF:** The rendered DOM is cloned, expanded, and rasterized before PDF generation.

### Full-Screen Mode
- Uses the browser Fullscreen API scoped to the reading container.

---

## Installation & Usage

### Setup
1. Clone or download the repository.
2. Serve the project via a local web server.

**Example (Python):**
```bash
python -m http.server 8000
````

Open `http://localhost:8000` in your browser.

---

### Using the Application

1. Upload a DOCX, EPUB, or PDF file.
2. Select a text styling option.
3. Render the document.
4. Toggle theme or full-screen mode as needed.
5. Export the styled content as HTML or PDF.

---

## Dependencies

* Bootstrap 5
* html2canvas
* jsPDF
* Mammoth.js
* PDF.js
* epub.js

---

## Known Limitations

* PDF formatting may be inconsistent or lossy.
* Complex PDF layouts (tables, columns, forms) are not reliably preserved.
* DOCX and EPUB provide the most stable and predictable results.

---

## License

MIT License

---

## Live Demo

[https://iantolentino.github.io/ColorDocx/](https://iantolentino.github.io/ColorDocx/)
