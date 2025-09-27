import { NavLinks } from './components/header'


export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="aspect-square w-56 sm:w-64 md:w-72">
          {/* @ts-expect-error: model-viewer is a custom element */}
          <model-viewer
            src="/y2k_sport_sunglass.glb"
            camera-controls
            disable-zoom
            disable-pan
            interaction-prompt="none"
            auto-rotate
            auto-rotate-speed="500"
            class="block w-full h-full"
            style={{
              '--progress-bar-height': 0,
              '--progress-bar-color': 'transparent',
              '--poster-color': 'transparent',
            } as React.CSSProperties}
          />
        </div>

        <NavLinks
          ulClassName="flex flex-col items-center justify-center space-y-5 text-4xl md:mt-0 sm:flex-row sm:space-y-0 sm:gap-8 md:flex-col md:space-y-5 md:gap-0"
        />
      </div>
    </div>
  )
}
