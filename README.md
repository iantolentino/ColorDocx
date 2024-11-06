# ColorDocx

ColorDocx is a web-based application designed to style and display text from DOCX and PDF documents with customizable color themes and formatting options. The application allows users to underline, highlight, bold, or italicize text and download the formatted content as HTML for later use.

## Features

1. **File Upload**: Upload DOCX or PDF files to display and style their content.
2. **Text Styling**: Choose from different styling options including underline, highlight, bold, and italic.
3. **Random Color Palette**: Each styling type is applied with a random color from a preset palette for visual variety.
4. **Dark/Light Theme Toggle**: Switch between light and dark modes with smooth color transitions.
5. **Download Styled Content**: Export the styled content as an HTML file, preserving colors and styling.

## Installation and Setup

This project requires no additional installation as it is a standalone HTML file that can run in any modern browser. 

1. Download the `index.html` file.
2. Open it in a browser to begin using the application.

## Usage

1. **Upload a File**:
   - Click on the "Upload" button and select a `.docx` or `.pdf` file.

2. **Select a Style**:
   - Choose the desired text style from the dropdown list (underline, highlight, bold, italic).

3. **Display and Style**:
   - Click "Display and Style Text" to apply the selected styling to the text.
   - The styled text will appear in the main content area.

4. **Download as HTML**:
   - Once you are satisfied with the styling, click "Download as HTML" to save the formatted content.

5. **Theme Toggle**:
   - Use the toggle button in the top-right corner to switch between light and dark themes.

## Code Overview

### Key Components

- **CSS Variables**: For dynamic theme handling, CSS variables are used to define primary, secondary, accent, and text colors for light and dark themes.
- **JavaScript Functions**:
  - `toggleTheme()`: Toggles between light and dark themes and saves the preference in `localStorage`.
  - `loadFile()`, `loadDocx()`, `loadPdf()`: Handle file uploads and extract content from DOCX and PDF files.
  - `applyPaletteStyles()`: Applies random colors to selected text styles.
  - `applyHeadingStyles()`, `applyBulletStyles()`: Customize heading and bullet colors for a consistent look.
  - `downloadHtml()`: Converts displayed content into an HTML file for download.

### Dependencies

This project uses:
- [Mammoth.js](https://cdnjs.com/libraries/mammoth) for DOCX-to-HTML conversion.
- [PDF.js](https://cdnjs.com/libraries/pdf.js) for PDF-to-text extraction.

### Error Handling

Alerts notify users if an error occurs during file loading or content processing.

## Future Enhancements

1. **Enhanced Text Parsing**: Improve text extraction for more accurate formatting across different document structures.
2. **Additional Styling Options**: Allow users to customize font sizes, colors, and line spacing.
3. **Advanced File Export Options**: Include additional file formats for download, such as DOCX or PDF.

## License

This project is licensed under the MIT License.
