# ColorDocx

ColorDocx is a web application that lets you upload DOCX, PDF, or EPUB files and display their content with customizable text styling. You can apply different styles to the text, switch between dark and light themes, download the styled content as HTML or PDF, and even read the content in full-screen mode for a distraction-free experience.

## Features

- **File Upload:**  
  Supports DOCX, PDF, and EPUB files.

- **Text Styling:**  
  Choose from various styling options (underline, highlight, bold, italic) which are applied using a random color palette.

- **Theme Toggle:**  
  Switch easily between dark and light themes.

- **Download Options:**  
  - **Download HTML:** Saves the displayed content as an HTML file with embedded styles.  
  - **Download PDF:** Uses html2canvas and jsPDF to capture the full content and generate a PDF.

- **Full Screen Mode:**  
  Toggle full-screen view of the content for enhanced reading.

- **Responsive Design:**  
  Built with Bootstrap for a mobile-friendly, responsive layout.

## How It Works

1. **File Processing:**  
   - The application reads files using the FileReader API.
   - **DOCX files:** Converted to HTML using [Mammoth.js](https://github.com/mwilliamson/mammoth.js).
   - **PDF files:** Text is extracted using [PDF.js](https://mozilla.github.io/pdf.js/).
   - **EPUB files:** Processed using [epub.js](https://github.com/futurepress/epub.js).

2. **Styling:**  
   The extracted text is displayed in a content area where styling is applied based on user selection.

3. **Downloads:**  
   - **HTML Download:** The app embeds the current CSS styles into the HTML so that the look is preserved.
   - **PDF Download:** A clone of the full content is captured (removing scroll restrictions) and rendered into a PDF.

4. **Full Screen Mode:**  
   The application uses the Fullscreen API to toggle full-screen reading for the content area.

## Installation and Usage

1. **Clone or Download** the repository.

2. **Run on a Local Server:**  
   For full functionality (especially file reading and PDF generation), run the app via a local server. For example, you can use:

   - **VS Code Live Server Extension**
   - **Python HTTP Server:**
     ```bash
     python -m http.server 8000
     ```
   Then, open [http://localhost:8000](http://localhost:8000) in your browser.

3. **Using the App:**
   - **Upload a File:** Click the file input and select a DOCX, PDF, or EPUB file.
   - **Select a Style:** Choose a styling option (underline, highlight, bold, italic) from the dropdown.
   - **Display and Style:** Click the "Display and Style Text" button to process the file.
   - **Download:** Use the "Download HTML" or "Download PDF" buttons in the navbar to save your styled content.
   - **Full Screen:** Click the "Full Screen" button in the navbar to toggle a full-screen view of the content.
   - **Theme Toggle:** Switch between dark and light modes using the theme toggle button (🌗).

## Dependencies

- [Bootstrap 5](https://getbootstrap.com/)
- [html2canvas](https://html2canvas.hertzen.com/)
- [jsPDF](https://github.com/parallax/jsPDF)
- [Mammoth.js](https://github.com/mwilliamson/mammoth.js)
- [PDF.js](https://mozilla.github.io/pdf.js/)
- [epub.js](https://github.com/futurepress/epub.js)

## License

This project is licensed under the MIT License.

https://itcodelab.github.io/ColorDocx/
