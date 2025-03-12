"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2, ChevronDown, Menu, X, Star, Zap, Shield, Clock, Users } from "lucide-react"
import { useState } from "react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">G</div>
            </div>
            <span className="text-xl font-bold">Globix</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
            <Link href="#faq" className="text-sm font-medium transition-colors hover:text-primary">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <button variant="ghost" size="sm" className="hidden md:flex">
              Log in
            </button>
            <button size="sm" className="hidden md:flex">
              Sign up
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </button>
            <button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-pink-500/20 to-cyan-500/20 blur-3xl"></div>
          <div className="container relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full border px-3 py-1 text-sm">
                <span className="mr-2 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">New</span>
                <span className="text-muted-foreground">Introducing Globix AI Assistant</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Your workspace,{" "}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  reimagined
                </span>
              </h1>
              <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
                All-in-one workspace that adapts to your needs. Write, plan, collaborate, and get organized in one
                beautiful place.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/globix">
                  <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white h-12 px-8 text-lg font-semibold transition-all duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400">
                    Get started for free
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
                <button className="h-12 px-8 text-lg font-semibold border-2 border-gray-300 rounded-lg text-gray-700 transition-all duration-300 hover:bg-gray-100 focus:ring-2 focus:ring-gray-400">
                  Take a tour
                </button>
              </div>

              <div className="mt-6 text-sm text-muted-foreground">No credit card required • Free plan available</div>
            </div>
            <div className="mt-16 flex justify-center">
              <div className="relative w-full max-w-5xl overflow-hidden rounded-xl border bg-background shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-indigo-500/5"></div>
                <div className="relative">
                  <div className="flex h-10 items-center border-b px-4">
                    <div className="flex space-x-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <img
                    src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2021/10/mac-screen-time.jpg?height=600&width=1200"
                    width={1200}
                    height={600}
                    alt="App screenshot"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Trusted by thousands of teams worldwide
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl">
                Join the community of innovative teams that have transformed their workflow
              </p>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center justify-center">
                  <img
                    src="https://thumbs.dreamstime.com/b/trusted-brand-text-written-red-round-stamp-sign-grungy-267640105.jpg?height=40&width=120"
                    width={120}
                    height={40}
                    alt={`Logo ${i + 1}`}
                    className="h-8 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-32 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Everything you need in one place
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl">
                Powerful features to boost your productivity and streamline your workflow
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-purple-500" />}
                title="Lightning Fast"
                description="Experience unparalleled speed with our optimized platform that loads in milliseconds."
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-indigo-500" />}
                title="Secure by Design"
                description="Your data is protected with enterprise-grade security and end-to-end encryption."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-pink-500" />}
                title="Team Collaboration"
                description="Work together seamlessly with real-time editing and commenting features."
              />
              <FeatureCard
                icon={<Star className="h-10 w-10 text-yellow-500" />}
                title="AI-Powered"
                description="Leverage the power of AI to automate tasks and generate content effortlessly."
              />
              <FeatureCard
                icon={<Clock className="h-10 w-10 text-cyan-500" />}
                title="Time-Saving Templates"
                description="Get started quickly with hundreds of customizable templates for any project."
              />
              <FeatureCard
                icon={<CheckCircle2 className="h-10 w-10 text-green-500" />}
                title="Task Management"
                description="Stay organized with powerful task management tools and progress tracking."
              />
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-center">
                <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <Zap className="h-4 w-4" />
                </div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Work smarter, not harder</h2>
                <p className="mb-8 text-lg text-muted-foreground">
                  Our intuitive interface and powerful features help you stay focused on what matters most. Automate
                  repetitive tasks, organize your thoughts, and collaborate seamlessly with your team.
                </p>
                <ul className="space-y-4">
                  {[
                    "Intelligent task prioritization",
                    "Customizable workflows",
                    "Seamless integrations with your favorite tools",
                    "Advanced search and filtering",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <button>
                    Learn more
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-xl"></div>
                <div className="relative aspect-video overflow-hidden rounded-xl border bg-background shadow-xl">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/006/825/254/original/hand-drawn-illustration-of-post-it-notes-set-on-white-background-color-sheets-of-note-paper-with-pin-clip-sticky-tape-vector.jpg"
                    width={800}
                    height={500}
                    alt="Feature illustration"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 md:py-32 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Loved by teams worldwide
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl">
                Don't just take our word for it — hear what our users have to say
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <TestimonialCard
                quote="Globix has completely transformed how our team collaborates. We've seen a 40% increase in productivity since switching."
                name="Sarah Johnson"
                title="Product Manager at TechCorp"
                avatar="/placeholder.svg?height=100&width=100"
              />
              <TestimonialCard
                quote="The AI features are mind-blowing. It's like having an assistant that knows exactly what I need before I do."
                name="Michael Chen"
                title="Creative Director at DesignHub"
                avatar="/placeholder.svg?height=100&width=100"
              />
              <TestimonialCard
                quote="After trying countless productivity tools, Globix is the only one that stuck. It's intuitive, powerful, and actually enjoyable to use."
                name="Emily Rodriguez"
                title="Freelance Writer"
                avatar="/placeholder.svg?height=100&width=100"
              />
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 md:py-32">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Simple, transparent pricing
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl">
                Choose the plan that's right for you or your team
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <PricingCard
                title="Free"
                price="$0"
                description="Perfect for individuals just getting started"
                features={["Up to 3 workspaces", "Basic templates", "1GB storage", "Community support"]}
                buttonText="Get started"
                buttonVariant="outline"
              />
              <PricingCard
                title="Pro"
                price="$12"
                description="Ideal for professionals and small teams"
                features={[
                  "Unlimited workspaces",
                  "Advanced templates",
                  "10GB storage",
                  "Priority support",
                  "AI assistant (limited)",
                ]}
                buttonText="Start free trial"
                buttonVariant="default"
                popular={true}
              />
              <PricingCard
                title="Enterprise"
                price="$49"
                description="For organizations with advanced needs"
                features={[
                  "Unlimited everything",
                  "Custom templates",
                  "100GB storage",
                  "24/7 dedicated support",
                  "Advanced AI capabilities",
                  "SSO & advanced security",
                ]}
                buttonText="Contact sales"
                buttonVariant="outline"
              />
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 md:py-32 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Frequently asked questions
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl">Everything you need to know about Globix</p>
            </div>
            <div className="mt-16 mx-auto max-w-3xl">
              <FaqAccordion />
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-gradient-to-br from-purple-500/10 to-indigo-500/10">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Ready to transform your workflow?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                Join thousands of teams who have already made the switch to Globix
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button size="lg" className="h-12 px-8">
                  Get started for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button variant="outline" size="lg" className="h-12 px-8">
                  Schedule a demo
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-2">
                <div className="flex -space-x-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-8 w-8 overflow-hidden rounded-full border-2 border-background">
                      <img
                        src={`https://vegasolutions.co/_next/static/media/GordonTan.7f5d3250.png?height=32&width=32&text=${i + 1}`}
                        width={32}
                        height={32}
                        alt={`User ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Join <span className="font-medium text-foreground">2,000+</span> users
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12 md:py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
                  <div className="flex h-full items-center justify-center text-white font-bold">G</div>
                </div>
                <span className="text-xl font-bold">Globix</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                All-in-one workspace that adapts to your needs. Write, plan, collaborate, and get organized in one
                beautiful place.
              </p>
              <div className="mt-6 flex gap-4">
                {["twitter", "facebook", "instagram", "github", "linkedin"].map((social) => (
                  <Link
                    key={social}
                    href={`#${social}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors hover:bg-muted"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Product</h3>
              <ul className="space-y-3 text-sm">
                {["Features", "Pricing", "Templates", "Integrations", "Changelog"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Resources</h3>
              <ul className="space-y-3 text-sm">
                {["Documentation", "Guides", "API", "Community", "Support"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Company</h3>
              <ul className="space-y-3 text-sm">
                {["About", "Blog", "Careers", "Press", "Contact"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Globix, Inc. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-background p-6 transition-all hover:shadow-md">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-indigo-500/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
      <div className="relative">
        <div className="mb-4">{icon}</div>
        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function TestimonialCard({ quote, name, title, avatar }) {
  return (
    <div className="relative overflow-hidden rounded-xl border bg-background p-6 transition-all hover:shadow-md">
      <div className="mb-4 text-4xl text-muted">"</div>
      <p className="mb-6 text-muted-foreground">{quote}</p>
      <div className="flex items-center gap-3">
        <Image
          src={avatar || "/placeholder.svg"}
          width={40}
          height={40}
          alt={name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{title}</div>
        </div>
      </div>
    </div>
  )
}

function PricingCard({ title, price, description, features, buttonText, buttonVariant, popular = false }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border ${popular ? "border-primary shadow-md" : ""} bg-background p-6`}
    >
      {popular && (
        <div className="absolute right-0 top-0">
          <div className="bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">Popular</div>
        </div>
      )}
      <div className="mb-4 text-sm font-medium uppercase text-muted-foreground">{title}</div>
      <div className="mb-2 flex items-baseline">
        <span className="text-3xl font-bold">{price}</span>
        <span className="ml-1 text-sm text-muted-foreground">/month</span>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">{description}</p>
      <button variant={buttonVariant} className="mb-6 w-full">
        {buttonText}
      </button>
      <ul className="space-y-2 text-sm">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FaqAccordion() {
  const [openItem, setOpenItem] = useState(0)

  const faqItems = [
    {
      question: "What is Globix?",
      answer:
        "Globix is an all-in-one workspace that helps you write, plan, collaborate, and get organized. It combines notes, tasks, wikis, and databases into one unified platform.",
    },
    {
      question: "How does the free plan work?",
      answer:
        "The free plan gives you access to core Globix features with some limitations. You can create up to 3 workspaces, use basic templates, and get 1GB of storage. It's perfect for individuals just getting started.",
    },
    {
      question: "Can I switch plans later?",
      answer:
        "You can upgrade, downgrade, or cancel your plan at any time. If you upgrade, you'll be charged the prorated amount for the remainder of your billing cycle.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, security is our top priority. We use enterprise-grade encryption, regular security audits, and follow industry best practices to ensure your data is safe. For Enterprise plans, we offer additional security features like SSO.",
    },
    {
      question: "Do you offer discounts?",
      answer:
        "We offer discounts for educational institutions, non-profit organizations, and startups. Contact our sales team to learn more about our discount programs.",
    },
  ]

  return (
    <div className="space-y-4">
      {faqItems.map((item, i) => (
        <div key={i} className="rounded-lg border">
          <button
            onClick={() => setOpenItem(openItem === i ? -1 : i)}
            className="flex w-full items-center justify-between p-4 text-left font-medium"
          >
            {item.question}
            {openItem === i ? <X className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {openItem === i && <div className="border-t p-4 text-muted-foreground">{item.answer}</div>}
        </div>
      ))}
    </div>
  )
}

