# Design Template
all rights reserved
Link: https://design-template-1rg9.onrender.com

## Table of Contents

1. [Description](#description)
2. [Colour Picker](#colour-picker)
3. [Font Picker](#font-picker)
4. [Font Scale](#font-scale)
5. [Spacing Scale](#spacing-scale)
6. [Buttons](#buttons)
7. [Logo](#logo)
8. [Border Radius](#border-radius)
9. [Development](#development)
10. [Tools](#tools)

---

## Description

I created this project out of a need for a more visual, flexible design process. As a highly visual designer, I found that most design software didn't offer the kind of real-time, side-by-side comparison I wanted for fonts, colors, border radii, type scales, and spacing systems. Designing can be tedious when you can't see all your options at once. This tool lets me quickly draft and visualize every aspect of a design system, so I can experiment with different fonts, color palettes, and styles to find the perfect combination for my projects.

## Colour Picker

Some features I always wanted in a color picker:

- **Accessibility Chart:** Instantly check color contrast for accessibility without manually testing dozens of combinations.
- **Full Copy & Paste for Code:** Easily copy CSS variables for your palette—no more tedious manual copying.
- **Easy Delete & Copy:** Quickly remove or duplicate colors. Most programs make this frustrating, especially when testing for accessibility.
- **Effortless Color Changes:** Instantly update any color in your palette.
- **Multiple Palette Options:** Compare up to three colorways at once to see what feels right.
- **Categorized Colors:** Organize colors by type (Grey, Main, Accent, Extra) and see them all together for a cohesive look. Most online pickers only show a handful of colors, which isn't enough for real UI work.

## Font Picker

Choosing fonts can be a challenge, especially when you want to see header and body fonts together. I imported a wide range of Google Fonts so I can easily add or swap fonts without searching every time. This makes it simple to compare and find the best pairings for any project.

## Font Scale

Fonts can look very different at the same size, and getting the balance right is tricky. This tool lets me manually adjust and preview type scales, line heights, letter spacing, font color, and text transform—all in one place. No more guesswork, just visual feedback as I tweak each setting.

## Spacing Scale

I wanted a clear, visual way to see how my spacing system works. The chart lets me adjust the base spacing (like 1rem) and instantly see all the steps update, making it easy to create a consistent rhythm throughout my designs.

## Buttons

The buttons use the main font selected in the font picker. Primary, secondary, and tertiary buttons are fully customizable, and you can copy the CSS for any style you create. This makes it easy to keep your UI consistent and export-ready.

## Logo

The logo is a key part of brand identity. Being able to upload and preview a logo helps me make design decisions in context, and iterate quickly as ideas evolve.

## Border Radius

Border radius can dramatically change the feel of a design—from playful to serious. This tool lets me experiment with different radii and instantly see how they affect the overall look, helping me find the right balance for each project.

## Development

I started by mapping out all the components I wanted: color picker, font picker, etc. I knew everything needed to be passed down to a central visual display, so I built a dedicated component for that. The display uses every design token—buttons, headings, spacing, and more. As the project grew, I realized saving everything to a database for future reference would be a huge help.

## Tools

- Next.js
- MongoDB
