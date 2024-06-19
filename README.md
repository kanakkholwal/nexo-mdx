# Nexo MDX Editor

[![Build and Publish](https://github.com/kanakkholwal/nexo-mdx/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/kanakkholwal/nexo-mdx/actions/workflows/npm-publish.yml)

- A Markdown editor of React component
- Supports TypeScript
- Support native textarea accessability in form
- Full markdown support
- Supports pluggable function bars
- Full control over UI
- Build with Shadcn UI components, Inherits your tailwind/shadcn ui theme
- Checkout more [remark plugins](https://github.com/kanakkholwal/remark-plugins)

## Install

```shell
npm install nexo-mdx --save
# or
bun install nexo-mdx
```

## Basic usage

Following steps:

- Import nexo-mdx
- Register plugins if required
- Start usage.

```ts
import NexoMdxEditor from 'nexo-mdx';
import React from 'react';

export default function MDXEditor(){

    const [mdValue,setMdValue] = React.useState("");

    return <NexoMdxEditor value={mdValue} onChange={(value,_) => setMdValue(value)} />
}

```
