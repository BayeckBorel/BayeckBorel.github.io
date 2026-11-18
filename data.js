/* Contenu du site. Pour ajouter un certificat : copier une ligne de CERTS, mettre l'image dans assets/certs/, donner son nom dans imgs. */
const UPDATED = "2026-11-16";

/* Reglages a remplir quand les comptes existent. Vide = la fonction reste eteinte.
   GOATCOUNTER : le nom choisi sur goatcounter.com (pour monsite.goatcounter.com, ecrire "monsite").
   FORM_ENDPOINT : l'adresse donnee par formspree.io, du type "https://formspree.io/f/xxxxxxxx". */
const GOATCOUNTER = "bayeckborel";
const FORM_ENDPOINT = "https://formspree.io/f/xrpqpjlw";

const T = {
  en: {
    skip: "Skip to content", menu: "Menu",
    nav: { about: "About", education: "Education", research: "Research", publications: "Publications", experience: "Experience",
           skills: "Skills", certificates: "Certificates", aspirations: "Aspirations", referees: "Referees", contact: "Contact" },
    hero: {
      eyebrow: "",
      lede: "Biochemist | Molecular biology and drug discovery for neglected tropical diseases | Aspiring PhD candidate",
      contact: "Contact me"
    },
    facts: [],
    about: { text: "Biochemist with a Master's in Biotechnology and Development, working on neglected tropical diseases at the point where computational prioritisation meets experimental validation. Laboratory background in molecular biology, immunology and parasitology, with a working knowledge of cheminformatics and open-source predictive models applied to antischistosomal compounds. Co-author of a field study on praziquantel and reinfection published in Frontiers in Immunology." },
    chart: {
      title: "Academic progression",
      sub: "Grade point average of each year on a 4-point scale, University of Yaoundé 1",
      note: "Annual grade point averages taken from my official transcripts. In each of the five years I earned 60 of 60 credits.",
      aria: "Line chart of the annual grade point average on a 4-point scale: BSc year 1 2.09, BSc year 2 2.78, BSc year 3 2.95, MSc year 1 3.00, MSc year 2 3.56."
    },
    honoursTitle: "Honours and awards", languagesTitle: "Languages",
    research: {
      text: "My research interests are the biology of parasitic worms and the discovery of drugs against them. Both interests come from my master's thesis on schistosomiasis in school-aged children, and that work contributed to a paper published in Frontiers in Immunology in 2026.",
      thesisTitle: "Master's thesis in brief",
      thesis: "The thesis was a retrospective study of samples and records from school-aged children in five public schools of Bokito, Cameroon, where Schistosoma mansoni is endemic. I compared the children who had received up to two rounds of praziquantel with those who had received more than two. The children with more than two rounds had fewer heavy infections (p = 0.01), higher haemoglobin levels (p = 0.004) and better school marks (p = 0.02), and they also had higher IgE and IgG4 levels. However, infection remained as frequent in this group as in the other (p = 0.58), and liver fibrosis was not reduced (p = 0.31). Repeated treatment therefore came with a lower parasite burden and a stronger antibody response, but it left the frequency of infection and the liver damage unchanged, which marks the limit of a control strategy that relies on praziquantel alone. Because the study was observational, these associations do not establish a causal effect.",
      next: "That limit is the reason I now want to study the protein kinases of the parasite as drug targets, together with the methods that measure whether a compound binds its target inside a cell.",
      tags: ["Schistosomiasis", "Host-parasite immunology", "Protein kinases", "Target engagement", "Early drug discovery", "Neglected tropical diseases"]
    },
    pubStatus: { published: "Published", prep: "In preparation" },
    conf: "Conference",
    cert: {
      intro: "The chart counts my trainings by year and by field. Each card below opens the certificate when it is available.",
      all: "All", withDoc: "With certificate", pending: "Training completed", view: "View certificate",
      chartTitle: "Trainings by year and field", chartAria: (y, n) => `Stacked bar chart of trainings per year: ${y.map((v, i) => v + " " + n[i]).join(", ")}.`,
      count: (n, t) => `${n} of ${t} shown`, pages: n => `${n} pages`,
      cats: { dd: "Drug discovery and AI", lab: "Laboratory techniques", data: "Data and programming", clin: "Clinical research and quality", event: "Events and other" }
    },
    work: { title: "Selected work", items: [
      { fig: "5 schools", t: "Master's thesis", d: "A retrospective study of school-aged children in Bokito, Cameroon. Repeated praziquantel treatment came with lighter infections, while infection remained as frequent.", link: "Read the summary", href: "#research" },
      { fig: "2026", t: "Published paper", d: "Co-author of a field study on praziquantel and reinfection in Frontiers in Immunology, with a contribution to the analysis, the methodology and the original draft.", link: "Open the article", href: "https://doi.org/10.3389/fimmu.2026.1746003" },
      { fig: "85 compounds", t: "Computational screening", d: "A screening cascade built with three open-source models from the Ersilia Model Hub. The two compounds with confirmed in vitro activity came out at ranks four and ten.", link: "See the details", href: "#experience" } ] },
    exp: { more: n => `Show ${n} more positions`, less: "Show fewer" },
    asp: { text: "I want to complete a PhD in parasitology and drug discovery. After the PhD, I intend to carry out research on neglected tropical diseases in Africa. I also remain open to other areas of drug discovery, including oncology, wherever a technique I have developed proves useful." },
    ref: { note: "References available on request." },
    contact: { write: "Write me an email", email: "Email", copy: "Copy", copied: "Copied", addr: "Address", addrVal: "Department of Biochemistry, Faculty of Science, University of Yaoundé 1, P.O. Box 812, Yaoundé, Cameroon" },
    form: { title: "Leave me your details", intro: "If you would like me to write back, fill in this form. Your details are sent to me by email and I use them only to reply to you.",
            name: "Name", email: "Email", org: "Institution or organisation", country: "Country", reason: "Reason",
            reasons: ["Scholarship or doctoral position", "Collaboration", "Recruitment", "Other"], msg: "Message", send: "Send",
            sending: "Sending…", ok: "Your message was sent. Thank you.", fail: "The message could not be sent. Please write to my email address above." },
    footer: { text: "© 2026 Etienne Borel SOH BAYECK", kind: "Academic portfolio" },
    lb: { close: "Close", prev: "Previous", next: "Next" }
  },
  fr: {
    skip: "Aller au contenu", menu: "Menu",
    nav: { about: "Présentation", education: "Formation", research: "Recherche", publications: "Publications", experience: "Expérience",
           skills: "Compétences", certificates: "Certificats", aspirations: "Aspirations", referees: "Référents", contact: "Contact" },
    hero: {
      eyebrow: "",
      lede: "Biochimiste | Biologie moléculaire et découverte de médicaments contre les maladies tropicales négligées | Futur doctorant",
      contact: "Me contacter"
    },
    facts: [],
    about: { text: "Biochimiste titulaire d'un Master en Biotechnologie et Développement, je travaille sur les maladies tropicales négligées, là où la priorisation computationnelle rencontre la validation expérimentale. Formation de laboratoire en biologie moléculaire, immunologie et parasitologie, avec des connaissances pratiques en chémoinformatique et en modèles prédictifs libres appliqués aux composés antischistosomiens. Co-auteur d'une étude de terrain sur le praziquantel et la réinfection publiée dans Frontiers in Immunology." },
    chart: {
      title: "Progression académique",
      sub: "Moyenne de chaque année sur une échelle de 4 points, Université de Yaoundé 1",
      note: "Moyennes annuelles tirées de mes relevés de notes officiels. J'ai validé 60 crédits sur 60 à chacune des cinq années.",
      aria: "Courbe de la moyenne annuelle sur une échelle de 4 points : Licence 1 2.09, Licence 2 2.78, Licence 3 2.95, Master 1 3.00, Master 2 3.56."
    },
    honoursTitle: "Distinctions", languagesTitle: "Langues",
    research: {
      text: "Mes intérêts de recherche sont la biologie des vers parasites et la découverte de médicaments contre eux. Ces deux intérêts viennent de mon mémoire de Master sur la schistosomiase chez les enfants d'âge scolaire, et ce travail a contribué à un article publié dans Frontiers in Immunology en 2026.",
      thesisTitle: "Le mémoire de Master en bref",
      thesis: "Le mémoire était une étude rétrospective d'échantillons et de données d'enfants d'âge scolaire de cinq écoles publiques de Bokito, au Cameroun, où Schistosoma mansoni est endémique. J'ai comparé les enfants qui avaient reçu jusqu'à deux tours de praziquantel avec ceux qui en avaient reçu plus de deux. Les enfants traités plus de deux fois avaient moins d'infections lourdes (p = 0.01), une hémoglobine plus élevée (p = 0.004) et de meilleures notes scolaires (p = 0.02), et ils avaient aussi des taux d'IgE et d'IgG4 plus élevés. Cependant, l'infection restait aussi fréquente dans ce groupe que dans l'autre (p = 0.58), et la fibrose hépatique n'était pas réduite (p = 0.31). Les traitements répétés s'accompagnaient donc d'une charge parasitaire plus faible et d'une réponse en anticorps plus forte, mais ils laissaient inchangées la fréquence de l'infection et l'atteinte du foie, ce qui marque la limite d'une stratégie de lutte fondée sur le seul praziquantel. Comme l'étude était observationnelle, ces associations n'établissent pas un effet causal.",
      next: "Cette limite est la raison pour laquelle je veux maintenant étudier les protéines kinases du parasite comme cibles thérapeutiques, avec les méthodes qui mesurent si un composé se lie à sa cible dans une cellule.",
      tags: ["Schistosomiase", "Immunologie hôte-parasite", "Protéines kinases", "Engagement de cible", "Découverte précoce de médicaments", "Maladies tropicales négligées"]
    },
    pubStatus: { published: "Publié", prep: "En préparation" },
    conf: "Conférence",
    cert: {
      intro: "Le graphique compte mes formations par année et par domaine. Chaque carte ci-dessous ouvre le certificat quand il est disponible.",
      all: "Tous", withDoc: "Avec certificat", pending: "Formation suivie", view: "Voir le certificat",
      chartTitle: "Formations par année et par domaine", chartAria: (y, n) => `Graphique en barres empilées des formations par année : ${y.map((v, i) => v + " " + n[i]).join(", ")}.`,
      count: (n, t) => `${n} sur ${t} affichés`, pages: n => `${n} pages`,
      cats: { dd: "Découverte de médicaments et IA", lab: "Techniques de laboratoire", data: "Données et programmation", clin: "Recherche clinique et qualité", event: "Événements et autres" }
    },
    work: { title: "Travaux choisis", items: [
      { fig: "5 écoles", t: "Mémoire de Master", d: "Une étude rétrospective d'enfants d'âge scolaire à Bokito, au Cameroun. Les traitements répétés au praziquantel s'accompagnaient d'infections moins lourdes, alors que l'infection restait aussi fréquente.", link: "Lire le résumé", href: "#research" },
      { fig: "2026", t: "Article publié", d: "Co-auteur d'une étude de terrain sur le praziquantel et la réinfection dans Frontiers in Immunology, avec une contribution à l'analyse, à la méthodologie et à la première version.", link: "Ouvrir l'article", href: "https://doi.org/10.3389/fimmu.2026.1746003" },
      { fig: "85 composés", t: "Criblage computationnel", d: "Une cascade de criblage construite avec trois modèles libres de l'Ersilia Model Hub. Les deux composés à activité in vitro confirmée sont ressortis aux rangs quatre et dix.", link: "Voir le détail", href: "#experience" } ] },
    exp: { more: n => `Afficher ${n} autres postes`, less: "Afficher moins" },
    asp: { text: "Je veux réaliser un doctorat en parasitologie et en découverte de médicaments. Après ce doctorat, je compte mener des recherches sur les maladies tropicales négligées en Afrique. Je reste aussi ouvert à d'autres domaines de la découverte de médicaments, y compris la cancérologie, partout où une technique que j'aurai développée sera utile." },
    ref: { note: "Références disponibles sur demande." },
    contact: { write: "M'écrire un courriel", email: "Courriel", copy: "Copier", copied: "Copié", addr: "Adresse", addrVal: "Département de Biochimie, Faculté des Sciences, Université de Yaoundé 1, B.P. 812, Yaoundé, Cameroun" },
    form: { title: "Laissez-moi vos coordonnées", intro: "Si vous souhaitez que je vous réponde, remplissez ce formulaire. Vos coordonnées me sont envoyées par courriel et je m'en sers seulement pour vous répondre.",
            name: "Nom", email: "Courriel", org: "Institution ou organisation", country: "Pays", reason: "Motif",
            reasons: ["Bourse ou poste doctoral", "Collaboration", "Recrutement", "Autre"], msg: "Message", send: "Envoyer",
            sending: "Envoi…", ok: "Votre message est parti. Merci.", fail: "Le message n'a pas pu partir. Écrivez-moi à l'adresse ci-dessus." },
    footer: { text: "© 2026 Etienne Borel SOH BAYECK", kind: "Portfolio académique" },
    lb: { close: "Fermer", prev: "Précédent", next: "Suivant" }
  }
};

