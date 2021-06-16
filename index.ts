import {
  Country,
  Notification,
  Picture,
  PrismaClient,
  Review,
  Travel,
  User,
} from "@prisma/client";

const prisma = new PrismaClient();

/* ------------ CRUD USER ------------ */
/**
 * Returns all user in DB
 */
export const getAllUser = async (): Promise<User[]> => {
  return await prisma.user.findMany({
    include: {
      notifications: true,
    },
  });
};

/**
 * Returns one User from id
 * @param id number
 * @returns
 */
export const getOneUser = async (email: string): Promise<User | null> => {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
    include: {
      notifications: true,
    },
  });
};

/**
 * Creates a user in DB
 * @param user User
 * @returns the newly created user
 */
export const createUser = async (user: User): Promise<User | Error> => {
  return await prisma.user.create({
    data: { ...user },
    include: {
      notifications: true,
    },
  });
};

/**
 * Updates a user in DB
 * @param user User
 * @returns the newly created user
 */
export const updateUser = async (user: User): Promise<User> => {
  return await prisma.user.update({
    where: {
      id: +user.id,
    },
    data: {
      country: user.country,
      city: user.city,
      zip: user.zip,
    },
    include: {
      notifications: true,
    },
  });
};

/**
 * Deletes a user
 * @param email
 */
export const deleteUser = async (email: string): Promise<void | Error> => {
  await prisma.user.delete({
    where: {
      email: email,
    },
  });
};

/**
 * Deletes All User
 */
export const deleteAllUser = async (): Promise<void | Error> => {
  await prisma.user.deleteMany();
};

/* ------------ CRUD NOTIFICATION ------------ */

export const getAllNotificationPerUser = async (
  user: User
): Promise<Notification[]> => {
  return await prisma.notification.findMany({
    where: {
      userId: user.id,
    },
  });
};

// export const getOneNotification = async (id: number): Promise<User | null> => {
//   return await prisma.user.findFirst({
//     where: {
//       id: id
//     }
//   });
// }

/**
 * Will create a notification for a user
 * @param notification
 * @returns the newly created travel
 */
export const createNotification = async (
  notification: Notification
): Promise<Notification | Error> => {
  return await prisma.notification.create({
    data: {
      ...notification,
    },
  });
};

/**
 * Deletes a notification
 * @param id
 */
export const deleteNotification = async (
  travelId: number
): Promise<void | Error> => {
  await prisma.notification
    .delete({
      where: {
        travelId: travelId,
      },
    })
    .catch((error) => {
      throw error;
    });
};

/* ------------ CRUD TRAVEL ------------ */

export const getAllTravel = async (): Promise<Travel[]> => {
  return await prisma.travel.findMany();
};

export const getAllTravelUser = async (email: string): Promise<Travel[]> => {
  return await prisma.travel.findMany({
    where: {
      user: {
        email: email,
      },
    },
  });
};

export const getOneTravel = async (id: number): Promise<Travel | null> => {
  return await prisma.travel.findFirst({
    where: {
      id: id,
    },
  });
};

/**
 * Will create a travel for a user
 * @param oneTravel
 * @returns the newly created travel
 */
export const createTravel = async (oneTravel: any): Promise<Travel | Error> => {
  return await prisma.travel.create({
    data: {
      ...oneTravel,
    },
  });
};

export const updateTravelDone = async (id: number): Promise<Travel> => {
  return await prisma.travel.update({
    where: {
      id: id,
    },
    data: {
      done: true,
    },
  });
};

/**
 * Deletes a travel
 * @param id
 */
export const deleteTravel = async (id: number): Promise<void | Error> => {
  await prisma.travel.delete({
    where: {
      id: id,
    },
  });
};

/* ------------ CRUD PICTURE ------------ */

export const getAllPicture = async (country: Country): Promise<Picture[]> => {
  return await prisma.picture.findMany({
    where: {
      countryId: country.id,
    },
  });
};

export const getOnePicture = async (id: number): Promise<Picture | null> => {
  return await prisma.picture.findFirst({
    where: {
      id: id,
    },
  });
};

/**
 * Will create a picture
 * @param url country
 * @returns the created entry
 */
export const createPicture = async (
  url: string,
  country: Country,
  user: User,
  description: string
): Promise<Picture | Error> => {
  return await prisma.picture.create({
    data: {
      userId: user.id,
      countryId: country.id,
      url: url,
      description: description,
    },
  });
};

/**
 * Deletes a picture
 * @param id
 */
export const deletePicture = async (
  picture: Picture
): Promise<void | Error> => {
  await prisma.travel
    .delete({
      where: {
        id: picture.id,
      },
    })
    .catch((error) => {
      throw error;
    });
};

/* ------------ CRUD REVIEW ------------ */

/**
 * Gets all reviews for a country
 * may be not revelant as we will get the country with
 * all reviews, pictures etc...
 * @param country
 * @returns
 */
export const getAllReviewPerCountry = async (
  country: Country
): Promise<Review[]> => {
  return await prisma.review.findMany({
    where: {
      countryName: country.name,
    },
  });
};

export const getOneReview = async (id: number): Promise<Review | null> => {
  return await prisma.review.findFirst({
    where: {
      id: id,
    },
  });
};

/**
 * Will create a Review
 * @param review
 * @returns the newly created review
 */
export const createReview = async (review: Review): Promise<Review> => {
  return await prisma.review.create({
    data: {
      ...review,
    },
  });
};

/**
 * Deletes a review
 * @param id
 */
export const deleteReview = async (review: Review): Promise<void | Error> => {
  await prisma.travel
    .delete({
      where: {
        id: review.id,
      },
    })
    .catch((error) => {
      throw error;
    });
};

/* ------------ CRUD COUNTRY ------------ */

export const getAllCountry = async (): Promise<Country[]> => {
  return await prisma.country.findMany();
};

export const getOneCountry = async (
  numericCode: string
): Promise<Country | null> => {
  return await prisma.country.findFirst({
    where: {
      numericCode: numericCode,
    },
    include: {
      review: {
        include: {
          user: true,
        },
      },
      picture: true,
    },
  });
};

export const getOneCountryPerName = async (
  name: string
): Promise<Country | null> => {
  return await prisma.country.findFirst({
    where: {
      name: name,
    },
    include: {
      review: {
        include: {
          user: true,
        },
      },
      picture: true,
    },
  });
};

/**
 * Will create a Country
 * @param country
 * @returns the newly created country
 */
export const createCountry = async (
  country: any
): Promise<Country | undefined> => {
  // TODO: we have to check if already exist in the DB and return if so
  if (country.numericCode)
    return await prisma.country.upsert({
      where: {
        numericCode: country.numericCode,
      },
      update: {},
      create: {
        ...country,
      },
    });
};

/**
 * Deletes a country
 * @param id
 */
export const deleteCountry = async (
  country: Country
): Promise<void | Error> => {
  await prisma.travel
    .delete({
      where: {
        id: country.id,
      },
    })
    .catch((error) => {
      throw error;
    });
};

/* ------------ MISCELEANOUS ------------ */
export async function disconnect() {
  await prisma.$disconnect();
}
