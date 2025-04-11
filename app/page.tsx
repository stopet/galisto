import { Gallery } from "@/components/gallery"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Image Gallery</h1>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              A collection of beautiful images showcasing our work.
            </p>
          </div>
          <Gallery />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
