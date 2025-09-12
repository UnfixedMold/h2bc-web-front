import SocialIcons from './SocialIcons'
import RightsNotice from './RightsNotice'

export default function FooterBar() {
  return (
    <footer className="fixed bottom-6 left-0 right-0 flex items-center justify-center gap-6 text-sm px-4">
      <div className="flex items-center gap-6">
        <SocialIcons />
        <RightsNotice />
      </div>
    </footer>
  )
}
