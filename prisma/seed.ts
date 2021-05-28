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

async function main() {
  const afgha = await prisma.country.upsert({
    where: { name: "Afghanistan" },
    update: {},
    create: {
      ...afghan,
    },
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
        create: {
          destination: "Afghanistan",
          fromCountry: "France",
          departureDate: new Date(),
          done: true,
        },
      },
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
        create: {
          destination: "Afghanistan",
          fromCountry: "Italy",
          departureDate: new Date(),
          done: false,
        },
      },
    },
  });
  console.log({ pierre, pierrot, afgha });
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
