import { Country, Notification, Picture, PrismaClient, Review, Travel, User } from '@prisma/client'

const prisma = new PrismaClient()


/* ------------ CRUD USER ------------ */
/**
 * Returns all user in DB 
 */
export const getAllUser = async (): Promise<User[]> => {
  return await prisma.user.findMany();
}

/**
 * Returns one User from id
 * @param id number
 * @returns 
 */
export const getOneUser = async (user: User): Promise<User | null> => {
  return await prisma.user.findFirst({
    where: {
      id: user.id
    }
  });
}

/**
 * Creates a user in DB
 * @param user User
 * @returns the newly created user
 */
export const createUser = async (user: User): Promise<User | Error> => {
  return await prisma.user.create({
    data: { ...user },
  }).catch((error) => { throw error })
}

/**
 * Deletes a user
 * @param id 
 */
export const deleteUser = async (user: User): Promise<void | Error> => {
  await prisma.user.delete({
    where: {
      id: user.id
    }
  }).catch((error) => { throw error })
}

/**
 * Deletes All User 
 */
export const deleteAllUser = async (): Promise<void | Error> => {
  await prisma.user.deleteMany().catch((error) => { throw error })
}

/* ------------ CRUD NOTIFICATION ------------ */

export const getAllNotificationPerUser = async (user: User): Promise<Notification[]> => {
  return await prisma.notification.findMany({
    where: {
      userId: user.id
    }
  })
}

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
export const createNotification =
  async (notification: Notification): Promise<Notification | Error> => {
    return await prisma.notification.create({
      data: {
        ...notification
      }
    })
  }

/**
 * Deletes a notification
 * @param id 
 */
export const deleteNotification = async (notification: Notification): Promise<void | Error> => {
  await prisma.notification.delete({
    where: {
      id: notification.id
    }
  }).catch((error) => { throw error })
}

/* ------------ CRUD TRAVEL ------------ */

export const getAllTravel = async (): Promise<User[]> => {
  return await prisma.user.findMany();
}

export const getOneTravel = async (id: number): Promise<User | null> => {
  return await prisma.user.findFirst({
    where: {
      id: id
    }
  });
}

/**
 * Will create a travel for a user
 * @param oneTravel
 * @returns the newly created travel
 */
export const createTravel = async (oneTravel: Travel): Promise<Travel | Error> => {
  return await prisma.travel.create({
    data: {
      ...oneTravel
    }
  })
}

/**
 * Deletes a travel
 * @param id 
 */
export const deleteTravel = async (id: number): Promise<void | Error> => {
  await prisma.travel.delete({
    where: {
      id: id
    }
  }).catch((error) => { throw error })
}

/* ------------ CRUD PICTURE ------------ */

export const getAllPicture = async (country: Country): Promise<Picture[]> => {
  return await prisma.picture.findMany({
    where: {
      countryId: country.id
    }
  });
}

export const getOnePicture = async (id: number): Promise<Picture | null> => {
  return await prisma.picture.findFirst({
    where: {
      id: id
    }
  });
}

/**
 * Will create a picture
 * @param url country
 * @returns the newly created picture
 */
export const createPicture =
  async (url: string, country: Country, user: User): Promise<Picture | Error> => {
    return await prisma.picture.create({
      data: {
        userId: user.id,
        countryId: country.id,
        url: url
      }
    })
  }

/**
 * Deletes a picture
 * @param id 
 */
export const deletePicture = async (picture: Picture): Promise<void | Error> => {
  await prisma.travel.delete({
    where: {
      id: picture.id
    }
  }).catch((error) => { throw error })
}

/* ------------ CRUD REVIEW ------------ */

export const getAllReviewPerCountry = async (country: Country): Promise<Review[]> => {
  return await prisma.review.findMany({
    where: {
      countryId: country.id
    }
  });
}

export const getOneReview = async (id: number): Promise<Review | null> => {
  return await prisma.review.findFirst({
    where: {
      id: id
    }
  });
}

/**
 * Will create a Review
 * @param review
 * @returns the newly created review
 */
export const createReview = async (review: Review): Promise<Review | Error> => {
  return await prisma.review.create({
    data: {
      ...review
    }
  })
}

/**
 * Deletes a review
 * @param id 
 */
export const deleteReview = async (review: Review): Promise<void | Error> => {
  await prisma.travel.delete({
    where: {
      id: review.id
    }
  }).catch((error) => { throw error })
}

/* ------------ CRUD COUNTRY ------------ */

export const getAllCountry = async (): Promise<Country[]> => {
  return await prisma.country.findMany();
}

export const getOneCountry = async (id: number): Promise<Country | null> => {
  return await prisma.country.findFirst({
    where: {
      id: id
    }
  });
}

/**
 * Will create a Country
 * @param country
 * @returns the newly created country
 */
export const createCountry = async (country: any): Promise<Country | Error> => {
  return await prisma.country.create({
    data: {
      ...country
    }
  })
}

/**
 * Deletes a country
 * @param id 
 */
export const deleteCountry = async (country: Country): Promise<void | Error> => {
  await prisma.travel.delete({
    where: {
      id: country.id
    }
  }).catch((error) => { throw error })
}

/* ------------ MISCELEANOUS ------------ */
export async function disconnect() {
  await prisma.$disconnect();
}