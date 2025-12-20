/**
 * Lexical Editor Styles for Shadow DOM Injection
 * These styles are extracted from index.css to be injected into the Shadow DOM
 */

export const lexicalStyles = `
  /* Lexical Theme Classes */
  .editor-placeholder {
    color: #9ca3af;
    overflow: hidden;
    position: absolute;
    text-overflow: ellipsis;
    top: 8px;
    left: 8px;
    font-size: 15px;
    user-select: none;
    display: inline-block;
    pointer-events: none;
  }

  .editor-paragraph {
    margin: 0;
    margin-bottom: 8px;
    position: relative;
  }

  .editor-text-bold {
    font-weight: bold;
  }

  .editor-text-italic {
    font-style: italic;
  }

  .editor-text-underline {
    text-decoration: underline;
  }

  .editor-text-strikethrough {
    text-decoration: line-through;
  }

  .editor-text-underlineStrikethrough {
    text-decoration: underline line-through;
  }

  .editor-text-code {
    background-color: rgb(240, 242, 245);
    padding: 1px 0.25rem;
    font-family: Menlo, Consolas, Monaco, monospace;
    font-size: 94%;
  }

  .editor-link {
    color: rgb(33, 111, 219);
    text-decoration: none;
  }

  .editor-link:hover {
    text-decoration: underline;
  }

  /* Editor Container Styles */
  .editor-container {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .editor-input {
    height: 100%;
    width: 100%;
    outline: none;
    padding: 8px;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }

  /* Reset and base styles for shadow DOM */
  * {
    box-sizing: border-box;
  }

  div {
    display: block;
  }
`;

export default lexicalStyles;
