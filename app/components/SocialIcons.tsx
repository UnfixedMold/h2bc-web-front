import Link from 'next/link'

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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM18 6.8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"/>
        </svg>
      </Link>
      <Link
        href={`https://youtube.com/@${YOUTUBE_HANDLE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-gray-600 hover:text-black"
        aria-label="YouTube"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M23.5 7.5a4 4 0 0 0-2.8-2.8C18.6 4 12 4 12 4s-6.6 0-8.7.7A4 4 0 0 0 .5 7.5 41.5 41.5 0 0 0 0 12a41.5 41.5 0 0 0 .5 4.5 4 4 0 0 0 2.8 2.8C5.4 20 12 20 12 20s6.6 0 8.7-.7a4 4 0 0 0 2.8-2.8c.4-1.5.5-3 .5-4.5s-.1-3-.5-4.5zM9.8 15.3V8.7L15.5 12l-5.7 3.3z"/>
        </svg>
      </Link>
    </div>
  )
}
