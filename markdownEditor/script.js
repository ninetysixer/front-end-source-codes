// Function to update the preview section with formatted HTML
function updatePreview() {
  const editor = document.getElementById('editor');
  const preview = document.getElementById('preview');

  const markdown = editor.value;
  const formattedHTML = convertMarkdownToHTML(markdown);

  preview.innerHTML = formattedHTML;
}

// Function to convert Markdown text to HTML
function convertMarkdownToHTML(markdown) {
  // Markdown to HTML conversion logic
  // Implement your own parsing logic here using regular expressions or a library like Marked.js or Showdown.js
  // This is a simple example using regular expressions for demonstration purposes
  const boldRegex = /(\*\*|__)(.*?)\1/g;
  markdown = markdown.replace(boldRegex, (match, bold, content) => {
    return `<strong>${content}</strong>`;
  });

  return markdown;
}

// Function to apply or remove bold styling to the entire editor's content
function applyBold() {
  const editor = document.getElementById('editor');
  const content = editor.value;

  // Check if the entire content is already bold
  const isAlreadyBold = (content.indexOf('**') === 0 && content.lastIndexOf('**') === content.length - 2);

  let styledText = '';
  if (isAlreadyBold) {
    // Remove the existing bold formatting
    styledText = content.substring(2, content.length - 2);
  } else {
    // Apply bold formatting to the entire content
    styledText = `**${content}**`;
  }

  // Replace the entire content with the styled text
  editor.value = styledText;
  editor.focus();

  updatePreview();
}

// Function to apply selected font to the preview section
function applyFont() {
  const preview = document.getElementById('preview');
  const fontSelect = document.getElementById('fontSelect');
  const selectedFont = fontSelect.value;

  preview.style.fontFamily = selectedFont;

  updatePreview();
}

// Function to open the save window for choosing file name and location
function openSaveWindow() {
  const editorContent = document.getElementById('editor').value;

  // Create a new Blob object with the editor content
  const blob = new Blob([editorContent], { type: 'text/plain' });

  // Open the save window for choosing file name and location
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'myFile.txt'; // Default filename, change it as desired
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
}
