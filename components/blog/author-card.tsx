import type { Author } from "@/lib/blog/types"
import { FaGithub, FaLinkedin, FaXTwitter, FaGlobe } from "react-icons/fa6"

type Props = {
  author: Author
}

export default function AuthorCard({ author }: Props) {
  const socials = [
    { href: author.social?.github, icon: FaGithub, label: "GitHub" },
    { href: author.social?.twitter, icon: FaXTwitter, label: "Twitter/X" },
    { href: author.social?.linkedin, icon: FaLinkedin, label: "LinkedIn" },
    { href: author.social?.website, icon: FaGlobe, label: "Website" },
  ].filter((s) => s.href)

  return (
    <div className="mt-10 border-t-2 border-border pt-6">
      <p className="pixel-text mb-4 text-xs uppercase tracking-widest text-muted-foreground">
        Written by
      </p>

      <div className="flex items-start gap-4">
        {author.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={author.avatar}
            alt={author.name}
            className="pixel-border h-14 w-14 shrink-0 rounded-sm object-cover md:h-16 md:w-16"
          />
        ) : (
          <div className="pixel-border flex h-14 w-14 shrink-0 items-center justify-center rounded-sm bg-muted text-xl font-bold text-accent md:h-16 md:w-16">
            {author.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="min-w-0">
          <p className="game-title text-base md:text-lg">{author.name}</p>
          {author.role && (
            <p className="pixel-text mb-2 text-xs uppercase tracking-widest text-accent">
              {author.role}
            </p>
          )}
          {author.bio && (
            <p className="pixel-text text-xs leading-6 text-muted-foreground md:text-sm">
              {author.bio}
            </p>
          )}

          {socials.length > 0 && (
            <div className="mt-3 flex gap-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
