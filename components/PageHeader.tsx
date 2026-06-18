import Image from 'next/image'
import Link from 'next/link'

interface PageHeaderProps {
  title: string
  description?: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col items-center text-center">
        <Link href="/" className="flex items-center gap-3 mb-7">
          <Image
            src="/logo.png"
            alt="Veggie Stack"
            width={48}
            height={48}
            className="drop-shadow-lg"
          />
          <span className="font-display text-2xl font-extrabold tracking-tight">
            Veggie<span className="text-green-300">Stack</span>
          </span>
        </Link>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold leading-tight mb-3">
          {title}
        </h1>
        {description && (
          <p className="text-green-100 text-lg max-w-xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
