/**
 * Markdown Slide Splitter & HTML Renderer Engine
 */

function parseMarkdownSlides(markdownContent) {
  if (!markdownContent || typeof markdownContent !== 'string') return [];

  // Split slides by '---' delimiter
  const rawSlides = markdownContent.split(/\n---\n/);
  
  return rawSlides.map((slideText, index) => {
    const trimmed = slideText.trim();
    const titleMatch = trimmed.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : `Slide ${index + 1}`;

    // Extract speaker notes if any (e.g. Note: Remember to emphasize key metrics)
    let notes = [];
    const notesMatch = trimmed.match(/Note:\s*(.+)$/gm);
    if (notesMatch) {
      notes = notesMatch.map(n => n.replace(/^Note:\s*/i, '').trim());
    }

    // Convert basic markdown tags
    let html = trimmed
      .replace(/Note:\s*(.+)$/gm, '') // Strip notes from main slide content
      .replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')
      .replace(/^##\s+(.+)$/gm, '<h2>$2</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^-\s+(.+)$/gm, '<li>$1</li>');

    return {
      index,
      title,
      content: html,
      speakerNotes: notes
    };
  });
}

function generateFullscreenScript() {
  return `
    document.addEventListener('keydown', (e) => {
      if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
    });
  `;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { parseMarkdownSlides, generateFullscreenScript };
}
