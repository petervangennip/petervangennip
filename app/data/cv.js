/**
 * Single source of truth for the CV content.
 *
 * Translatable fields are `{ nl, en }` objects and get resolved to the active
 * locale by `useCv()`. Everything else (names, dates, ids) is shared, so a date
 * can never drift between languages.
 *
 * Dates are `{ y, m? }`. A missing month means the source only states a year.
 * `end: null` means the position is ongoing.
 */
export default {
  name: 'Peter van Gennip',
  role: 'Lead Frontend Developer',
  focus: {
    nl: 'Technisch leiderschap en front-end architectuur',
    en: 'Technical leadership and front-end architecture',
  },
  location: {
    nl: 'Best, Nederland',
    en: 'Best, the Netherlands',
  },
  photo: {
    src: '/images/peter-van-gennip.jpeg',
    width: 800,
    height: 800,
    alt: {
      nl: 'Portret van Peter van Gennip',
      en: 'Portrait of Peter van Gennip',
    },
  },

  linkedin: 'https://www.linkedin.com/in/petervangennip',
  profile: {
    nl: 'Lead Frontend Developer met 20+ jaar ervaring in de tech- en digitale sector, de afgelopen jaren in een technisch leidinggevende rol. Combineert diepgaande kennis van moderne front-end architectuur (Vue.js, componentbibliotheken, CSS-architectuur, accessibility) met het aansturen en ontwikkelen van een team developers. Sterk in het vertalen van business- en UX-vraagstukken naar schaalbare technische oplossingen, en in het bewaken van kwaliteit en standaarden binnen een groeiend team.',
    en: 'Lead Frontend Developer with 20+ years of experience in the tech and digital sector, the last several in a technical leadership role. Combines in-depth knowledge of modern front-end architecture (Vue.js, component libraries, CSS architecture, accessibility) with leading and developing a team of developers. Strong at translating business and UX questions into scalable technical solutions, and at safeguarding quality and standards within a growing team.',
  },

  experience: [
    {
      id: 'twentyseven',
      company: 'Twentyseven',
      title: 'Lead Developer',
      start: { y: 2020, m: 2 },
      end: null,
      highlights: [
        {
          nl: 'Combineert hands-on technisch leiderschap met people leadership: aansturen en coachen van een team van 5 front-end developers.',
          en: 'Combines hands-on technical leadership with people leadership: leading and coaching a team of five front-end developers.',
        },
        {
          nl: 'Eigenaar van front-end architectuur, componentbibliotheken en codekwaliteit binnen het team.',
          en: 'Owns the front-end architecture, component libraries and code quality within the team.',
        },
        {
          nl: 'Bewaakt CSS-architectuur, toegankelijkheid (accessibility) en engineering-standaarden op teamniveau.',
          en: 'Safeguards CSS architecture, accessibility and engineering standards across the team.',
        },
        {
          nl: 'Sparringpartner voor project- en accountmanagement bij technische haalbaarheid en planning.',
          en: 'Sparring partner for project and account management on technical feasibility and planning.',
        },
        {
          nl: 'Fungeert als brug tussen het development team en de klant: vertaalt klantwensen naar technische oplossingen en communiceert voortgang en haalbaarheid transparant terug.',
          en: 'Acts as the bridge between the development team and the client: translates client needs into technical solutions and reports progress and feasibility transparently.',
        },
      ],
    },
    {
      id: 'valtech',
      company: 'Valtech',
      title: 'Senior Front-end Developer',
      start: { y: 2016, m: 9 },
      end: { y: 2020, m: 1 },
      highlights: [
        {
          nl: 'Front-end ontwikkeling binnen een internationale digital agency, doorgegroeid van front-end developer naar senior front-end developer.',
          en: 'Front-end development at an international digital agency, growing from front-end developer into a senior role.',
        },
        {
          nl: 'Vertaling van UX/UI-ontwerp naar schaalbare, toegankelijke en performante front-end code.',
          en: 'Translating UX/UI designs into scalable, accessible and performant front-end code.',
        },
        {
          nl: 'Cross-functionele samenwerking met UX, backend en projectmanagement.',
          en: 'Cross-functional collaboration with UX, back-end and project management.',
        },
      ],
    },
    {
      id: 'f19',
      company: 'F19',
      title: 'Front-end Developer',
      start: { y: 2009 },
      end: { y: 2016 },
      highlights: [
        {
          nl: 'Technische realisatie van front-end oplossingen in combinatie met .NET-backend integratie.',
          en: 'Technical delivery of front-end solutions integrated with .NET back ends.',
        },
        {
          nl: 'Front-end estimations en technisch advies richting projectteams; UX-advies en responsive webdesign.',
          en: 'Front-end estimates and technical advice for project teams; UX advice and responsive web design.',
        },
      ],
    },
  ],

  earlyCareer: [
    {
      id: 'parade',
      company: 'Parade Technologies',
      title: 'Webdesigner / Webdeveloper',
      start: { y: 2007 },
      end: { y: 2009 },
      summary: {
        nl: 'Websiteontwerp en omzetting van grafische ontwerpen naar valide XHTML/CSS.',
        en: 'Website design and converting visual designs into valid XHTML/CSS.',
      },
    },
    {
      id: 'replay',
      company: 'Replay Videogames',
      title: { nl: 'Filiaalmanager', en: 'Store Manager' },
      start: { y: 1998 },
      end: { y: 2007 },
      summary: {
        nl: 'Operationeel management, inclusief onderhoud van de bedrijfswebsite.',
        en: 'Operational management, including maintaining the company website.',
      },
    },
  ],

  education: [
    {
      id: 'fontys',
      institution: 'Fontys Hogeschool Eindhoven',
      programme: { nl: 'Software Engineering, HBO', en: 'Software Engineering, BSc (University of Applied Sciences)' },
      start: { y: 2008 },
      end: { y: 2012 },
    },
    {
      id: 'eduvision',
      institution: 'Eduvision',
      programme: 'Webdesign Professional',
      start: { y: 2006 },
      end: { y: 2007 },
    },
    {
      id: 'roc',
      institution: 'ROC Eindhoven',
      programme: { nl: 'Handel & Marketing, MBO', en: 'Commerce & Marketing, vocational (MBO)' },
      start: { y: 1999 },
      end: { y: 2002 },
    },
  ],

  skills: [
    {
      id: 'frontend',
      title: 'Front-end',
      items: ['Vue.js', 'Nuxt', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'Web Components', 'Lit', 'Vite', 'HTML5', 'CSS3', 'SCSS', 'Tailwind CSS', 'shadcn/ui', 'jQuery'],
    },
    {
      id: 'architecture',
      title: { nl: 'Architectuur en kwaliteit', en: 'Architecture and quality' },
      items: [
        { nl: 'Design systems en componentbibliotheken', en: 'Design systems and component libraries' },
        'Storybook',
        { nl: 'CSS-architectuur', en: 'CSS architecture' },
        'Design patterns',
        'Accessibility (WCAG)',
        'Progressive enhancement',
        'Graceful degradation',
        'Playwright',
        { nl: 'End-to-end testing', en: 'End-to-end testing' },
        { nl: 'Cross-browser testing', en: 'Cross-browser testing' },
      ],
    },
    {
      id: 'leadership',
      title: { nl: 'Leiderschap en werkwijze', en: 'Leadership and ways of working' },
      items: [
        { nl: 'Aansturen en coachen van developers', en: 'Leading and coaching developers' },
        'Mentoring',
        { nl: 'Borgen van codekwaliteit', en: 'Safeguarding code quality' },
        'Scrum',
        'Agile',
        'Kanban',
        'Scrummaster',
        { nl: 'Communicatie', en: 'Communication' },
        { nl: 'Probleemoplossend vermogen', en: 'Problem solving' },
        'Time management',
      ],
    },
    {
      id: 'backend',
      title: { nl: 'Backend en platformen', en: 'Back end and platforms' },
      items: ['Node.js', '.NET', 'PHP', 'WordPress', { nl: "API's", en: 'APIs' }],
    },
    {
      id: 'ai',
      title: 'AI-tools',
      items: ['Claude', 'ChatGPT', 'Gemini', 'Grok', 'Hugging Face'],
    },
    {
      id: 'tools',
      title: 'Tools & DevOps',
      items: ['Figma', 'VS Code', 'Visual Studio', 'Postman', 'CI/CD', 'Netlify', 'Team Foundation Server', 'Photoshop', 'Illustrator'],
    },
  ],

  languages: [
    { id: 'nl', name: { nl: 'Nederlands', en: 'Dutch' }, level: { nl: 'Moedertaal', en: 'Native' } },
    { id: 'en', name: { nl: 'Engels', en: 'English' }, level: { nl: 'Goed, in woord en geschrift', en: 'Fluent, spoken and written' } },
  ],
}
