import { Country, Review, User } from "@prisma/client";
import { getAllUser, deleteAllUser, disconnect, createUser, createReview, createCountry } from "./index";


(async () => {
  const user = {
    username: "Pierre",
    email: "p.lovergne@gmail.fr",
    country: "France",
    zip: "75000",
    city: "Paris",
    role: "ADMIN",
  }

  const country = {
    numericCode: "004",
    name: "Afghanistan",
    topLevelDomain: [
      ".af"
    ],
    callingCodes: [
      "93"
    ],
    altSpellings: [
      "AF",
      "Afganistan"
    ],
    latlng: [
      33,
      65
    ],
    timezones: [
      "utc"
    ],
    borders: [
      "IRN",
      "PAK"
    ],
    currencies: [
      {
        "code": "AFN",
        "name": "AFgan",
        "symbol": "I"
      }
    ],
    languages: [
      {
        "iso639_1": "ps"
      },
      {
        "iso369_1": "uz"
      }
    ],
    translations: {
      "de": "afghanistan"
    },
    regionalBlocks: [
      {
        "acronym": "SAARC"
      }
    ]
  }

  const newUser = await createUser(user as User);
  const newCountry = await createCountry(country)

  const review = {
    comment: "C pa bô",
    score: 1,
    countryId: 1,
    userId: 1
  }
  const newReview = await createReview(review as Review)

  console.log(newReview)

  disconnect();
})()