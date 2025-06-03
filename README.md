# Nexo MDX Editor

A React-based Markdown editor with TypeScript support, built with shadcn UI and Tailwind CSS

[![npm version](https://badge.fury.io/js/nexo-mdx.svg)](https://www.npmjs.com/package/nexo-mdx)
[![NPM Downloads](https://img.shields.io/npm/dy/nexo-mdx)](https://www.npmjs.com/package/nexo-mdx)

## Features

- **React Component**: Easily integratable Markdown editor
- **TypeScript Support**: Fully typed for better developer experience
- **Accessibility**: Native textarea support for form accessibility
- **Comprehensive Markdown**: Full CommonMark specification support
- **Customizable UI**: Pluggable function bars and complete UI control
- **Theme Integration**: Built with Shadcn UI components, inherits your Tailwind/Shadcn UI theme
- **Extensible**: Supports [remark plugins](https://github.com/kanakkholwal/remark-plugs) for additional functionality

## Installation

Choose your preferred package manager:

```bash
npm install nexo-mdx --save
# or
bun install nexo-mdx
# or
pnpm add nexo-mdx
```

## Basic Usage

- Follow these steps to integrate nexo-mdx into your project:
- Import the Editor: Import NexoMdxEditor from the package.
- Manage State: Utilize React's state management to handle the editor's content.
- Render the Editor: Include the editor component in your JSX.

## Overwriting default style

```css
/* Applying */
.nexo-mdx-editor{
    @apply ...;
}
.nexo-mdx-editor .editor-container{
    @apply ...;
}
.nexo-mdx-editor .editor-container textarea{
    @apply ...;
}
.nexo-mdx-editor .toolbar{
    @apply ...;
}
.nexo-mdx-editor .toolbar .toolbar_left{
    @apply ...;
}
.nexo-mdx-editor .toolbar .toolbar_left .toolbar_preview_icon{
    @apply ...;
}
.nexo-mdx-editor .toolbar .toolbar_left .toolbar_preview_title{
    @apply ...;
}
.nexo-mdx-editor .toolbar .toolbar_left .toolbar_preview_description{
    @apply ...;
}
.nexo-mdx-editor .toolbar .toolbar_right {
    @apply ...;
}
.nexo-mdx-editor .toolbar .toolbar_left p svg{
    @apply ..;
}
.nexo-mdx-editor .toolbar .button{
    @apply ...;
}
```

```jsx editor.jsx


import React, { useState } from 'react';
import MdxEditor from 'nexo-mdx';

export function Editor() {
  const [mdValue, setMdValue] = useState('');

  return (
    <MdxEditor
      value={mdValue}
      onChange={(value, _) => setMdValue(value)}
    />
  );
}

```
