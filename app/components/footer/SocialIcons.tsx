import Link from 'next/link'
import { FiInstagram, FiYoutube } from 'react-icons/fi';

export const INSTAGRAM_HANDLE = '_h2bc'
export const YOUTUBE_HANDLE = '_h2bc'

export default function SocialIcons() {
  return (
    <div className="flex items-center gap-5">
      <Link
        href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-gray-600 hover:text-black"
        aria-label="Instagram"
      >
        <FiInstagram size={20} />
      </Link>
      <Link
        href={`https://youtube.com/@${YOUTUBE_HANDLE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-gray-600 hover:text-black"
        aria-label="YouTube"
      >
        <FiYoutube size={20} />
      </Link>
    </div>
  )
}
