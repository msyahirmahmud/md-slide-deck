const assert = require('assert');
const { test, describe } = require('node:test');
const { parseMarkdownSlides, generateFullscreenScript } = require('../parser.js');

describe('Markdown Slide Deck Unit Tests', () => {
  test('splits markdown by horizontal rule delimiter', () => {
    const md = "# Slide 1\nHello\n---\n# Slide 2\nWorld";
    const slides = parseMarkdownSlides(md);
    assert.strictEqual(slides.length, 2);
    assert.strictEqual(slides[0].title, 'Slide 1');
    assert.strictEqual(slides[1].title, 'Slide 2');
  });

  test('generateFullscreenScript outputs presentation script', () => {
    const script = generateFullscreenScript();
    assert.strictEqual(script.includes("requestFullscreen"), true);
  });

  test('converts basic markdown formatting tags', () => {
    const md = "# Title\n**Bold Text** and *Italic*";
    const slides = parseMarkdownSlides(md);
    assert.strictEqual(slides[0].content.includes('<h1>Title</h1>'), true);
    assert.strictEqual(slides[0].content.includes('<strong>Bold Text</strong>'), true);
  });

  test('handles empty input gracefully', () => {
    assert.deepStrictEqual(parseMarkdownSlides(''), []);
    assert.deepStrictEqual(parseMarkdownSlides(null), []);
  });
});
