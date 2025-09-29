"use client";
import { Category } from './ShopContent'
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
      <div className="lg:hidden overflow-x-scroll">
        <div className="flex w-max mx-auto whitespace-nowrap" role="tablist" aria-label="Product categories">
          {categories.map(cat => {
            const selected = active === cat
            return (
              <Button
                key={cat}
                variant="link"
                onClick={() => onChange(cat)}
                aria-selected={selected}
                className={cn(selected ? 'font-bold' : 'font-normal')}
              >
                {active === cat ? `> ${cat}` : cat}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Desktop left filter column */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <nav aria-label="Product categories" className="flex flex-col">
            {categories.map(cat => {
              const selected = active === cat
              return (
                <Button
                  key={cat}
                  variant="link"
                  onClick={() => onChange(cat)}
                  aria-selected={selected}
                  className={cn(selected ? 'font-bold' : 'font-normal', "justify-start", "text-md")}
                >
                  {active === cat ? `> ${cat}` : cat}
                </Button>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