/* Points de la courbe : moyenne annuelle lue sur les releves de notes officiels. */
const GPA = [
  { v: 2.09, en: ["L1", "BSc year 1", "2018/19"], fr: ["L1", "Licence 1", "2018/19"] },
  { v: 2.78, en: ["L2", "BSc year 2", "2019/20"], fr: ["L2", "Licence 2", "2019/20"] },
  { v: 2.95, en: ["L3", "BSc year 3", "2020/21"], fr: ["L3", "Licence 3", "2020/21"] },
  { v: 3.00, en: ["M1", "MSc year 1", "2021/22"], fr: ["M1", "Master 1", "2021/22"] },
  { v: 3.56, en: ["M2", "MSc year 2", "2023/24"], fr: ["M2", "Master 2", "2023/24"] }
];

const EDU = [
  { when: "2021 - 2024",
    en: { t: "M.Sc. Biochemistry (Biotechnology and Development)", w: "University of Yaoundé 1, Faculty of Science, Cameroon · EQF level 7",
          b: ["Cumulative GPA 3.28/4. Final-year GPA 3.56/4 (17.8/20), ranked first in the specialisation.",
              "Thesis: effect of repeated praziquantel treatments on school-aged children's susceptibility to Schistosoma mansoni infection, immunopathology and cognitive impairment. Written and defended in English.",
              "Main subjects: molecular biology, immunology, parasitology, enzymology, biostatistics."] },
    fr: { t: "Master en Biochimie (Biotechnologie et Développement)", w: "Université de Yaoundé 1, Faculté des Sciences, Cameroun · niveau CEC 7",
          b: ["Moyenne cumulée 3.28/4. Moyenne de l'année finale 3.56/4 (17.8/20), premier de la spécialité.",
              "Mémoire : effet des traitements répétés au praziquantel sur la susceptibilité des enfants d'âge scolaire à l'infection par Schistosoma mansoni, l'immunopathologie et les troubles cognitifs. Rédigé et soutenu en anglais.",
              "Matières principales : biologie moléculaire, immunologie, parasitologie, enzymologie, biostatistique."] } },
  { when: "2018 - 2021",
    en: { t: "B.Sc. Biosciences (Biochemistry)", w: "University of Yaoundé 1, Faculty of Science, Cameroon · EQF level 6", b: ["Cumulative GPA 2.60/4."] },
    fr: { t: "Licence en Biosciences (Biochimie)", w: "Université de Yaoundé 1, Faculté des Sciences, Cameroun · niveau CEC 6", b: ["Moyenne cumulée 2.60/4."] } },
  { when: "2017 - 2018",
    en: { t: "Baccalauréat D (science track)", w: "Bilingual High School of Makak, Cameroon · EQF level 4", b: ["Grade 11.50/20."] },
    fr: { t: "Baccalauréat D (série scientifique)", w: "Lycée Bilingue de Makak, Cameroun · niveau CEC 4", b: ["Moyenne 11.50/20."] } }
];

