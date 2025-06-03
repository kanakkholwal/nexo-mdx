import Editor from "@nexo-mdx/index";
// import "@nexo-mdx/tailwind.css";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
// import {
//   remarkCallout,
//   remarkEmbed,
//   slugifyHeading,
// } from 'remark-plugins';
import remarkRehype from 'remark-rehype';
import { unified } from "unified";


const DEFAULT_MARKDOWN = `
# Markdown Elements

:::callout[warn]{title=Warning}
This is a custom note content.
:::

::link-preview{url=https://www.openai.com}

::embed[youtube]{id=yaodD79Q4iE .some-class}

## Headings

# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading

## Emphasis

*Italic text* or _Italic text_

**Bold text** or __Bold text__

~~Strikethrough~~

## Blockquotes

> This is a blockquote.

## Lists

### Unordered List
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2

### Ordered List
1. Item 1
2. Item 2
   1. Subitem 2.1
   2. Subitem 2.2

# Markdown Elements

## Anchors

Here is an [internal link](#tables).

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1 Col 1 | Row 1 Col 2 | Row 1 Col 3 |
| Row 2 Col 1 | Row 2 Col 2 | Row 2 Col 3 |

## Checkboxes

- [x] Completed Task
- [ ] Incomplete Task
- [ ] Another Task

## Footnotes

This is a text with a footnote.[^1]

[^1]: This is the footnote.

## Emoji

Let's use some emoji! 🎉 🚀 😄

## Autolinks

Visit https://www.openai.com for more information.

## Abbreviation

The HTML specification is maintained by the W3C.

*[HTML]: Hyper Text Markup Language


`;

export default function App() {
  const [html, setHtml] = useState<string>("");


  return <div className="w-full max-w-7xl mx-auto my-20 p-5 md:p-20">
    <div className="text-center text-2xl font-bold mb-10 text-foreground">
      Nexo Markdown Editor
    </div>
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">

      <div>
        <Editor
          defaultValue={DEFAULT_MARKDOWN}
          onChange={(value: string) => {
            // console.log("value",value);

            unified()
              .use(remarkParse)  // Parse the markdown
              .use(remarkGfm)    // Support GitHub Flavored Markdown
              .use(remarkDirective) // Support for directives
              // .use(remarkCallout)
              .use(remarkRehype) // Convert remark tree to rehype tree
              .use(rehypeFormat)
              .use(rehypeStringify)
              .process(value, (err, file) => {
                if (err) throw err
                console.log(String(file))
              })


          }}

          config={{
            // handleCustomImageUpload:(e) => {
            //     console.log(e)
            //     return Promise.resolve({ url: 'https://lh3.googleusercontent.com/a/AEdFTp6mwH2C7lewN5u-JqoEmxKEgcbRc0G6SKZZn3tVEQ=s96-c', text: 'image' })
            // },
            onImageUpload: (file: File) => {
              console.log(file)
              //  3 second wait
              new Promise((resolve) => {
                setTimeout(resolve, 3000);
              });
              return Promise.resolve(`https://lh3.googleusercontent.com/a/AEdFTp6mwH2C7lewN5u-JqoEmxKEgcbRc0G6SKZZn3tVEQ=s96-c`);

            },
          }}
          renderHtml={(html) => {
            setHtml(html);
            console.log("html", html);
            return html;
          }}
        />

      </div>

      <div className="w-full">
        <div className="border-b pb-2 mb-4 border-border">
          <h4 className="text-xl font-bold text-foreground">
            Rendered Markdown
          </h4>
        </div>
        <div className="prose dark:prose-invert p-4 bg-background border border-border rounded-lg shadow-md mb-4">
          <ReactMarkdown

            remarkPlugins={[
              remarkGfm,
              remarkDirective,
              // remarkCallout,
              // slugifyHeading,
              // remarkEmbed,
              // remarkRehype,
            ]}

          >
            {html}
          </ReactMarkdown>

        </div>
      </div>
    </div>
  </div>
}