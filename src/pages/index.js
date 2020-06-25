import { format } from 'date-fns'
import Link from 'next/link'
import Head from 'next/head'
import Header from '@/components/Header'
import PageTitle from '@/components/PageTitle'

function importAll(r) {
  return r.keys().map((fileName) => ({ link: fileName.replace(/\.mdx$/, ''), module: r(fileName) }))
}

function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

const posts = importAll(require.context('./?preview', false, /\.mdx$/)).sort((a, b) =>
  dateSortDesc(a.module.meta.date, b.module.meta.date)
)

export default function Home() {
  return (
    <div className="divide-y divide-gray-200">
      <div className="pb-8 space-y-5">
        <PageTitle>Blog</PageTitle>
        <p className="text-lg leading-7 text-gray-500">
          Latest project announcements, features and company updates from Tailwind CSS.
        </p>
      </div>
      <ul className="divide-y divide-gray-200">
        {posts.map(({ link, module: { default: Component, meta } }) => {
          return (
            <li key={link} className="py-12">
              <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500">
                    <time dateTime={meta.date}>{format(new Date(meta.date), 'LLLL d, y')}</time>
                  </dd>
                </dl>
                <div className="space-y-5 xl:col-span-3">
                  <div className="space-y-6">
                    <h2 className="text-2xl leading-8 font-bold tracking-tight">
                      <Link href={link}>
                        <a className="text-gray-900">{meta.title}</a>
                      </Link>
                    </h2>
                    <div className="prose">
                      <Component />
                    </div>
                  </div>
                  <div className="text-base leading-6 font-medium">
                    <Link href={link}>
                      <a className="text-teal-500" aria-label={`Read "${meta.title}"`}>
                        Read more &rarr;
                      </a>
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