const HONOURS = {
  when: "2020 - 2025",
  en: { t: "Paul Biya Academic Excellence Grant", w: "Government of Cameroon", b: "Given to every student with an average above 12/20 (GPA 2.4/4) who passes all 12 course units (60 credits) without a resit." },
  fr: { t: "Prime d'excellence académique Paul Biya", w: "Gouvernement du Cameroun", b: "Attribuée à tout étudiant dont la moyenne dépasse 12/20 (2.4/4) et qui valide les 12 unités d'enseignement (60 crédits) sans rattrapage." }
};

const LANGS = {
  en: [["French", "Mother tongue"], ["English", "B2"], ["German", "A2"]],
  fr: [["Français", "Langue maternelle"], ["Anglais", "B2"], ["Allemand", "A2"]]
};

const PUBS = [
  { status: "published", year: "2026",
    authors: ["Nono J.K., Bitye Zambo B.M., Kameni Poumeni M., ", "Soh Bayeck E.B.", ", Meyo Kamguia L., Noubissi Fotseu M.M., Owona Ayissi V.B., Spangenberg T., Demarta-Gatsi C. (2026)."],
    title: "Mass drug administration of praziquantel lowers the susceptibility of school-aged children to Schistosoma mansoni in endemic areas.",
    venue: "Frontiers in Immunology, 17:1746003.", doi: "10.3389/fimmu.2026.1746003",
    en: "Contribution: formal analysis, investigation, methodology, writing of the original draft.",
    fr: "Contribution : analyse formelle, investigation, méthodologie, rédaction de la première version." }
];
const CONF = {
  en: "2023 · 1st Schistosomiasis Awareness Day, IMPM/MINRESI, Yaoundé. Oral presentation: mass drug administration of praziquantel lowers susceptibility to Schistosoma mansoni in endemic areas.",
  fr: "2023 · 1re Journée de sensibilisation à la schistosomiase, IMPM/MINRESI, Yaoundé. Présentation orale : l'administration de masse de praziquantel réduit la susceptibilité à Schistosoma mansoni en zone d'endémie."
};

