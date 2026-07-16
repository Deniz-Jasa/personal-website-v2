import ProfileImage from './components/profile-image'

const linkClass = "link-underline"

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      className="flex items-center text-neutral-600 dark:text-neutral-300 link-underline"
    >
      <ArrowIcon />
      <p className="ml-1.5 h-7">{label}</p>
    </a>
  )
}

export default function Page() {
  return (
    <div className="flex-1 flex items-center pb-8 md:py-8">
    <section className="flex flex-col md:flex-row gap-8 md:gap-10 md:items-stretch w-full">
      {/* Photo */}
      <div className="w-full md:w-[45%] md:shrink-0 mt-[-17px] md:mt-0">
        <ProfileImage />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 leading-relaxed">
        <div className="space-y-3">
          <p>
            Hi, I'm Deniz Jasarbasic. I'm a Software Engineer at{' '}
            <a href="https://mercury.com" target="_blank" rel="noopener noreferrer" className={linkClass}>
              Mercury
            </a>
             based in New York City. I first joined Mercury in 2025 as an intern, where I learned a lot about
            observability and performance work. If you're curious,
            here's a{' '}
            <a href="https://jkeuhlen.com/2025/08/04/Silly-Computations.html" target="_blank" rel="noopener noreferrer" className={linkClass}>
              small preview
            </a>{' '}
            into the kinds of problems my manager and I tackled that summer.
          </p>
          <p>
            Before graduating, I also spent a semester abroad at{' '}
            <a href="https://www.sorbonne-universite.fr/en" target="_blank" rel="noopener noreferrer" className={linkClass}>
              Sorbonne Université
            </a>{' '}
            in Paris, taking graduate courses in ML, Quantum Physics, and Bioinformatics,
            while maximizing the rest of my time traveling, meeting new people, and
            improving my French. If you're passionate about these subjects or traveling in general, I'd love to chat :)
          </p>
          <p>
            I'm also a huge proponent of hackathons. A few years ago, I restarted and
            led my university's hackathon,{' '}
            <a href="https://uottahack.ca" target="_blank" rel="noopener noreferrer" className={linkClass}>
              uOttaHack
            </a>
            . If you're interested, check out this{' '}
            <a href="/blog/building-a-hackathon-community" className={linkClass}>
              blog post
            </a>{' '}
            I wrote about the experience and how it helped me grow as a builder and
            aspiring founder.
          </p>
          <p>Feel free to connect, and enjoy the site!</p>
        </div>

        <div className="flex items-center gap-6">
          <SocialLink href="https://github.com/denizjasarbasic" label="github" />
          <SocialLink href="https://www.linkedin.com/in/deniz-jasarbasic/" label="linkedin" />
          <SocialLink href="mailto:denizjasarbasic1@gmail.com" label="email" />
        </div>
      </div>
    </section>
    </div>
  )
}
