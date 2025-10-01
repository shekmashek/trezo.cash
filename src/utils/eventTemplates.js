import { v4 as uuidv4 } from 'uuid';

export const eventTemplates = [
  {
    id: 'construction-maison',
    name: 'Construction de maison',
    description: 'Modèle de budget prévisionnel pour la construction d\'une maison sur 2 étages.',
    icon: 'Home',
    color: 'green',
    purpose: 'event',
    data: {
      categories: {
        revenue: [
          { id: uuidv4(), name: 'FINANCEMENT DU PROJET', subCategories: [
            { id: uuidv4(), name: 'Apport personnel' },
            { id: uuidv4(), name: 'Prêt bancaire' },
            { id: uuidv4(), name: 'Aides et subventions' },
            { id: uuidv4(), name: 'Dons familiaux' },
          ]}
        ],
        expense: [
          { id: uuidv4(), name: 'FRAIS PRÉPARATOIRES & ADMINISTRATIFS', subCategories: [
            { id: uuidv4(), name: 'Honoraires géomètre (bornage)' },
            { id: uuidv4(), name: 'Étude de sol (Géotechnique)' },
            { id: uuidv4(), name: 'Diagnostic immobilier (amiante, plomb, etc.)' },
            { id: uuidv4(), name: 'État des risques naturels et technologiques (ERNMT)' },
            { id: uuidv4(), name: 'Honoraires architecte' },
            { id: uuidv4(), name: 'Honoraires bureau d\'études (structure, thermique)' },
            { id: uuidv4(), name: 'Établissement du permis de construire' },
            { id: uuidv4(), name: 'Taxe d\'aménagement' },
          ]},
          { id: uuidv4(), name: 'FRAIS DE TERRAIN', subCategories: [
            { id: uuidv4(), name: 'Achat du terrain' },
            { id: uuidv4(), name: 'Frais de notaire' },
            { id: uuidv4(), name: 'Viabilisation (raccordements)' },
            { id: uuidv4(), name: 'Clôture provisoire et débroussaillage' },
          ]},
          { id: uuidv4(), name: 'GROS ŒUVRE', subCategories: [
            { id: uuidv4(), name: 'Terrassement (déblai/remblai)' },
            { id: uuidv4(), name: 'Fondations et dallage' },
            { id: uuidv4(), name: 'Drainage et évacuation eaux pluviales' },
            { id: uuidv4(), name: 'Structure (murs, planchers)' },
            { id: uuidv4(), name: 'Charpente' },
            { id: uuidv4(), name: 'Escalier structurel' },
            { id: uuidv4(), name: 'Enduit de façade' },
            { id: uuidv4(), name: 'Menuiseries extérieures (portes, fenêtres)' },
            { id: uuidv4(), name: 'Étanchéité toiture' },
          ]},
          { id: uuidv4(), name: 'SECOND ŒUVRE', subCategories: [
            { id: uuidv4(), name: 'Couverture (tuiles, ardoises)' },
            { id: uuidv4(), name: 'Zinguerie et gouttières' },
            { id: uuidv4(), name: 'Fenêtres de toit' },
            { id: uuidv4(), name: 'Isolation (murs, combles, planchers)' },
            { id: uuidv4(), name: 'Cloisons et plafonds' },
            { id: uuidv4(), name: 'Menuiseries intérieures (portes)' },
            { id: uuidv4(), name: 'Escalier fini' },
          ]},
          { id: uuidv4(), name: 'TECHNIQUES & RÉSEAUX', subCategories: [
            { id: uuidv4(), name: 'Électricité (tableau, câblage, prises)' },
            { id: uuidv4(), name: 'Plomberie (réseaux, évacuations)' },
            { id: uuidv4(), name: 'Chauffage et production d\'eau chaude' },
            { id: uuidv4(), name: 'Ventilation (VMC)' },
            { id: uuidv4(), name: 'Autres (sécurité, domotique)' },
          ]},
          { id: uuidv4(), name: 'FINITIONS', subCategories: [
            { id: uuidv4(), name: 'Revêtements muraux (peinture, papier peint)' },
            { id: uuidv4(), name: 'Revêtements de sol (carrelage, parquet)' },
            { id: uuidv4(), name: 'Cuisine équipée' },
            { id: uuidv4(), name: 'Salle(s) de bains/douche' },
            { id: uuidv4(), name: 'WC' },
            { id: uuidv4(), name: 'Aménagements (placards, dressing)' },
            { id: uuidv4(), name: 'Cheminée ou poêle' },
            { id: uuidv4(), name: 'Volets et stores' },
          ]},
          { id: uuidv4(), name: 'AMÉNAGEMENTS EXTÉRIEURS', subCategories: [
            { id: uuidv4(), name: 'Voirie et accès (allées, terrasse)' },
            { id: uuidv4(), name: 'Garage ou abri voiture' },
            { id: uuidv4(), name: 'Paysagisme (terre, gazon, plantations)' },
            { id: uuidv4(), name: 'Éclairage extérieur et arrosage' },
            { id: uuidv4(), name: 'Piscine' },
            { id: uuidv4(), name: 'Clôture définitive et portail' },
          ]},
          { id: uuidv4(), name: 'FRAIS DIVERS & IMPRÉVUS', subCategories: [
            { id: uuidv4(), name: 'Frais de chantier (sanitaires, déchets)' },
            { id: uuidv4(), name: 'Assurances (dommages-ouvrage)' },
            { id: uuidv4(), name: 'Contrôles techniques' },
            { id: uuidv4(), name: 'Budget imprévus' },
            { id: uuidv4(), name: 'Frais de nettoyage final' },
          ]},
        ],
      },
      cashAccounts: [
        { id: uuidv4(), mainCategoryId: 'bank', name: 'Compte Projet Construction', initialBalance: 0 },
      ],
      entries: [],
      tiers: [], loans: [], borrowings: [],
    }
  }
];
