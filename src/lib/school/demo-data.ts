import type { DashboardData } from "./types";

export const demoDashboardData: DashboardData = {
  metrics: [
    {
      label: "Élèves inscrits",
      value: "428",
      detail: "+18 dossiers depuis la rentrée",
      tone: "green",
    },
    {
      label: "Enseignants",
      value: "36",
      detail: "31 actifs, 5 vacataires",
      tone: "blue",
    },
    {
      label: "Classes",
      value: "18",
      detail: "Collège et lycée",
      tone: "gold",
    },
    {
      label: "Absences aujourd'hui",
      value: "12",
      detail: "7 justifiées, 5 à vérifier",
      tone: "red",
    },
    {
      label: "Paiements reçus",
      value: "8,4 M FCFA",
      detail: "Ce mois-ci",
      tone: "green",
    },
    {
      label: "Paiements en attente",
      value: "2,1 M FCFA",
      detail: "Relances à planifier",
      tone: "gold",
    },
  ],
  attendanceTrend: [94, 96, 92, 97, 95, 91],
  paymentTrend: [42, 57, 61, 68, 74, 82],
  announcements: [
    {
      id: "ann-1",
      title: "Réunion pédagogique de coordination",
      audience: "Direction et enseignants",
      priority: "importante",
      date: "Vendredi 14 juin",
    },
    {
      id: "ann-2",
      title: "Rappel des dossiers d'admission",
      audience: "Parents",
      priority: "normale",
      date: "Lundi 17 juin",
    },
    {
      id: "ann-3",
      title: "Contrôle de présence renforcé",
      audience: "Vie scolaire",
      priority: "urgente",
      date: "Aujourd'hui",
    },
  ],
  activities: [
    {
      id: "act-1",
      label: "Nouvelle inscription",
      detail: "MBOUMBA Inès ajoutée en 2nde A",
      date: "09:14",
    },
    {
      id: "act-2",
      label: "Paiement enregistré",
      detail: "Reçu BJ-2026-0184 pour NDOUMOU Lucas",
      date: "10:22",
    },
    {
      id: "act-3",
      label: "Note publiée",
      detail: "Mathématiques - 3e B - Trimestre 2",
      date: "11:03",
    },
    {
      id: "act-4",
      label: "Absence justifiée",
      detail: "Certificat reçu pour EYI Rose",
      date: "12:40",
    },
  ],
  students: [
    {
      id: "stu-1",
      matricule: "BJ-26-001",
      fullName: "MBOUMBA Inès",
      className: "2nde A",
      status: "actif",
      parent: "Mme MBOUMBA Diane",
    },
    {
      id: "stu-2",
      matricule: "BJ-26-002",
      fullName: "NDOUMOU Lucas",
      className: "3e B",
      status: "actif",
      parent: "M. NDOUMOU Serge",
    },
    {
      id: "stu-3",
      matricule: "BJ-26-003",
      fullName: "EYI Rose",
      className: "Terminale D",
      status: "en attente",
      parent: "Mme EYI Carine",
    },
  ],
  classes: [
    {
      id: "class-1",
      name: "6e A",
      level: "Collège",
      students: 28,
      mainTeacher: "Mme Akanda",
    },
    {
      id: "class-2",
      name: "3e B",
      level: "Collège",
      students: 31,
      mainTeacher: "M. Ondo",
    },
    {
      id: "class-3",
      name: "Terminale D",
      level: "Lycée",
      students: 24,
      mainTeacher: "Mme Nguema",
    },
  ],
};
