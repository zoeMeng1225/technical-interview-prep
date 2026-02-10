# Technical Interview Prep

This repository contains my solutions and design documents for frontend technical interviews.

## 🏗️ System Design

- [Autocomplete](./system-design/autocomplete.md): Handling race conditions and debouncing.
- [News Feed](./system-design/news-feed.md):Architecture for infinite scroll, cursor-pagination, and data normalization.

## 💻 Machine Coding

- [Autocomplete](./machine-coding/autocomplete/index.tsx): React implementation with AbortController.
- [ClassNames II](./machine-coding/classNamesII): A custom implementation of the classnames utility with deduplication and recursion support.
- [News Feed](./machine-coding/news-feed/index.tsx):Infinite scroll implementation using Intersection Observer and Custom Hooks.
- [List Format](./machine-coding/listFormat/index.tsx): A utility to format string lists into natural language with support for sorting, deduplication, and truncation.
- [Throttle](./machine-coding/throttle/index.tsx):A high-performance throttle utility supporting leading/trailing execution options and cancellation.
- [Type Utilities II](./machine-coding/typeUtilitiesII/index.ts): A collection of robust type-checking functions (`isArray`, `isPlainObject`, etc.) handling edge cases like prototypes and iframes.
- [Debounce](/machine-coding/debounce/index.tsx):A utility to limit the rate at which a function is executed, ensuring it only runs after a specified delay. Features TypeScript generics for type safety and `this` context preservation.
- [Event Emitter](./machine-coding/event-emitter/index.ts): A Node.js-style implementation of the Publish-Subscribe pattern. Features method chaining (`.on().on()`), type safety, and robust listener management.
- [Deep Clone](./machine-coding/deep-clone/index.ts): A robust utility for recursively copying nested objects and arrays. Features TypeScript generics for type retention and ensures complete reference decoupling.
- [Promise.all](./machine-coding/promiseAll/index.ts): A robust polyfill for the native Promise.all method. Features parallel execution, strict order preservation, fail-fast error handling, and TypeScript generics support.

## 🚀 How to Run Tests

This project uses **Vitest** for unit testing.

1. Install dependencies:
   ```bash
   npm install
   ```
