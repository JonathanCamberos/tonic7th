const philosophyData = {
  pageTitle: "The Three Pillars of Our Teaching Philosophy",
  pageIntro:
    "If music is a language, then the study of music should be modeled after the way a child learns a language.",
  sections: [
    {
      title: "Pillar 1: Musical Fluency",
      body: [
        "Ok I’m gonna do, let me do another example, I’ll take only one person. Our friend who is good in math right in front of me. I’m going to sing a phrase for you. Something not very difficult, so we’re in C major [C Chord] [Melody] [Sing]. Student sings it back. Seems pretty easy right? Can you sing it in this key now? [Changes Key, Hits F Chord]. Student sings it back, but slower. Ok, this one? [Changes Key, Hits _ Chord]. Student sings it back, but very slowly. Here we go. [Jean smiles because he knows he’s “got” the student lol]",
        "So you see, what happens here, you don’t have, this is not allowed when you improvise. Because when you improvise you have to find it immediately.",
        "Jean Michel Pilc, ‘Improvisation Masterclass Part 2’, New York Jazz Institute.",
        "The heart of this pillar is immediacy. When a phrase appears in your mind, your voice and your instrument must answer right away—without hesitation. That kind of fluency is what separates understanding from true musical literacy.",
      ],
      video: {
        src: "https://www.youtube.com/embed/Fh5faWLCYsE?start=502",
        title: "Jean Michel Pilc Improvisation Masterclass Part 2",
      },
    },
    {
      title: "Pillar 2: Aiming to Be a Composer",
      body: [
        "The reason to be learning classical pieces would be to be learning the same thing [as jazz] improvisation. Why did they go here? How did they go from here to here? And that’s the most important part of classical music. Because you stand a better chance of knowing about improvisation, because you would stand a better chance of being a composer, than being a performer. We should know more about composition. How to write for strings and stuff.",
        "Barry Harris, ‘Chopin Changes’, At The Royal Conservatory in The Hague between 1989 and 1998.",
        "The second pillar is about seeing music as a creative language, not just a set of notes. Learning pieces must nurture composition, so you can answer the question ‘why did this go here?’ rather than only repeating what somebody else already played.",
      ],
      video: {
        src: "https://www.youtube.com/embed/HCG7RTblu1I",
        title: "Barry Harris Chopin Changes",
      },
    },
    {
      title: "Pillar 3: Rhythm Rules the World",
      body: [
        "Rhythm is the foundation that holds musical grammar together. Without steady rhythmic fluency, the language of melody, harmony, and improvisation becomes impossible to speak clearly.",
        "In our teaching, rhythm is not a spare topic — it is the third pillar that makes the first two usable in real music.",
      ],
    },
    {
      title: "Reference Links",
      list: [
        "Jean Michel Pilc, ‘Improvisation Masterclass Part 2’ — real-time fluency in harmonic change.",
        "Barry Harris, ‘Chopin Changes’ — classical phrasing and compositional awareness.",
      ],
    },
  ],
};

function renderSection(section: typeof philosophyData.sections[number]) {
  return (
    <section key={section.title} className="lesson-card mt-8">
      <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>
      {section.body?.map((paragraph, index) => (
        <p key={index} className="mt-4 text-base leading-8 text-slate-800">
          {paragraph}
        </p>
      ))}
      {section.video ? (
        <div className="mt-6">
          <iframe
            width="100%"
            height="315"
            src={section.video.src}
            title={section.video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-2xl"
          />
        </div>
      ) : null}
      {section.list ? (
        <ul className="mt-4 list-disc pl-5 text-base leading-8 text-slate-800">
          {section.list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export default function OurPhilosophyPage() {
  return (
    <main className="mainPage pageColor split-container">
      <div className="container flex-col py-10">
        <header className="header-container">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-700">Shared Philosophy</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
            {philosophyData.pageTitle}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-800">
            {philosophyData.pageIntro}
          </p>
        </header>

        {philosophyData.sections.map((section) => renderSection(section))}
      </div>
    </main>
  );
}
