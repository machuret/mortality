export interface CountrySolution {
  slug: string;
  situation: string;
  howUltrasoundHelps: string;
  trainingGap: string;
}

export const SOLUTIONS: Record<string, CountrySolution> = {
  afghanistan: {
    slug: "afghanistan",
    situation:
      "Afghanistan has the highest infant mortality rate in this dataset. Decades of conflict have destroyed healthcare infrastructure across much of the country. Most women give birth at home, without skilled attendance, in areas where clinics are inaccessible or non-functional. Obstetric emergencies — haemorrhage, obstructed labour, pre-eclampsia — go undetected and unmanaged.",
    howUltrasoundHelps:
      "The majority of Afghanistan's maternal deaths are from postpartum haemorrhage and obstructed labour — both detectable prenatally. A single antenatal POCUS scan can identify placenta previa, malpresentation, and multiple pregnancy, allowing safe transfer planning well before labour begins. Community midwives trained in basic OB POCUS through programs like GUSI's can provide this assessment in primary health centres without requiring hospital infrastructure.",
    trainingGap:
      "Afghanistan has critical shortages of skilled birth attendants. Short-duration POCUS training for existing community midwives and nurses — GUSI's model — is one of the fastest pathways to reducing obstetric mortality without requiring years of medical training.",
  },
  mali: {
    slug: "mali",
    situation:
      "Mali is in the grip of a protracted humanitarian emergency, with conflict in the north displacing communities and destroying health facilities. Even in stable regions, only 43% of births are attended by a skilled health worker. The country's vast geography means that a pregnant woman in rural Mopti or Gao may be six hours from the nearest maternity unit.",
    howUltrasoundHelps:
      "Mali's maternal death profile is dominated by haemorrhage (34%), hypertensive disorders (16%), and sepsis. Haemorrhage and hypertensive deaths are precisely where prenatal ultrasound has the most impact — identifying high-risk pregnancies that need referral to a facility capable of caesarean delivery and blood transfusion. A trained health worker with a portable device at a community clinic can screen every pregnant woman in her catchment area and risk-stratify appropriately.",
    trainingGap:
      "Mali has approximately 1 physician per 10,000 people in rural areas. Shifting diagnostic capability to nurses and midwives through rapid POCUS training is not a workaround — it is the only realistic solution.",
  },
  somalia: {
    slug: "somalia",
    situation:
      "Somalia has one of the lowest skilled birth attendance rates in the world — estimated at below 30% nationally, and far lower in conflict-affected areas. The country lacks a functioning national health system in large areas, and the majority of health services are delivered by NGOs, community health workers, and informal traditional birth attendants.",
    howUltrasoundHelps:
      "In Somalia's context, the most impactful use of portable ultrasound is gestational age assessment and fetal position screening at community level. Many Somali women do not access antenatal care until late in pregnancy or not at all. A handheld POCUS device allows a community health worker to perform a rapid assessment during a home visit — identifying twins, malpresentations, and placenta previa that would otherwise be discovered only at the moment of delivery.",
    trainingGap:
      "Traditional birth attendants (TBAs) attend a significant proportion of deliveries in Somalia. Task-shifting POCUS skills to existing nurses and midwives within NGO health networks — GUSI's OB POCUS fellowship model is well-suited here — can create trained ultrasonographers within months rather than years.",
  },
  "central-african-rep": {
    slug: "central-african-rep",
    situation:
      "The CAR has been in near-continuous conflict since 2012, with repeated displacement of both populations and healthcare workers. The country has one of the lowest physician densities on Earth — approximately 0.07 per 1,000 people. Hospital-based obstetric ultrasound is essentially non-existent outside of Bangui.",
    howUltrasoundHelps:
      "For the CAR, the priority application of portable ultrasound is haemorrhage prevention. Identifying placenta previa and abnormal placentation during pregnancy allows providers — even without surgical capability — to plan transfers to facilities that do have it. A single trained nurse with a portable POCUS device can screen hundreds of women per month, identifying those at highest risk and coordinating referral before an emergency occurs.",
    trainingGap:
      "Online training through platforms like GUSI's ScanHub™ is particularly relevant for the CAR, where stable internet access in urban centres allows training even when in-person instruction cannot be safely delivered in conflict-affected zones.",
  },
  chad: {
    slug: "chad",
    situation:
      "Chad has the second-highest maternal mortality rate in this dataset — 1,063 deaths per 100,000 live births. A woman in Chad faces a 1-in-14 lifetime risk of dying from a pregnancy-related cause. The country has under 500 physicians for a population of 17 million, the vast majority concentrated in N'Djamena. Rural women typically walk hours to reach any form of healthcare.",
    howUltrasoundHelps:
      "Chad's maternal death profile is almost entirely preventable with antenatal detection. Pre-eclampsia, placenta previa, and obstructed labour from undiagnosed malpresentation account for the majority of deaths. Portable POCUS — designed for low-resource settings, running on standard batteries with no maintenance infrastructure — can be deployed to village health centres operated by nurses trained through programs like GUSI's, and sustained with minimal ongoing cost.",
    trainingGap:
      "Chad requires a massive scale-up of antenatal care quality, not just quantity. Women attending four antenatal visits but receiving no ultrasound remain unscreened for the conditions that kill them. GUSI's OB POCUS training delivers the skills to make every antenatal visit a genuine screening encounter.",
  },
  "sierra-leone": {
    slug: "sierra-leone",
    situation:
      "Sierra Leone has never fully recovered from the destruction of its health system during the 1991–2002 civil war, or from the 2014–2016 Ebola epidemic that killed a disproportionate number of health workers. Today, it consistently ranks among the most dangerous places in the world to give birth.",
    howUltrasoundHelps:
      "Sierra Leone's Directorate of Health Services has identified skilled birth attendance and antenatal care quality as the two most impactful intervention points. POCUS training for skilled birth attendants directly addresses both. A midwife who can perform a basic OB scan at the first antenatal visit can identify malpresentation (~4% of pregnancies), placenta previa (0.5%), and multiple pregnancy — all conditions requiring obstetric intervention that, undetected, frequently cause haemorrhage and obstructed labour deaths.",
    trainingGap:
      "Sierra Leone's Reproductive and Child Health Directorate has partnered with international organizations to deploy portable ultrasound devices to district health facilities. The limiting factor is consistently trained operators. GUSI's rapid-certification model is directly applicable to filling this gap.",
  },
  niger: {
    slug: "niger",
    situation:
      "Niger has the world's highest fertility rate (7.0 children per woman) and one of its youngest populations. The sheer volume of births — over 900,000 per year — in a country with minimal healthcare infrastructure creates an enormous burden that the existing health system cannot absorb. Over 80% of Niger's population lives in rural areas.",
    howUltrasoundHelps:
      "With such high birth volume and low provider density, any technology that allows a single health worker to do more, see more, and act earlier has multiplied impact. Portable POCUS in Niger is most powerful as a triage tool — allowing a nurse at a rural health post to rapidly identify the 10–15% of pregnancies that carry high risk, ensuring those women reach a facility capable of managing complications.",
    trainingGap:
      "Niger's community health worker cadre is large and relatively well-organized. Introducing POCUS as a component of their toolkit — with training delivered through GUSI's online OB POCUS course accessible via mobile device — represents a scalable, affordable path to dramatically better antenatal screening coverage.",
  },
  guinea: {
    slug: "guinea",
    situation:
      "Guinea has made modest progress in maternal mortality reduction over the past decade but remains in the top ten globally. Barriers to care are cultural as well as infrastructural — many women prefer home delivery and are reluctant to attend antenatal clinics staffed by male providers. Female community health workers play a critical bridging role.",
    howUltrasoundHelps:
      "In Guinea's cultural context, the most impactful deployment of POCUS is through female community health workers conducting home-based antenatal visits. A small, handheld device allows these workers to offer something concrete — a view of the baby, confirmation of position, heartbeat visualization — that builds trust and engagement with the healthcare system while simultaneously providing clinical screening.",
    trainingGap:
      "Guinea has an active community health worker program but POCUS training has not yet been integrated. GUSI's online and workshop-based training is adaptable to this cadre with appropriate supervision structures.",
  },
  "south-sudan": {
    slug: "south-sudan",
    situation:
      "South Sudan has the highest maternal mortality rate in the world — 1,223 deaths per 100,000 live births. A woman born in South Sudan has a 1-in-7 lifetime risk of dying in pregnancy or childbirth. Ongoing conflict, displacement, collapse of health infrastructure, and extreme provider shortages make this the most challenging environment on this map.",
    howUltrasoundHelps:
      "In South Sudan's context, portable ultrasound is not a luxury — it is arguably the single most impactful diagnostic investment available. The country's maternal deaths are dominated by haemorrhage, sepsis, and obstructed labour. All three have a detectable prenatal signature on ultrasound. The goal of POCUS here is simple: identify the women most likely to die, and get them to the facilities — often supported by MSF, IRC, or other humanitarian organizations — that can save them.",
    trainingGap:
      "South Sudan's health system is largely operated by international NGOs and a nascent Ministry of Health. GUSI's global health partnerships make them directly relevant here — training programs delivered to NGO health workers in stable areas can create a cadre of POCUS-capable providers who dramatically extend the diagnostic reach of each humanitarian health facility.",
  },
  nigeria: {
    slug: "nigeria",
    situation:
      "Nigeria accounts for more maternal deaths in absolute numbers than any other country on Earth — approximately 82,000 per year. Despite being Africa's largest economy, healthcare access is profoundly inequitable. Urban Nigerians have access to sophisticated obstetric care; rural Nigerians in Kebbi, Sokoto, or Zamfara state face conditions comparable to the most underserved countries on this list.",
    howUltrasoundHelps:
      "Nigeria's healthcare system already includes ultrasound in tertiary and secondary hospitals, but coverage collapses entirely at primary health care level. Extending POCUS capability to Nigeria's 30,000+ primary health centres — each typically staffed by nurses and community health officers — would create an antenatal screening infrastructure that reaches the women who currently have none.",
    trainingGap:
      "Nigeria has a large and growing population of nurses and community health officers who are motivated, organized, and capable of learning POCUS skills rapidly. GUSI's OB POCUS Essentials course — completable online and validated through supervised scanning — is highly applicable to this workforce. Nigeria also has the institutional capacity to support supervision and quality assurance at scale.",
  },
  "guinea-bissau": {
    slug: "guinea-bissau",
    situation:
      "Guinea-Bissau is a small country with one of West Africa's most fragile health systems. Frequent political instability disrupts health services; the country has fewer than 200 physicians for 2 million people. Antenatal care coverage is approximately 65%, but quality is extremely low — most visits involve a blood pressure check, weight measurement, and little else.",
    howUltrasoundHelps:
      "The transformation of antenatal care quality — not just coverage — is the key intervention for Guinea-Bissau. A woman who attends four antenatal visits without receiving an ultrasound remains unscreened for placenta previa, malpresentation, twins, and growth restriction. POCUS training for the nurses and midwives running Guinea-Bissau's antenatal clinics would turn existing visits into genuine clinical assessments.",
    trainingGap:
      "With fewer than 200 physicians nationwide, task-shifting to nurses and midwives is not optional — it is the only viable path. GUSI's short-duration certification model is specifically designed for this scenario.",
  },
  lesotho: {
    slug: "lesotho",
    situation:
      "Lesotho is a small, mountainous country entirely surrounded by South Africa, with high rates of HIV/AIDS that significantly elevate maternal risk. HIV-positive women face sharply increased complications during pregnancy, many of which are detectable by ultrasound.",
    howUltrasoundHelps:
      "POCUS in Lesotho's context is particularly valuable for monitoring HIV-positive pregnancies — identifying fetal growth restriction, placental complications, and the indicators of severe anaemia that HIV and its treatment can cause. The country has a relatively functional health system compared to others on this list; training existing nursing staff in POCUS is achievable within the existing infrastructure.",
    trainingGap:
      "Lesotho's nursing workforce is trained and organized. Integrating POCUS into antenatal protocols — with GUSI's curriculum providing the standardized training pathway — is a realistic near-term goal requiring primarily political will and training investment.",
  },
  mozambique: {
    slug: "mozambique",
    situation:
      "Mozambique has made genuine progress in maternal mortality reduction over the past two decades, but a series of devastating cyclones and the Cabo Delgado insurgency have repeatedly set back health infrastructure, particularly in the centre and north of the country.",
    howUltrasoundHelps:
      "Mozambique is an example of where portable ultrasound has already shown impact — several pilot programs have deployed POCUS to rural health centres with positive outcomes. Scaling these programs nationally, with standardized training through organizations like GUSI, is the logical next step. The existing evidence base from Mozambique itself makes the case for investment clear.",
    trainingGap:
      "Mozambique's challenge is scaling what has already been proven to work. National standardization of POCUS training through GUSI's curriculum, combined with government commitment to equip all district health centres, would achieve nationwide coverage within a 5-year programme.",
  },
  "burkina-faso": {
    slug: "burkina-faso",
    situation:
      "Burkina Faso is experiencing an unprecedented humanitarian crisis driven by the Sahel insurgency, which has displaced over 2 million people and caused the closure of hundreds of health facilities. Mobile health delivery — taking services to displaced communities — is increasingly the only model that works.",
    howUltrasoundHelps:
      "Portable POCUS is uniquely suited to the mobile health model being deployed in Burkina Faso. A handheld device, carried in a backpack alongside essential medicines, allows a health worker visiting a displaced community to provide a level of obstetric assessment previously impossible outside of fixed facilities. GUSI's training model — which does not require hospital affiliation — enables community health workers operating in humanitarian contexts to acquire POCUS skills.",
    trainingGap:
      "The expulsion of key NGOs following the 2022 coups has shrunk the available training infrastructure. GUSI's online ScanHub™ platform — accessible anywhere with a smartphone — provides a training pathway that does not depend on in-country NGO presence.",
  },
  angola: {
    slug: "angola",
    situation:
      "Angola's oil wealth has not translated to health equity. The capital, Luanda, has reasonable access to healthcare; vast interior provinces — Moxico, Cuando Cubango, Cuanza Sul — have population densities below 5 people per square kilometre and health infrastructure that has never fully recovered from the 27-year civil war.",
    howUltrasoundHelps:
      "Angola's geographic challenge makes portable technology particularly compelling. Battery-powered handheld ultrasound devices — some of which connect to smartphones and require no additional hardware — can be deployed to health posts in Angola's interior that have no electricity grid connection. Training health workers through GUSI's online platform, supplemented by periodic in-person supervision from provincial hospitals, is a realistic deployment pathway.",
    trainingGap:
      "Angola has the financial resources — from oil revenues — to fund a national POCUS deployment program. The gap is not funding but trained operators and a structured rollout program. GUSI's certification model provides the framework.",
  },
  benin: {
    slug: "benin",
    situation:
      "Benin has a more functional health system than many countries on this list but faces persistent urban-rural inequity. Voodoo-based traditional medicine remains influential in rural areas, and traditional birth attendants attend a significant proportion of deliveries in the south.",
    howUltrasoundHelps:
      "Benin has been a site of POCUS research showing that nurses trained in basic obstetric ultrasound in a short-duration program can safely and accurately identify malpresentation and placenta previa. This evidence base exists. The challenge is scaling the training nationally. GUSI's standardized curriculum and online delivery model provides the infrastructure to do this.",
    trainingGap:
      "Benin's relatively stable political environment and organized nursing cadre make it one of the best candidates in West Africa for rapid national POCUS scale-up. A government-GUSI partnership to integrate OB POCUS into nursing school curricula could achieve coverage within 3–5 years.",
  },
  mauritania: {
    slug: "mauritania",
    situation:
      "Mauritania's vast Saharan geography means that most of the country's 4 million people live in a narrow strip along the Senegal River, in scattered oasis settlements, or in peri-urban Nouakchott. Health infrastructure is concentrated in the capital; the rest of the country is essentially unserved.",
    howUltrasoundHelps:
      "Mauritania's nomadic and semi-nomadic populations are not reliably reachable by fixed health facilities. Mobile health teams equipped with portable POCUS devices can conduct antenatal screening during community outreach, identifying high-risk pregnancies and coordinating referral to the nearest capable facility. Training for these mobile teams is the priority.",
    trainingGap:
      "Mobile health team members in Mauritania require training that is portable, rapid, and does not require hospital infrastructure. GUSI's online OB POCUS course, combined with supervised practice sessions during team deployments, directly meets this need.",
  },
  cameroon: {
    slug: "cameroon",
    situation:
      "Cameroon has one of Africa's more developed health systems, but is experiencing severe deterioration in the Anglophone regions due to ongoing armed conflict. The Anglophone crisis has caused the closure of hundreds of health facilities and the displacement of over 750,000 people in regions that previously had reasonable healthcare access.",
    howUltrasoundHelps:
      "In stable Cameroon, POCUS training for the existing nursing cadre is straightforwardly implementable — the infrastructure exists. In the Anglophone crisis zones, portable POCUS deployed through humanitarian health teams serves a bridging function, maintaining obstetric diagnostic capability in the absence of functioning fixed facilities. GUSI's global health network is relevant to both contexts.",
    trainingGap:
      "Cameroon needs a two-track approach: national integration of POCUS training through nursing schools in stable regions, and emergency deployment of trained humanitarian health workers in the Anglophone crisis zones. GUSI's programs support both tracks.",
  },
  "cote-divoire": {
    slug: "cote-divoire",
    situation:
      "Côte d'Ivoire has the largest economy in francophone West Africa and has made meaningful progress on maternal mortality, but deep inequity persists between urban Abidjan and rural western and northern regions. The country is also navigating recovery from two political crises that damaged health infrastructure.",
    howUltrasoundHelps:
      "Côte d'Ivoire's mid-level nurses (infirmiers d'État) are a well-organized cadre capable of absorbing POCUS training with appropriate support. Several international pilots have demonstrated feasibility. A national POCUS training program, structured around GUSI's OB curriculum and delivered through the national nursing schools, could achieve coverage across the country within 3–5 years.",
    trainingGap:
      "The existing nursing school infrastructure and relatively strong governance in Côte d'Ivoire make it an excellent candidate for institutionalizing POCUS as a core nursing competency. GUSI's certification framework provides the standardized pathway.",
  },
  "dr-congo": {
    slug: "dr-congo",
    situation:
      "The Democratic Republic of Congo is the second-largest country in Africa, with a population of over 100 million people and health infrastructure that reaches only a fraction of them. Eastern DRC is in a state of protracted conflict. Western provinces face extreme poverty and limited road access.",
    howUltrasoundHelps:
      "The DRC requires a decentralized approach — no centralized training program can reach its population spread across an area the size of Western Europe. GUSI's online training model, combined with in-person certification workshops at provincial teaching hospitals, allows training to ripple outward from urban centres without requiring trainees to travel to Kinshasa. This hub-and-spoke POCUS training model is specifically designed for countries with the DRC's geography.",
    trainingGap:
      "DRC has provincial teaching hospitals that can serve as POCUS training hubs. GUSI's train-the-trainer model — certifying master trainers at each provincial hub who then train district-level health workers — is the only feasible approach to achieving meaningful national coverage.",
  },
  liberia: {
    slug: "liberia",
    situation:
      "Liberia's health system was rebuilt almost from scratch after its civil wars, and then devastated again by the 2014–2016 Ebola epidemic. Today, the country has a young health workforce with limited diagnostic skills for non-infectious conditions — including obstetric emergencies.",
    howUltrasoundHelps:
      "Liberia's young, post-Ebola health workforce is actually an asset in the context of POCUS training — they are adaptable, motivated, and comfortable with technology. GUSI's OB POCUS course, delivered online through ScanHub™, is accessible to Liberian nurses and midwives with smartphone access and can be completed alongside ongoing clinical duties.",
    trainingGap:
      "Liberia's established NGO health sector can provide the supervision structure needed for clinical sign-off. GUSI's online-first model — with in-person supervised practice as the final step — maps perfectly onto Liberia's existing international NGO health network.",
  },
  uganda: {
    slug: "uganda",
    situation:
      "Uganda has made significant progress on maternal mortality and has a relatively active global health research environment. Several POCUS implementation studies have been conducted in Uganda by Makerere University and international partners, providing a strong evidence base.",
    howUltrasoundHelps:
      "Uganda is, in many ways, a model for what a scaled POCUS program can look like. Pilot programs have shown that midwives trained in basic OB POCUS in a 5-day intensive course can accurately identify malpresentation, placenta previa, and gestational age — and that this capability meaningfully changes referral patterns and outcomes.",
    trainingGap:
      "The challenge in Uganda is not proof of concept — it is national scale-up. Training through GUSI's structured curriculum and certification process, recognized by national health authorities, would support that transition from successful pilots to nationwide standard of care.",
  },
  "equatorial-guinea": {
    slug: "equatorial-guinea",
    situation:
      "Equatorial Guinea is an oil-producing country with higher income than most on this list, yet its health outcomes remain poor — evidence that wealth alone does not translate to health equity. Health spending has historically been concentrated in Malabo rather than distributed equitably.",
    howUltrasoundHelps:
      "Equatorial Guinea has the financial capacity to fund a national POCUS training program — the barrier is political will and training infrastructure, not funding. GUSI's model provides the curriculum and certification framework; what is needed is a government partnership to mandate POCUS training as part of nursing and midwifery education.",
    trainingGap:
      "The key leverage point in Equatorial Guinea is government mandate. If the Ministry of Health required POCUS certification for all new nursing graduates — using GUSI's curriculum — the country's small population would allow near-complete coverage within a single training cycle.",
  },
  tanzania: {
    slug: "tanzania",
    situation:
      "Tanzania is a large country with significant regional variation in health outcomes. Tanzania has been an active site for global health innovation, and several organizations have piloted POCUS deployment in rural Tanzanian facilities with documented success.",
    howUltrasoundHelps:
      "Tanzania's experience with community-based POCUS is one of the strongest evidence bases on the continent. Studies conducted in rural Tanzanian facilities have shown that basic obstetric ultrasound performed by trained nurses reduces the rate of undetected malpresentation at delivery by over 60%. Tanzania has the infrastructure — nursing schools, health centres, a functioning Ministry of Health — to scale this nationally.",
    trainingGap:
      "Tanzania is missing a standardized national training pathway. GUSI's OB POCUS curriculum fills that gap directly — providing the structured, certified training that would allow Tanzania to transition from a patchwork of successful pilots to a national standard of care.",
  },
  "rep-of-congo": {
    slug: "rep-of-congo",
    situation:
      "Congo-Brazzaville has similar challenges of geographic isolation in the north and healthcare concentrated in Brazzaville and Pointe-Noire. The national health strategy has explicitly identified antenatal care quality improvement as a priority.",
    howUltrasoundHelps:
      "Republic of Congo's explicit focus on antenatal care quality makes it a natural fit for POCUS integration. Training the country's district hospital midwives — accessible through GUSI's online platform — is directly aligned with this stated national priority and achievable within existing health system structures.",
    trainingGap:
      "Congo-Brazzaville has the institutional structure to implement a national POCUS program. The Ministry of Health's stated commitment to ANC quality improvement provides the political mandate; GUSI's training infrastructure provides the educational pathway.",
  },
  ethiopia: {
    slug: "ethiopia",
    situation:
      "Ethiopia has made remarkable progress on maternal mortality through aggressive investment in community health workers (Health Extension Workers). However, the Tigray, Amhara, and Afar conflicts have caused massive setbacks in affected regions, and nationally, disparities remain extreme between urban and rural outcomes.",
    howUltrasoundHelps:
      "Ethiopia's Health Extension Worker (HEW) program — over 45,000 workers deployed to villages across the country — is one of the most ambitious community health worker systems in the world. Introducing POCUS as a component of HEW skill sets, with appropriate training and supervision, would create one of the world's largest community-based ultrasound screening programs.",
    trainingGap:
      "GUSI's rapid-training model and online delivery platform are directly applicable to HEW education at scale. Ethiopia has the deployment infrastructure — it needs the training curriculum and certification framework that GUSI provides.",
  },
  madagascar: {
    slug: "madagascar",
    situation:
      "Madagascar is an island with extreme regional variation — the capital Antananarivo has reasonable healthcare, but coastal and remote central highland communities are severely underserved. Cyclones regularly damage infrastructure in the south. The country has high rates of malnutrition that compound pregnancy risk.",
    howUltrasoundHelps:
      "Madagascar's island geography makes mobile health solutions particularly attractive. Battery-powered, handheld POCUS devices that do not require infrastructure represent a leap in what is achievable during community outreach visits. Training through GUSI's online platform is accessible in urban areas; cascading that training to rural health workers through in-person workshops at district hospitals builds the capacity needed for national impact.",
    trainingGap:
      "Madagascar's district hospital network provides natural training hubs for a cascade model. GUSI's train-the-trainer approach — certifying district-level trainers who then train community health workers — is the right architecture for Madagascar's geography.",
  },
  malawi: {
    slug: "malawi",
    situation:
      "Malawi is a small, densely populated, landlocked country with one of Africa's lowest physician-to-population ratios. Healthcare delivery is dominated by nurses and clinical officers. The country has a strong track record of task-shifting — training non-physician providers to perform procedures previously reserved for doctors, including caesarean sections.",
    howUltrasoundHelps:
      "Malawi's task-shifting culture makes it an ideal environment for POCUS scale-up. If clinical officers can safely perform caesarean sections — which they can and do — they can certainly be trained to perform diagnostic POCUS scans. GUSI's OB POCUS program, combined with Malawi's existing supervised clinical training infrastructure, represents a highly feasible pathway to nationwide obstetric ultrasound coverage.",
    trainingGap:
      "The evidence from Malawi's own task-shifting programs supports optimism about POCUS adoption. GUSI's OB POCUS Essentials course, integrated into clinical officer and nursing training programs, would achieve national coverage faster in Malawi than almost anywhere else on this list.",
  },
  sudan: {
    slug: "sudan",
    situation:
      "Sudan's ongoing conflict, which escalated dramatically in April 2023, has caused one of the world's worst humanitarian crises and the near-collapse of the health system in Khartoum State and across Darfur, Kordofan, and Gezira. Over 10 million people are displaced.",
    howUltrasoundHelps:
      "In Sudan's crisis context, portable POCUS devices are among the most practical diagnostic tools available — requiring no infrastructure, no electricity (battery-powered models), no laboratory, and minimal maintenance. Training humanitarian health workers through GUSI's online platform in areas with connectivity, and through intensive in-person workshops in stable regions, creates a cadre of POCUS-capable providers who can function effectively under field conditions.",
    trainingGap:
      "Sudan's crisis has produced a large population of displaced health workers — doctors, nurses, and midwives who have left conflict zones but retain their clinical skills. Rapid POCUS certification through GUSI's online platform would redeploy this existing workforce capability to serve displaced populations in safer areas.",
  },
  haiti: {
    slug: "haiti",
    situation:
      "Haiti is the Western Hemisphere's only country in the top 30 for both infant and maternal mortality. The country has been in a state of compound crisis since the 2010 earthquake. Nationwide gang control of Port-au-Prince has collapsed the healthcare system in the capital and surrounding areas.",
    howUltrasoundHelps:
      "Haiti has been a site of POCUS innovation by humanitarian organizations — Médecins Sans Frontières, Partners in Health, and others have deployed portable ultrasound in Haitian health facilities for over a decade, with documented positive impact. Formalizing POCUS training through GUSI's curriculum — including online components accessible from Haiti's provincial areas outside gang-controlled zones — and partnering with Haiti's strong NGO health sector would consolidate and scale what works.",
    trainingGap:
      "Haiti has a small but dedicated cadre of Haitian physicians and nurses who have received POCUS training over the years. Building on this cadre as master trainers, using GUSI's train-the-trainer model, is the fastest path to national coverage.",
  },
};

export function getSolutionBySlug(slug: string): CountrySolution | null {
  return SOLUTIONS[slug] ?? null;
}
