import Header from "@/components/Header";
import StaticRoadmap from "@/components/StaticRoadmap";

export default function HomePage() {
  return (
    <main className="mainPage pageColor split-container">
      <header className="header-container">
        <div className="container flex-col">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-slate-700">tonic7th</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
              Simple music theory lessons
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-800">
              "If music is a language, then the study of music should be modeled the same way a child learns to speak language."
            </p>
          </div>
        </div>
        <Header />
      </header>

      <section className="container flex-col px-6 py-10">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-slate-900">Welcome!</h2>
          <p className="mt-3 text-lg leading-8 text-slate-800">
            If you are new to the page, welcome! This is a collection of resources from a wide variety of teachers, musicians, genres.
            The goal is to provide a simple, intuitive, and interactive way to become fluent in music.
            The lessons are designed to start from the ground up, but within the context of language fluency.
            Feel free to look around, and when you are ready, please start at "Shared Philosophy" for the original main references and inspirations for this site.
          </p>
        </div>
      </section>
      <section className="container flex-col px-6 py-10">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-slate-900">Lesson plans</h2>
          <p className="mt-3 text-lg leading-8 text-slate-800">
            Browse lessons stored as MusicXML in the database. Each lesson page loads the score and
            playback experience directly in the browser.
          </p>
        </div>
      </section>

      <section className="container mb-10 w-full px-6">
        <div className="w-full max-w-3xl">
          <StaticRoadmap />
        </div>
      </section>
    </main>
  );
}
