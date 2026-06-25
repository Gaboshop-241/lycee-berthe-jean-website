import type { Metadata } from "next";
import Link from "next/link";
import { getSiteContent } from "../i18n-server";
import { JsonLd } from "../JsonLd";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildPageMetadata } from "../seo";
import {
  ClosingCta,
  PageHero,
  SiteFooter,
} from "../site-components";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, pages } = await getSiteContent();
  const { faqTitle, faqDescription } = pages.metadata;

  return buildPageMetadata({
    title: faqTitle,
    description: faqDescription,
    path: "/faq",
    locale,
    image: "/assets/real/class-session.jpg",
    imageAlt: "Élèves du Lycée Privé International Berthe & Jean",
    keywords: ["FAQ admissions lycée Gabon", "frais lycée privé Essassa"],
  });
}

type FaqItem = {
  question: string;
  answer: string;
  category: string;
};

function getFaqData(locale: string): { categories: string[]; items: FaqItem[] } {
  if (locale === "en") {
    return {
      categories: ["Admissions", "Programs", "School life", "Fees", "Access"],
      items: [
        {
          category: "Admissions",
          question: "When do registrations open for the new school year?",
          answer:
            "Admission requests open before each school year. You can contact the school at any time to find out about available places. The administration processes files on a rolling basis depending on availability.",
        },
        {
          category: "Admissions",
          question: "What documents are required to apply?",
          answer:
            "To apply, you will need: a private admission request addressed to the principal, school reports for the three terms of the previous year, a legalized birth certificate, a medical certificate issued less than three months ago, a copy of the health booklet (6e students), and four recent passport photos.",
        },
        {
          category: "Admissions",
          question: "Can we visit the campus before enrolling?",
          answer:
            "Yes. Campus visits are by appointment. The team can present classrooms, school life spaces, admissions services and answer families' questions. Contact the administration by phone or email to schedule a visit.",
        },
        {
          category: "Admissions",
          question: "Does the school accept students transferring from other schools?",
          answer:
            "Yes. The school accepts students in transfer from other schools, subject to available places and a file review by the admissions committee. A transfer certificate or release document is required.",
        },
        {
          category: "Programs",
          question: "Which levels does the school offer?",
          answer:
            "The school offers a complete secondary school pathway, from 6e (lower secondary) to Terminale (upper secondary). This includes the lower secondary cycle (6e, 5e, 4e, 3e) and the upper secondary cycle (Seconde, Première, Terminale).",
        },
        {
          category: "Programs",
          question: "Which Baccalauréat streams are available?",
          answer:
            "The school prepares students for four Baccalauréat streams: Series A1 (Literary), Series B (Economic and Social Sciences), Series C (Mathematics and Physical Sciences) and Series D (Life and Earth Sciences).",
        },
        {
          category: "Programs",
          question: "How does the school prepare students for the BEPC and Baccalauréat?",
          answer:
            "The school offers intensive preparation for national examinations through reinforced courses, supervised study sessions, periodic assessments and regular practice tests. Teachers guide each student individually toward success.",
        },
        {
          category: "School life",
          question: "Is there a boarding option for students?",
          answer:
            "Yes. The school has separate boarding facilities with supervised study sessions and daily supervision. Boarding is an option for students from outside the area who need accommodation close to the school.",
        },
        {
          category: "School life",
          question: "What extracurricular activities are available?",
          answer:
            "The school offers sports activities (football, basketball, volleyball, athletics), cultural and artistic clubs, science workshops, educational trips and citizenship initiatives. These activities complement academic learning and promote personal development.",
        },
        {
          category: "School life",
          question: "What are the school opening hours?",
          answer:
            "The administration is open Monday to Friday from 7:30 AM to 5:00 PM and Saturday from 9:00 AM to 12:00 PM. For file requests, calling ahead helps confirm the relevant service is available.",
        },
        {
          category: "Fees",
          question: "Where can I find the 2026-2027 school fees?",
          answer:
            "The fees for the 2026-2027 school year are detailed in the official prospectus available for download on the Admissions page. The amounts should be confirmed with the administration during final registration, as they may vary by level.",
        },
        {
          category: "Fees",
          question: "Are there application or registration fees?",
          answer:
            "Yes, application fees and registration fees are included in the financial information in the school prospectus. Please consult the Admissions page or contact the administration directly for the current amounts.",
        },
        {
          category: "Access",
          question: "How do I get to the school from Libreville?",
          answer:
            "The school is located on National Road 1 (RN1), at PK 23, in Essassa, municipality of Ntoum. From Libreville, take the RN1 heading toward Ntoum/Essassa. The journey takes approximately 30 to 45 minutes depending on traffic.",
        },
        {
          category: "Access",
          question: "What is the school's exact address?",
          answer:
            "Route Nationale 1, PK 23 Essassa, commune de Ntoum, Estuaire, Gabon. Phone: +241 66 76 32 89. Email: contact@bertheetjean.ga.",
        },
      ],
    };
  }

  return {
    categories: ["Admissions", "Programmes", "Vie scolaire", "Frais", "Accès"],
    items: [
      {
        category: "Admissions",
        question: "Quand ouvrent les inscriptions pour la nouvelle année scolaire ?",
        answer:
          "Les demandes d'admission sont ouvertes avant chaque rentrée scolaire. Vous pouvez contacter l'école à tout moment pour connaître les places disponibles. L'administration traite les dossiers au fil de l'eau en fonction des disponibilités.",
      },
      {
        category: "Admissions",
        question: "Quelles pièces sont nécessaires pour constituer un dossier d'admission ?",
        answer:
          "Pour constituer votre dossier, vous aurez besoin de : une demande d'inscription à titre privé adressée au proviseur, les bulletins de notes des trois trimestres de l'année précédente, un acte de naissance légalisé, un certificat médical datant de moins de trois mois, une copie du carnet de santé pour les élèves de 6e, et quatre photos d'identité récentes.",
      },
      {
        category: "Admissions",
        question: "Peut-on visiter le campus avant de s'inscrire ?",
        answer:
          "Oui. Les visites du campus se font sur rendez-vous. L'équipe peut présenter les salles de classe, les espaces de vie scolaire, les services d'admission et répondre aux questions des familles. Contactez l'administration par téléphone ou e-mail pour planifier une visite.",
      },
      {
        category: "Admissions",
        question: "L'établissement accueille-t-il les élèves en transfert d'un autre établissement ?",
        answer:
          "Oui. L'établissement accueille les élèves en transfert provenant d'autres établissements, sous réserve de places disponibles et d'une étude du dossier par la commission d'admission. Un certificat de scolarité ou de radiation est demandé.",
      },
      {
        category: "Programmes",
        question: "Quels niveaux scolaires l'établissement propose-t-il ?",
        answer:
          "L'établissement propose un parcours secondaire complet, de la 6e au lycée jusqu'à la Terminale. Cela inclut le cycle collège (6e, 5e, 4e, 3e) et le cycle lycée (2nde, 1ère, Terminale).",
      },
      {
        category: "Programmes",
        question: "Quelles séries du Baccalauréat sont proposées ?",
        answer:
          "L'établissement prépare ses élèves à quatre séries du Baccalauréat : Série A1 (Littéraire), Série B (Sciences Économiques et Sociales), Série C (Mathématiques et Sciences Physiques) et Série D (Sciences de la Vie et de la Terre).",
      },
      {
        category: "Programmes",
        question: "Comment l'établissement prépare-t-il les élèves au BEPC et au Baccalauréat ?",
        answer:
          "L'établissement propose une préparation intensive aux examens nationaux grâce à des cours renforcés, des études surveillées, des évaluations périodiques et des simulations régulières. Les enseignants accompagnent individuellement chaque élève vers la réussite.",
      },
      {
        category: "Vie scolaire",
        question: "Y a-t-il un internat pour les élèves ?",
        answer:
          "Oui. L'établissement dispose d'un internat non mixte avec études surveillées et encadrement quotidien. L'internat est une option pour les élèves venant de localités éloignées qui ont besoin d'hébergement à proximité du lycée.",
      },
      {
        category: "Vie scolaire",
        question: "Quelles activités parascolaires sont proposées ?",
        answer:
          "L'établissement propose des activités sportives (football, basketball, volleyball, athlétisme), des clubs culturels et artistiques, des ateliers scientifiques, des sorties éducatives et des initiatives citoyennes. Ces activités complètent les apprentissages académiques et favorisent le développement personnel.",
      },
      {
        category: "Vie scolaire",
        question: "Quels sont les horaires d'ouverture de l'établissement ?",
        answer:
          "L'administration reçoit du lundi au vendredi de 7h30 à 17h00 et le samedi de 9h00 à 12h00. Pour les demandes de dossier, un appel préalable permet de confirmer la disponibilité du service concerné.",
      },
      {
        category: "Frais",
        question: "Où trouver les frais de scolarité 2026-2027 ?",
        answer:
          "Les frais de scolarité pour l'année 2026-2027 sont détaillés dans le prospectus officiel, téléchargeable sur la page Admissions. Les montants sont à confirmer auprès de l'administration lors de l'inscription finale, car ils peuvent varier selon le niveau.",
      },
      {
        category: "Frais",
        question: "Y a-t-il des frais de dossier ou d'inscription ?",
        answer:
          "Oui, des frais de dossier et d'inscription sont inclus dans les informations financières du prospectus scolaire. Consultez la page Admissions ou contactez directement l'administration pour connaître les montants en vigueur.",
      },
      {
        category: "Accès",
        question: "Comment se rendre au lycée depuis Libreville ?",
        answer:
          "L'établissement est situé sur la Route Nationale 1 (RN1), au PK 23, à Essassa, commune de Ntoum. Depuis Libreville, empruntez la RN1 en direction de Ntoum/Essassa. Le trajet dure environ 30 à 45 minutes selon la circulation.",
      },
      {
        category: "Accès",
        question: "Quelle est l'adresse exacte de l'établissement ?",
        answer:
          "Route Nationale 1, PK 23 Essassa, commune de Ntoum, Estuaire, Gabon. Téléphone : +241 66 76 32 89. E-mail : contact@bertheetjean.ga.",
      },
    ],
  };
}

