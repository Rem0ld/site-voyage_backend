import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const afghan = {
  name: "Afghanistan",
  topLevelDomain: [".af"],
  alpha2Code: "AF",
  alpha3Code: "AFG",
  callingCodes: ["93"],
  capital: "Kabul",
  altSpellings: ["AF", "Afġānistān"],
  region: "Asia",
  subregion: "Southern Asia",
  population: 27657145,
  latlng: [33.0, 65.0],
  demonym: "Afghan",
  area: 652230.0,
  gini: 27.8,
  timezones: ["UTC+04:30"],
  borders: ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"],
  nativeName: "افغانستان",
  numericCode: "004",
  currencies: [{ code: "AFN", name: "Afghan afghani", symbol: "؋" }],
  languages: [
    { iso639_1: "ps", iso639_2: "pus", name: "Pashto", nativeName: "پښتو" },
    { iso639_1: "uz", iso639_2: "uzb", name: "Uzbek", nativeName: "Oʻzbek" },
    { iso639_1: "tk", iso639_2: "tuk", name: "Turkmen", nativeName: "Türkmen" },
  ],
  translations: {
    de: "Afghanistan",
    es: "Afganistán",
    fr: "Afghanistan",
    ja: "アフガニスタン",
    it: "Afghanistan",
    br: "Afeganistão",
    pt: "Afeganistão",
    nl: "Afghanistan",
    hr: "Afganistan",
    fa: "افغانستان",
  },
  flag: "https://restcountries.eu/data/afg.svg",
  regionalBlocs: [
    {
      acronym: "SAARC",
      name: "South Asian Association for Regional Cooperation",
      otherAcronyms: [],
      otherNames: [],
    },
  ],
  cioc: "AFG",
};

const aland = {
  name: "Åland Islands",
  topLevelDomain: [".ax"],
  alpha2Code: "AX",
  alpha3Code: "ALA",
  callingCodes: ["358"],
  capital: "Mariehamn",
  altSpellings: ["AX", "Aaland", "Aland", "Ahvenanmaa"],
  region: "Europe",
  subregion: "Northern Europe",
  population: 28875,
  latlng: [60.116667, 19.9],
  demonym: "Ålandish",
  area: 1580.0,
  gini: null,
  timezones: ["UTC+02:00"],
  borders: [],
  nativeName: "Åland",
  numericCode: "248",
  currencies: [{ code: "EUR", name: "Euro", symbol: "€" }],
  languages: [
    { iso639_1: "sv", iso639_2: "swe", name: "Swedish", nativeName: "svenska" },
  ],
  translations: {
    de: "Åland",
    es: "Alandia",
    fr: "Åland",
    ja: "オーランド諸島",
    it: "Isole Aland",
    br: "Ilhas de Aland",
    pt: "Ilhas de Aland",
    nl: "Ålandeilanden",
    hr: "Ålandski otoci",
    fa: "جزایر الند",
  },
  flag: "https://restcountries.eu/data/ala.svg",
  regionalBlocs: [
    {
      acronym: "EU",
      name: "European Union",
      otherAcronyms: [],
      otherNames: [],
    },
  ],
  cioc: "",
};

const albania = {
  name: "Albania",
  topLevelDomain: [".al"],
  alpha2Code: "AL",
  alpha3Code: "ALB",
  callingCodes: ["355"],
  capital: "Tirana",
  altSpellings: ["AL", "Shqipëri", "Shqipëria", "Shqipnia"],
  region: "Europe",
  subregion: "Southern Europe",
  population: 2886026,
  latlng: [41.0, 20.0],
  demonym: "Albanian",
  area: 28748.0,
  gini: 34.5,
  timezones: ["UTC+01:00"],
  borders: ["MNE", "GRC", "MKD", "KOS"],
  nativeName: "Shqipëria",
  numericCode: "008",
  currencies: [{ code: "ALL", name: "Albanian lek", symbol: "L" }],
  languages: [
    { iso639_1: "sq", iso639_2: "sqi", name: "Albanian", nativeName: "Shqip" },
  ],
  translations: {
    de: "Albanien",
    es: "Albania",
    fr: "Albanie",
    ja: "アルバニア",
    it: "Albania",
    br: "Albânia",
    pt: "Albânia",
    nl: "Albanië",
    hr: "Albanija",
    fa: "آلبانی",
  },
  flag: "https://restcountries.eu/data/alb.svg",
  regionalBlocs: [
    {
      acronym: "CEFTA",
      name: "Central European Free Trade Agreement",
      otherAcronyms: [],
      otherNames: [],
    },
  ],
  cioc: "ALB",
};

async function main() {
  const countries = await prisma.country.createMany({
    data: [
      afghan,
      aland,
      albania
    ]
  });

  const pierre = await prisma.user.upsert({
    where: { email: "p.lovergne@hotmail.fr" },
    update: {},
    create: {
      email: `p.lovergne@hotmail.fr`,
      username: "Pierre",
      country: "France",
      city: "Paris",
      zip: "75000",
      travel: {
        createMany: {
          data: [
            {
              destination: "Afghanistan",
              fromCountry: "France",
              departureDate: new Date(),
              done: false,
            },
            {
              destination: "Albania",
              fromCountry: "France",
              departureDate: new Date(),
              done: true,
            }
          ]
        }
      },
      review: {
        create: {
          comment: "C T tro bi1!",
          score: 5,
          countryId: 3
        }
      }
    },
  });

  const pierrot = await prisma.user.upsert({
    where: { email: "pierre.lovergne@gmail.com" },
    update: {},
    create: {
      email: `pierre.lovergne@gmail.com`,
      username: "Pierrot",
      country: "Italy",
      city: "Roma",
      zip: "15463",
      travel: {
        createMany: {
          data: [
            {
              destination: "Åland Islands",
              fromCountry: "Italy",
              departureDate: new Date(),
              done: false,
            },
            {
              destination: "Albania",
              fromCountry: "Italy",
              departureDate: new Date(),
              done: true,
            }
          ]
        }
      },
      review: {
        createMany: {
          data: [
            {
              comment: "Peu de beau paysage",
              score: 2,
              countryId: 2
            },
            {
              comment: "Choqui",
              score: 1,
              countryId: 2
            },
            {
              comment: "trop ienb",
              score: 5,
              countryId: 2
            },
            {
              comment: "Magnifique",
              score: 3,
              countryId: 2
            }
          ]
        }
      }
    },
  });
  console.log({ pierre, pierrot, countries });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
