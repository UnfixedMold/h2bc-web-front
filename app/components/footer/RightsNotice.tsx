export default function RightsNotice() {
  const year = new Date().getFullYear()
  return (
    <div className="text-[10px] tracking-wide text-muted whitespace-nowrap">© {year} h2bc</div>
  )
}
