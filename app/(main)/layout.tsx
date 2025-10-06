import FooterBar from '@/components/layout/footer'
import { SiteHeader } from '@/components/layout/header'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 flex flex-col max-w-7xl w-full px-6 sm:px-8 md:px-10">
        {children}
      </main>
      <FooterBar />
    </>
  )
}
