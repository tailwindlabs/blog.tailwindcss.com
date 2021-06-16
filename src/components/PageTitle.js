export default function PageTitle({ children }) {
  return (
    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl md:text-5xl md:leading-[3.5rem]">
      {children.replace(/ ([^ ]+)$/, '\u00A0$1')}
    </h1>
  )
}
