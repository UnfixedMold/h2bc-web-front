export default function RightsNotice() {
  const year = new Date().getFullYear()
  return (
    <div className="text-[10px] tracking-wide text-gray-500 whitespace-nowrap">© {year} h2bc · All rights reserved.</div>
  )
}
