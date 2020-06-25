export default function PageTitle({ children }) {
  return (
    <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tighter sm:text-4xl sm:leading-10 md:text-5xl md:leading-none">
      {children}
    </h1>
  )
}
