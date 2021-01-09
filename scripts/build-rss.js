import fs from 'fs'
import path from 'path'
import ReactDOMServer from 'react-dom/server'
import { MDXProvider } from '@mdx-js/react'
import { Feed } from 'feed'

import { mdxComponents } from '../src/components/Post'
import { getAllPosts } from '../src/getAllPostPreviews'

const siteUrl = 'https://blog.tailwindcss.com'

const feed = new Feed({
  title: 'Blog – Tailwind CSS',
  description: 'All the latest Tailwind CSS news, straight from the team.',
  id: siteUrl,
  link: siteUrl,
  language: 'en',
  image: `${siteUrl}/favicon-32x32.png`,
  favicon: `${siteUrl}/favicon.ico`,
  copyright: 'All rights reserved 2020, Tailwind Labs',
  feedLinks: {
    rss: `${siteUrl}/feed.xml`,
    json: `${siteUrl}/feed.json`,
    atom: `${siteUrl}/atom.xml`,
  },
  author: {
    name: 'Adam Wathan',
    email: 'adam.wathan@gmail.com',
    link: 'https://twitter.com/@adamwathan',
  },
})

getAllPosts().forEach(({ link, module: { meta, default: Content } }) => {
  const mdx = (
    <MDXProvider components={mdxComponents}>
      <Content />
    </MDXProvider>
  )
  const html = ReactDOMServer.renderToStaticMarkup(mdx)
  const postText = `<div style="margin-top=55px; font-style: italic;">(The post <a href="${
    siteUrl + link
  }">${meta.title}</a> appeared first on <a href="${siteUrl}">Tailwind CSS Blog</a>.)</div>`
  feed.addItem({
    title: meta.title,
    id: meta.title,
    link,
    comments: meta.discussion,
    description: meta.description,
    content: html + postText,
    author: meta.authors.map(({ name, twitter }) => ({
      name,
      link: `https://twitter.com/${twitter}`,
    })),
    date: new Date(meta.date),
    image: siteUrl + meta.image,
    extensions: [
      {
        name: '_comments',
        objects: {
          about: 'link to discussions forum',
          comments: meta.discussion,
        },
      },
    ],
  })
})

fs.writeFileSync('./out/feed.xml', feed.rss2())
fs.writeFileSync('./out/atom.xml', feed.atom1())
fs.writeFileSync('./out/feed.json', feed.json1())
