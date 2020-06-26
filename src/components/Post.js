import PageTitle from '@/components/PageTitle'
import tinytime from 'tinytime'
import Link from 'next/link'

export default function Post({ meta, children }) {
  return (
    <article className="xl:divide-y xl:divide-gray-200">
      <header className="xl:pb-10">
        <div className="space-y-1">
          <div>
            <div className="text-sm uppercase font-medium leading-6 text-teal-500 tracking-wide">
              <Link href="/">
                <a>News</a>
              </Link>
            </div>
            <PageTitle>{meta.title}</PageTitle>
          </div>
          <dl className="space-y-10">
            <div>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base leading-6 font-medium text-gray-500">
                <time dateTime={meta.date}>
                  {tinytime('{dddd}, {MMMM} {DD}, {YYYY}').render(new Date(meta.date))}
                </time>
              </dd>
            </div>
          </dl>
        </div>
      </header>
      <div
        className="divide-y xl:divide-y-0 divide-gray-200 xl:grid xl:grid-cols-4 xl:col-gap-6 pb-16 xl:pb-20"
        style={{ gridTemplateRows: 'auto 1fr' }}
      >
        <dl className="py-10 xl:border-b xl:border-gray-200">
          <dt className="sr-only">Authors</dt>
          <dd>
            <ul className="flex xl:block space-x-8 sm:space-x-12 xl:space-x-0 xl:space-y-8">
              {meta.authors.map((author) => (
                <li key={author.twitter} className="flex items-center space-x-2">
                  <img src={author.avatar} alt="" className="w-10 h-10 rounded-full" />
                  <dl className="text-sm font-medium leading-5 whitespace-no-wrap">
                    <dt className="sr-only">Name</dt>
                    <dd className="text-gray-900">{author.name}</dd>
                    <dt className="sr-only">Twitter</dt>
                    <dd>
                      <a href={`https://twitter.com/${author.twitter}`} className="text-teal-500">
                        {author.twitter}
                      </a>
                    </dd>
                  </dl>
                </li>
              ))}
            </ul>
          </dd>
        </dl>
        <div className="py-10 xl:pb-0 xl:col-span-3 xl:row-span-2">{children}</div>
        <footer className="text-sm font-medium leading-5 divide-y divide-gray-200 xl:col-start-1 xl:row-start-2">
          <div className="space-y-8 py-8">
            <div>
              <h2 className="text-xs tracking-wide uppercase text-gray-500">Next Article</h2>
              <div className="text-teal-500">
                <Link href="/">
                  <a>Introducing the official IntelliSense VS Code Plugin</a>
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-xs tracking-wide uppercase text-gray-500">Previous Article</h2>
              <div className="text-teal-500">
                <Link href="/">
                  <a>Introducing the official IntelliSense VS Code Plugin</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="pt-8">
            <Link href="/">
              <a className="text-teal-500">View all posts</a>
            </Link>
          </div>
        </footer>
      </div>
    </article>
  )
}
