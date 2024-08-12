import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'

export default function Dashboard() {
  return (
    <>
      <div className="min-h-full">
        <Header />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Treinos</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-center">
            <HeroSection/>
          </div>
        </main>
      </div>
    </>
  )
}
