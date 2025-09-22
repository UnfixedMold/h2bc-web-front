import { FiInstagram, FiYoutube } from 'react-icons/fi';
import ImageButton from '@/app/components/ui/buttons/ImageButton';

export const INSTAGRAM_HANDLE = '_h2bc';
export const YOUTUBE_HANDLE = '_h2bc';

const ICON_SIZE = 20;

const SOCIAL_LINKS = [
  {
    href: `https://instagram.com/${INSTAGRAM_HANDLE}`,
    label: 'Instagram',
    Icon: FiInstagram,
  },
  {
    href: `https://youtube.com/@${YOUTUBE_HANDLE}`,
    label: 'YouTube',
    Icon: FiYoutube,
  },
];

export default function SocialIcons() {
  return (
    <div className="flex items-center gap-5">
      {SOCIAL_LINKS.map(({ href, label, Icon }) => (
        <ImageButton key={label} href={href} external ariaLabel={label}>
          <Icon size={ICON_SIZE} />
        </ImageButton>
      ))}
    </div>
  );
}
