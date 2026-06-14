import Header from "@/components/Header";
import StaticRoadmap from "@/components/StaticRoadmap";

export default function HomePage() {
  return (
    <main className="mainPage pageColor split-container">
      <header className="header-container">
        <div className="container flex-col">
          <div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
              Simple music theory lessons
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-800">
              &quot;If music is a language, then the study of music should be modeled the same way a child learns to speak language.&quot;
            </p>
          </div>
        </div>
        <Header />
      </header>

      <section className="container flex-col px-6 py-10">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-slate-900">Welcome!</h2>
          <p className="mt-3 text-lg leading-8 text-slate-800">
            If you are new to the page, welcome! This is a collection of resources from a wide variety of teachers, musicians, genres over the years.
            The goal is to string together the different contexts, resources, and references for building the skills a student needs to achieve &apos;fluency&apos; in the language of music.
            The lessons are designed to start from the ground up, will likely seem nonsensical until they &apos;click&apos;, but shifting the context from learning the music on paper, to practicing to gain fluency
            will allow the student to develop an ingrained understanding of music, allow them to improvise, compose, and understand the &apos;why&apos; behind music they may play everyday.
            Feel free to look around at your convenience or start at &quot;Shared Philosophy&quot; for the original main references, inspirations, and direction for how this site can be digested.
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
