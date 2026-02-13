// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import getElementByStyle from '.';

describe('getElementByStyle', () => {
  let root: HTMLElement;

  // Helper to create a DOM structure before each test
  beforeEach(() => {
    // Clean up document body
    document.body.innerHTML = '';
    
    // Create a fresh root container
    root = document.createElement('div');
    document.body.appendChild(root);
  });

  it('should return an empty array if no elements match', () => {
    root.innerHTML = `
      <div style="color: blue">Item 1</div>
      <span style="color: green">Item 2</span>
    `;

    const result = getElementByStyle(root, 'color', 'red');
    expect(result).toHaveLength(0);
  });

  it('should find a direct child with matching style', () => {
    root.innerHTML = `
      <div id="target" style="color: red">Target</div>
      <div style="color: blue">Not Target</div>
    `;

    const result = getElementByStyle(root, 'color', 'rgb(255, 0, 0)');
    const target = document.getElementById('target');

    expect(result).toHaveLength(1);
    expect(result[0]).toBe(target);
  });

  it('should find deeply nested descendants', () => {
    root.innerHTML = `
      <div>
        <span style="font-size: 12px">Level 1</span>
        <div>
           <p id="deep-target" style="font-size: 16px">Level 2</p>
        </div>
      </div>
    `;

    const deepTarget = document.getElementById('deep-target');
    const result = getElementByStyle(root, 'font-size', '16px');

    expect(result).toContain(deepTarget);
  });

  it('should handle CSS property names in kebab-case (e.g., font-size)', () => {
    const span = document.createElement('span');
    span.style.fontSize = '20px'; // Set via JS property
    root.appendChild(span);

    // Search using CSS property string 'font-size'
    const result = getElementByStyle(root, 'font-size', '20px');
    
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(span);
  });

  it('should NOT return the root element even if it matches', () => {
    // The root itself has the target style
    root.style.color = 'red';
    
    // A child that also has the style
    const child = document.createElement('div');
    child.style.color = 'red';
    root.appendChild(child);

    const result = getElementByStyle(root, 'color', 'rgb(255, 0, 0)');
    // Should only find the child, not the root
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(child);
  });

  it('should correct handle standard color normalization (rgb)', () => {
    // Note: getComputedStyle usually converts named colors (like 'red') 
    // to 'rgb(255, 0, 0)' in JSDOM/Browsers.
    const div = document.createElement('div');
    div.style.color = 'rgb(255,0,0)'; // Blue
    root.appendChild(div);

    const result = getElementByStyle(root, 'color', 'rgb(255, 0, 0)');
    expect(result).toHaveLength(1);
  });
});