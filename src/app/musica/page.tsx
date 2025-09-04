import Image from "next/image";
import Link from "next/link";

export default function MusicPage() {
  return (
    <main className="mt-24 md:mt-28">
      <section className="grid grid-cols-1 md:grid-cols-2">
        {/* Terra Nova */}
        <article className="relative h-[70vh] md:h-[78vh] overflow-hidden">
          <Image
            src="/images/music/terra-nova.jpg"
            alt="Terra Nova"
            fill
            priority
            className="object-cover scale-105 transition-transform duration-700"
          />
          {/* overlays */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

          <div className="relative h-full flex items-center">
            <div className="px-6 md:px-10 max-w-xl">
              <h1 className="text-white uppercase font-semibold tracking-wide text-4xl md:text-6xl">
                Terra Nova
              </h1>
              <p className="mt-4 text-gray-300 text-sm md:text-base leading-relaxed">
                Descubre los cambios tecnológicos, climatológicos, culturales y sociales que ha
                sufrido la Tierra, rebautizándose como “Terra Nova”.
              </p>
              <Link
                href="/musica/terra-nova"
                className="inline-block mt-6 border border-white/80 text-white px-6 py-2 text-sm tracking-wide hover:bg-white hover:text-black transition-colors"
              >
                DESCUBRE MÁS
              </Link>
            </div>
          </div>
        </article>

        {/* Terra Nexus */}
        <article className="relative h-[70vh] md:h-[78vh] overflow-hidden">
          <Image
            src="/images/music/terra-nexus.jpg"
            alt="Terra Nexus"
            fill
            priority
            className="object-cover scale-105 transition-transform duration-700"
          />
          {/* overlays */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/40 to-transparent" />

          <div className="relative h-full flex items-center justify-end text-right">
            <div className="px-6 md:px-10 max-w-xl">
              <h2 className="text-white uppercase font-semibold tracking-wide text-4xl md:text-6xl">
                Terra Nexus
              </h2>
              <p className="mt-4 text-gray-300 text-sm md:text-base leading-relaxed">
                Bienvenido a Terra Nexus, donde la música es un abrazo eterno entre tú, la memoria y lo
                que aún está por venir.
              </p>
              <Link
                href="/musica/terra-nexus"
                className="inline-block mt-6 border border-white/80 text-white px-6 py-2 text-sm tracking-wide hover:bg-white hover:text-black transition-colors"
              >
                DESCUBRE MÁS
              </Link>
            </div>
          </div>
        </article>
      </section>

      {/* espacio inferior para que asome el footer global */}
      <div className="h-12 md:h-16" />
    </main>
  );
}