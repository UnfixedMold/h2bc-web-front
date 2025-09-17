import SocialIcons from './SocialIcons'
import RightsNotice from './RightsNotice'

export default function FooterBar() {
  return (
    <footer className="w-full mt-8 mb-4 flex items-center justify-center text-sm px-6">
      <div className="flex items-center gap-6">
        <SocialIcons />
        <RightsNotice />
      </div>
    </footer>
  )
}
