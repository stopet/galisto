import { ContactForm } from "@/components/contact-form"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <section className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Have a question or want to work with us? Fill out the form below and we'll get back to you as soon as
              possible.
            </p>
          </div>
          <ContactForm />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