export default async function FaqPage() {
  const { common, data, locale } = await getSiteContent();
  const faqData = getFaqData(locale);
  const heroTitle = locale === "en" ? "Frequently Asked Questions" : "Questions fréquentes";
  const heroText =
    locale === "en"
      ? "Find all the answers to your questions about Lycée Privé International Berthe & Jean: admissions, programs, school life, fees and access."
      : "Retrouvez toutes les réponses à vos questions sur le Lycée Privé International Berthe & Jean : admissions, programmes, vie scolaire, frais et accès.";

  const faqJsonLd = buildFaqJsonLd(faqData.items);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: locale === "en" ? "Home" : "Accueil", path: "/" },
    { name: locale === "en" ? "FAQ" : "Questions fréquentes", path: "/faq" },
  ]);

  return (
    <main className="site-shell">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <PageHero
        active="contact"
        title={heroTitle}
        text={heroText}
        image="/assets/real/class-session.jpg"
        imageAlt={
          locale === "en"
            ? "Students at Lycée Berthe & Jean"
            : "Élèves du Lycée Berthe & Jean"
        }
        common={common}
        currentLocale={locale}
        items={data.navItems}
        actions={[
          {
            label: locale === "en" ? "Contact us" : "Nous contacter",
            href: "/contact#message",
          },
          {
            label: locale === "en" ? "Admissions" : "Admissions",
            href: "/admissions",
            variant: "secondary",
          },
        ]}
      />

      <section className="page-section">
        {faqData.categories.map((category) => {
          const categoryItems = faqData.items.filter(
            (item) => item.category === category
          );
          return (
            <div key={category} className="faq-category">
              <h2>{category}</h2>
              <div className="faq-grid">
                {categoryItems.map((item) => (
                  <details key={item.question} open>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          );
        })}
        <div className="documents-followup" style={{ marginTop: "2rem" }}>
          <p>
            {locale === "en" ? (
              <>
                For admission procedures, visit our{" "}
                <Link href="/admissions">Admissions</Link> page. To contact us
                directly, use the <Link href="/contact">Contact</Link> page.
              </>
            ) : (
              <>
                Pour les démarches d&apos;admission, consultez notre page{" "}
                <Link href="/admissions">Admissions</Link>. Pour nous contacter
                directement, utilisez la page <Link href="/contact">Contact</Link>.
              </>
            )}
          </p>
        </div>
      </section>

      <ClosingCta
        title={
          locale === "en"
            ? "Come and discover our school"
            : "Venez découvrir notre lycée"
        }
        text={
          locale === "en"
            ? "Contact our admissions service or visit the campus to find out more about Lycée Privé International Berthe & Jean in Essassa, Gabon."
            : "Contactez notre service admissions ou visitez le campus pour en savoir plus sur le Lycée Privé International Berthe & Jean à Essassa, Gabon."
        }
        common={common}
      />

      <SiteFooter common={common} info={data.contactInfo} items={data.navItems} />
    </main>
  );
}
