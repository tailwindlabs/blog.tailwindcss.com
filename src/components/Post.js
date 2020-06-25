export default function Post({ meta, children }) {
  return (
    <div>
      <h1>{meta.title}</h1>
      <div>
        {meta.authors.map((author) => (
          <img key={author.twitter} src={author.avatar} alt={author.name} />
        ))}
      </div>
      {children}
    </div>
  )
}