const EXP = [
  { en: { when: "08/2024 - Present", t: "Data Manager and EPI Focal Point (support staff)", k: "Public health", w: "Lomié Health District, East Regional Delegation, Ministry of Public Health, Cameroon",
      b: ["Compile and follow up the district's routine health data, including the monthly activity reports of its 19 health facilities entered in DHIS2.",
          "Act as district focal point for the Expanded Programme on Immunization and follow immunization indicators on the national review dashboard.",
          "Compiled the district supervision report of the 2026 community-directed treatment with ivermectin against onchocerciasis in four health areas, recomputing and flagging the health-area figures that contained errors."] },
    fr: { when: "08/2024 - aujourd'hui", t: "Gestionnaire de données et point focal PEV (personnel d'appui)", k: "Santé publique", w: "District de Santé de Lomié, Délégation Régionale de l'Est, Ministère de la Santé Publique, Cameroun",
      b: ["Je compile et je suis les données sanitaires de routine du district, dont les rapports mensuels d'activité de ses 19 formations sanitaires saisis dans DHIS2.",
          "Je suis le point focal du district pour le Programme Élargi de Vaccination et je suis les indicateurs de vaccination sur le tableau de bord national de revue.",
          "J'ai compilé le rapport de supervision du district pour le traitement à l'ivermectine sous directives communautaires contre l'onchocercose en 2026 dans quatre aires de santé, en recalculant et en signalant les chiffres d'aire de santé qui contenaient des erreurs."] } },
  { top: true, en: { when: "2023 - Present", t: "Graduate Research Assistant", k: "Research", w: "Laboratory of Pharmacology and Toxicology, University of Yaoundé 1, Cameroon",
      b: ["Assisted a master's project on Mucuna pruriens in an aluminium chloride model of neurotoxicity.",
          "Support experimental work, data analysis and manuscript writing in departmental projects, and mentor undergraduate biochemistry students."] },
    fr: { when: "2023 - aujourd'hui", t: "Assistant de recherche", k: "Recherche", w: "Laboratoire de Pharmacologie et Toxicologie, Université de Yaoundé 1, Cameroun",
      b: ["J'ai assisté un projet de Master sur Mucuna pruriens dans un modèle de neurotoxicité au chlorure d'aluminium.",
          "J'appuie le travail expérimental, l'analyse des données et la rédaction de manuscrits dans les projets du département, et j'encadre des étudiants de Licence en biochimie."] } },
  { top: true, en: { when: "2023 - 2024", t: "Master's thesis research", k: "Research", w: "University of Yaoundé 1 and IBHI Laboratory, IMPM/MINRESI, Cameroon",
      b: ["Designed and carried out field and laboratory work on schistosomiasis in school-aged children, covering parasitology, immunology and molecular biology.",
          "Measured plasma antibodies and cytokines by ELISA, then analysed and visualised the data in R, Python, SPSS and GraphPad Prism."] },
    fr: { when: "2023 - 2024", t: "Recherche de mémoire de Master", k: "Recherche", w: "Université de Yaoundé 1 et Laboratoire IBHI, IMPM/MINRESI, Cameroun",
      b: ["J'ai conçu et réalisé le travail de terrain et de laboratoire sur la schistosomiase chez des enfants d'âge scolaire, en parasitologie, en immunologie et en biologie moléculaire.",
          "J'ai dosé les anticorps et les cytokines plasmatiques par ELISA, puis analysé et représenté les données avec R, Python, SPSS et GraphPad Prism."] } },
  { en: { when: "2023 - 2024", t: "Field Data Collector", k: "Research", w: "IBHI Laboratory, IMPM/MINRESI, Cameroon",
      b: ["Identified and collected freshwater snails for parasitological surveys, and collected, processed and documented stool and blood samples from school-aged children.",
          "Followed standardised protocols for sample handling so that specimens and records kept their quality."] },
    fr: { when: "2023 - 2024", t: "Collecteur de données de terrain", k: "Recherche", w: "Laboratoire IBHI, IMPM/MINRESI, Cameroun",
      b: ["J'ai identifié et collecté des mollusques d'eau douce pour les enquêtes parasitologiques, et j'ai collecté, traité et documenté des échantillons de selles et de sang d'enfants d'âge scolaire.",
          "J'ai suivi des protocoles standardisés de manipulation des échantillons pour que les prélèvements et les registres gardent leur qualité."] } },
  { top: true, en: { when: "2026", t: "Independent computational work", k: "Research", w: "Antischistosomal compound prioritisation",
      b: ["Built and ran a screening cascade on 85 published antischistosomal compounds using three open-source models from the Ersilia Model Hub, submitted through the Ersilia self-service platform.",
          "Read each model's training report and applicability domain before use, and reported a domain verdict alongside every prediction.",
          "Recovered the two compounds with confirmed in vitro activity at ranks four and ten of 85 on predicted activity."] },
    fr: { when: "2026", t: "Travail computationnel indépendant", k: "Recherche", w: "Priorisation de composés antischistosomiens",
      b: ["J'ai construit et exécuté une cascade de criblage sur 85 composés antischistosomiens publiés, avec trois modèles libres de l'Ersilia Model Hub, soumis par la plateforme en libre-service d'Ersilia.",
          "J'ai lu le rapport d'entraînement et le domaine d'applicabilité de chaque modèle avant de l'utiliser, et j'ai donné un verdict de domaine avec chaque prédiction.",
          "Les deux composés à activité in vitro confirmée sont ressortis aux rangs quatre et dix sur 85 pour l'activité prédite."] } },
  { en: { when: "2024 - Present", t: "Founder", k: "Data analysis", w: "Data Vision Analytics, Cameroon",
      b: ["Analyse and interpret data for clients and research projects, mainly in health and education."] },
    fr: { when: "2024 - aujourd'hui", t: "Fondateur", k: "Analyse de données", w: "Data Vision Analytics, Cameroun",
      b: ["J'analyse et j'interprète des données pour des clients et des projets de recherche, surtout en santé et en éducation."] } },
  { en: { when: "2021 - Present", t: "Tutor and part-time science teacher", k: "Education", w: "Educational institutions and private tutoring, Cameroon",
      b: ["Give tutorials and practical sessions to undergraduate biochemistry students and science classes in secondary schools."] },
    fr: { when: "2021 - aujourd'hui", t: "Répétiteur et enseignant de sciences à temps partiel", k: "Enseignement", w: "Établissements scolaires et cours particuliers, Cameroun",
      b: ["Je donne des travaux dirigés et des séances pratiques à des étudiants de Licence en biochimie et à des classes de sciences du secondaire."] } }
];

