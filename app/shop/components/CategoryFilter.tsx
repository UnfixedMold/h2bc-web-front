"use client";
import { Category } from './ShopContent'

export default function CategoryFilter({
  categories,
  active,
  onChange,
}: {
  categories: Category[]
  active: Category
  onChange: (c: Category) => void
}) {
  return (
    <>
      {/* Mobile horizontal filter bar */}
      <div className="lg:hidden -mx-4 sm:-mx-6 md:-mx-8">
        <div className="px-4 sm:px-6 md:px-8">
          <div className="relative">
            <div className="overflow-x-auto py-2" style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}>
              <div className="flex w-max mx-auto gap-6 px-2" role="tablist" aria-label="Product categories">
                {categories.map(cat => {
                  const selected = active === cat
                  return (
                    <button
                      key={cat}
                      role="tab"
                      aria-selected={selected}
                      onClick={() => onChange(cat)}
                      className={`shrink-0 text-sm cursor-pointer ${selected ? 'text-black font-bold hover:underline' : 'text-black hover:underline'} whitespace-nowrap`}
                    >
                      {selected ? `> ${cat}` : cat}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop left filter column */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <nav aria-label="Product categories" className="space-y-2">
            {categories.map(cat => {
              const selected = active === cat
              return (
                <button
                  key={cat}
                  onClick={() => onChange(cat)}
                  className={`w-full text-left cursor-pointer ${selected ? 'text-black font-bold hover:underline' : 'text-black hover:underline'}`}
                >
                  {selected ? `> ${cat}` : cat}
                </button>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
