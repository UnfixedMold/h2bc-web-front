export const metadata = {
  title: 'Gallery',
  description: 'Video gallery',
}

const VIDEOS: { id: string; title: string }[] = [
  { id: 'qI8fDbBXW2s', title: '2DRIP' }
]

export default function GalleryPage() {
  return (
    <main className="w-full py-12">
      <div className="space-y-16">
        {VIDEOS.map(v => (
          <div key={v.id} className="w-full">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="relative w-full" style={{aspectRatio:'16/9'}}>
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1&color=white`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