const SKILLS = {
  en: [["Laboratory", "ELISA and immunoassays, rapid diagnostic tests, PCR, qPCR and RT-PCR, Western blotting, cell culture, chromatography and spectroscopy, biomolecule separation."],
       ["Digital skills", "R, Python, Bash, Git and GitHub, SPSS, GraphPad Prism, DHIS2, Power BI, IASO, RDKit, Ersilia Model Hub, NCBI tools, Zotero, LaTeX, Microsoft Office."],
       ["Analytical skills", "Molecular descriptors and fingerprints and QSAR modelling (working knowledge); familiar with molecular docking and virtual screening. Sequence alignment and ORF analysis. Data quality checks at district level."],
       ["Communication", "Presented my master's results orally at the 1st Schistosomiasis Awareness Day (IMPM/MINRESI, Yaoundé, 2023). Wrote the first draft of a multi-author paper and handled the revisions with nine co-authors. Explained the study to families and school staff during field work."],
       ["Organisation", "Ran the sampling logistics of a school-based field study from recruitment to processing. Keep the reporting of 19 health facilities on schedule each month, and founded a small data-analysis practice."]],
  fr: [["Laboratoire", "ELISA et immunodosages, tests de diagnostic rapide, PCR, qPCR et RT-PCR, Western blot, culture cellulaire, chromatographie et spectroscopie, séparation de biomolécules."],
       ["Outils numériques", "R, Python, Bash, Git et GitHub, SPSS, GraphPad Prism, DHIS2, Power BI, IASO, RDKit, Ersilia Model Hub, outils du NCBI, Zotero, LaTeX, Microsoft Office."],
       ["Analyse", "Descripteurs et empreintes moléculaires, modélisation QSAR (connaissances pratiques) ; notions de docking moléculaire et de criblage virtuel. Alignement de séquences et analyse d'ORF. Contrôles de qualité des données au niveau du district."],
       ["Communication", "J'ai présenté oralement les résultats de mon Master à la 1re Journée de sensibilisation à la schistosomiase (IMPM/MINRESI, Yaoundé, 2023). J'ai rédigé la première version d'un article à plusieurs auteurs et conduit les révisions avec neuf co-auteurs. J'ai expliqué l'étude aux familles et au personnel des écoles pendant le terrain."],
       ["Organisation", "J'ai conduit la logistique des prélèvements d'une étude de terrain en milieu scolaire, du recrutement au traitement. Je tiens chaque mois le calendrier de rapportage de 19 formations sanitaires, et j'ai fondé une petite activité d'analyse de données."]]
};

