    let styledContent = "";

    // Toggle dark/light theme
    function toggleTheme() {
      document.body.classList.toggle("dark-theme");
      localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
    }
    document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.remove("dark-theme");
    } else {
        // Default to dark mode (if no preference or 'dark' is saved)
        document.body.classList.add("dark-theme");
        // Save dark mode as default if no preference exists
        if (!savedTheme) {
        localStorage.setItem("theme", "dark");
        }
    }
    });
    function setLoading(show) {
      document.getElementById("loading").style.display = show ? "block" : "none";
    }

    // Main file loader (supports DOCX, PDF, and EPUB)
    function loadFile() {
      const input = document.getElementById("upload");
      if (!input.files.length) {
        alert("Please select a DOCX, PDF, or EPUB file first.");
        return;
      }
      setLoading(true);
      const file = input.files[0];
      const fileName = file.name.toLowerCase();
      if (fileName.endsWith(".docx")) {
        loadDocx(file);
      } else if (fileName.endsWith(".pdf")) {
        loadPdf(file);
      } else if (fileName.endsWith(".epub")) {
        loadEpub(file);
      } else {
        alert("Unsupported file format.");
        setLoading(false);
      }
    }

    // Load DOCX using Mammoth
    function loadDocx(file) {
      const reader = new FileReader();
      reader.onload = event => {
        mammoth.convertToHtml({ arrayBuffer: event.target.result })
          .then(displayResult)
          .catch(handleError);
      };
      reader.readAsArrayBuffer(file);
    }

    // Load PDF using PDF.js
    async function loadPdf(file) {
      const reader = new FileReader();
      reader.onload = async event => {
        try {
          const pdf = await pdfjsLib.getDocument({ data: event.target.result }).promise;
          let pdfText = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            pdfText += textContent.items.map(item => item.str).join(" ") + "\n";
          }
          displayResult({ value: pdfText });
        } catch (error) {
          handleError(error);
        }
      };
      reader.readAsArrayBuffer(file);
    }

    // Load EPUB using epub.js
    async function loadEpub(file) {
      const reader = new FileReader();
      reader.onload = async event => {
        try {
          const book = ePub(event.target.result);
          await book.ready;
          const spine = await book.loaded.spine;
          let epubText = "";
          for (const chapter of spine.items) {
            try {
              const content = await chapter.load(book.resources);
              epubText += content.document.body.innerText + "\n\n";
              chapter.unload();
            } catch (err) {
              console.error("Chapter error:", err);
            }
          }
          displayResult({ value: epubText });
        } catch (err) {
          console.error("EPUB error:", err);
          alert("An error occurred while processing the EPUB file.");
        } finally {
          setLoading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    }

    // Apply styling and display content
    function displayResult(result) {
      const contentDiv = document.getElementById("content");
      contentDiv.innerHTML = result.value;
      styledContent = contentDiv.innerHTML;
      const paragraphs = contentDiv.querySelectorAll("p");
      applyPaletteStyles(paragraphs, document.getElementById("textStyle").value);
      applyCommonStyles(contentDiv);
      setLoading(false);
    }

    function applyPaletteStyles(paragraphs, styleType) {
      const palette = ["#FF6347", "#4682B4", "#32CD32", "#FFD700", "#DA70D6"];
      paragraphs.forEach(p => {
        const color = palette[Math.floor(Math.random() * palette.length)];
        if (styleType === "underline") {
          p.style.textDecoration = "underline";
          p.style.textDecorationColor = color;
        } else if (styleType === "highlight") {
          p.style.backgroundColor = color;
        } else if (styleType === "bold") {
          p.style.fontWeight = "bold";
          p.style.color = color;
        } else if (styleType === "italic") {
          p.style.fontStyle = "italic";
          p.style.color = color;
        }
      });
    }

    function applyCommonStyles(div) {
      div.querySelectorAll("h1, h2, h3, h4").forEach(el => {
        el.style.color = "var(--heading-color)";
        el.style.fontWeight = "bold";
      });
      div.querySelectorAll("ul").forEach(el => el.style.color = "var(--bullet-color)");
    }

    // Download as HTML with embedded styles by cloning the <style> block
    function downloadHtmlContent() {
      if (!styledContent) {
        alert("No content to download.");
        return;
      }
      const styleTag = document.querySelector("head style") ? document.querySelector("head style").outerHTML : "";
      const fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Downloaded Content</title>
          ${styleTag}
        </head>
        <body>
          ${styledContent}
        </body>
        </html>
      `;
      const blob = new Blob([fullHtml], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "StyledContent.html";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    // Download as PDF by cloning content, removing scroll restrictions, and capturing full content
    function downloadPdfContent() {
      if (!styledContent) {
        alert("No content to download.");
        return;
      }
      const originalContent = document.getElementById("content");
      const contentClone = originalContent.cloneNode(true);
      // Remove height and overflow restrictions to capture full content
      contentClone.style.maxHeight = "none";
      contentClone.style.overflowY = "visible";
      // Position the clone off-screen
      contentClone.style.position = "absolute";
      contentClone.style.top = "-10000px";
      document.body.appendChild(contentClone);
      
      html2canvas(contentClone).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("StyledContent.pdf");
        document.body.removeChild(contentClone);
      });
    }

    // New: Toggle full-screen mode for reading content
    function toggleFullScreen() {
      const content = document.getElementById("content");
      if (!document.fullscreenElement) {
        content.requestFullscreen().catch(err => {
          alert(`Error enabling full-screen mode: ${err.message} (${err.name})`);
        });
      } else {
        document.exitFullscreen();
      }
    }

    function handleError(error) {
      console.error(error);
      alert("An error occurred while processing the file.");
      setLoading(false);
    }

    (function() {
      const fileInput = document.getElementById('upload');
      const fileNameSpan = document.getElementById('fileNameDisplay');
      if (fileInput && fileNameSpan) {
        fileInput.addEventListener('change', function(e) {
          if (fileInput.files.length > 0) {
            let name = fileInput.files[0].name;
            if (name.length > 30) name = name.slice(0, 20) + '…' + name.slice(-10);
            fileNameSpan.textContent = name;
          } else {
            fileNameSpan.textContent = 'no file chosen';
          }
        });
      }
    })();