/* date : AAAA-MM-JJ, ou AAAA quand le jour n'est pas connu. imgs vide = certificat a ajouter. */
const CERTS = [
  { date: "2026-11-17", cat: "lab", org: "Labroots", title: "Automating Antibody Panels and Staining Protocols for High-Parameter Flow Cytometry", imgs: ["labroots-flow-cytometry-2026.jpg"] },
  { date: "2026-11-13", cat: "lab", org: "Proteintech Group", title: "Flow Cytometry Workshop", imgs: ["proteintech-flow-cytometry-2026.jpg"] },
  { date: "2026-11-12", cat: "lab", org: "Proteintech Group", title: "Immunofluorescence Workshop", imgs: ["proteintech-immunofluorescence-2026.jpg"] },
  { date: "2026-11-11", cat: "lab", org: "Proteintech Group", title: "ELISA Workshop", imgs: ["proteintech-elisa-2026.jpg"] },
  { date: "2026-11-11", cat: "dd", org: "Labroots", title: "Realizing the promise of AI-enabled drug discovery - preparing the next steps", imgs: ["labroots-ai-drug-discovery-2026.jpg"] },
  { date: "2026-11-10", cat: "lab", org: "Proteintech Group", title: "Western Blot Workshop", imgs: ["proteintech-western-blot-2026.jpg"] },
  { date: "2026-11-09", cat: "lab", org: "Proteintech Group", title: "Antibody Validation Workshop", imgs: ["proteintech-antibody-validation-2026.jpg"] },
  { date: "2026-11-05", cat: "dd", org: "EU-OPENSCREEN ERIC", title: "EU-OPENSCREEN Autumn Training School 2026",
    en: "Virtual event, 3 to 5 November 2026, 16 talks on chemical biology and drug discovery.", fr: "Événement en ligne, du 3 au 5 novembre 2026, 16 exposés sur la biologie chimique et la découverte de médicaments.", imgs: ["eu-openscreen-autumn-school-2026.jpg"] },
  { date: "2026-11-05", cat: "lab", org: "Labroots", title: "xMAP Connect 2026 Virtual Series", imgs: ["labroots-xmap-2026.jpg"] },
  { date: "2026-11-03", cat: "dd", org: "Labroots", title: "Mass Spectrometry Across the Drug Discovery Funnel: From Structure and Function to In Vivo Insights", imgs: ["labroots-mass-spec-2026.jpg"] },
  { date: "2026-11-01", cat: "data", org: "Kaggle Learn", title: "Intro to Programming", imgs: ["kaggle-intro-programming-2026.jpg"] },
  { date: "2026", cat: "dd", org: "AI4Life Innovation Talk #9", title: "GNINA: Deep Learning for Molecular Docking and Virtual Screening", imgs: ["ai4life-gnina-2026.jpg"] },
  { date: "2026", cat: "data", org: "Kaggle Learn", title: "Python", imgs: [] },
  { date: "2026", cat: "data", org: "Kaggle Learn", title: "Intro to Machine Learning", imgs: [] },
  { date: "2025", cat: "dd", org: "AI2050 AI/ML Foundation", title: "AI/ML Tools for Drug Discovery", imgs: [] },
  { date: "2024-08-15", cat: "lab", org: "Proteintech Group", title: "IHC/IF Workshop", imgs: ["comp-01.jpg"] },
  { date: "2023-07-26", cat: "event", org: "IMPM, with the Wellcome Centre for Integrative Parasitology", title: "1st Schistosomiasis Day: Schistosomiasis Awareness and Scientific Networking",
    en: "Certificate of participation, Yaoundé.", fr: "Certificat de participation, Yaoundé.", imgs: ["comp-03.jpg"] },
  { date: "2023-07-14", cat: "data", org: "Evidence for Research and IBHI unit, IMPM", title: "Module STAT 101: Introduction to Biostatistics with R",
    en: "Descriptive and inferential statistics, introduction to linear and logistic regression with R and RStudio.", fr: "Statistique descriptive et inférentielle, introduction à la régression linéaire et logistique avec R et RStudio.", imgs: ["comp-02.jpg"] },
  { date: "2023-02-09", cat: "clin", org: "Global Health Training Centre", title: "Good Clinical Laboratory Practice (GCLP), six modules",
    en: "Scores: Organisation and Personnel 95%, Facilities, Equipment, Materials and Reagents 95%, Standard Operating Procedures and Analytical Plan 90%, Quality Management 92%, Method and Systems Validation 80%, Sample Management, Conduct of the Work, Data Recording and Data Reporting 90%.",
    fr: "Scores : Organisation and Personnel 95 %, Facilities, Equipment, Materials and Reagents 95 %, Standard Operating Procedures and Analytical Plan 90 %, Quality Management 92 %, Method and Systems Validation 80 %, Sample Management, Conduct of the Work, Data Recording and Data Reporting 90 %.",
    imgs: ["comp-10.jpg", "comp-08.jpg", "comp-07.jpg", "comp-11.jpg", "comp-09.jpg", "comp-12.jpg"] },
  { date: "2023-01-25", cat: "clin", org: "Global Health Training Centre", title: "Introduction to Clinical Research",
    en: "Score: 100%.", fr: "Score : 100 %.", imgs: ["comp-06.jpg"] },
  { date: "2022", cat: "lab", org: "J&A Oben Foundation", title: "Internship in biochemical analysis techniques",
    en: "Internship attestation.", fr: "Attestation de stage.", imgs: ["comp-04.jpg"] },
  { date: "2022", cat: "clin", org: "CITI Program", title: "Ethics in Research", imgs: [] },
  { date: "2021-05-07", cat: "event", org: "L'Éveil du Génie, AEFAS and EACS, University of Yaoundé 1", title: "Training seminar on the manufacture of cosmetic and food products",
    en: "Certificate of participation.", fr: "Certificat de participation.", imgs: ["comp-05.jpg"] }
];

const REFS = [];
