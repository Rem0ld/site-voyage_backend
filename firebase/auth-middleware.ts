import admin from "./index";

function authMiddleware(
  request: { headers: { authorization: any } },
  response: {
    send: (arg0: { message: string }) => {
      (): any;
      new(): any;
      status: { (arg0: number): void; new(): any };
    };
  },
  next: () => any
) {
  const headerToken: string = request.headers.authorization;
  if (!headerToken) {
    return response.send({ message: "No token provided" }).status(401);
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    response.send({ message: "Invalid token" }).status(401);
  }

  const token = headerToken.split(" ")[1];
  admin
    .auth()
    .verifyIdToken(token)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .then(() => next())
    .catch(() => response.send({ message: "Could not authorize" }).status(403));
}

module.exports = authMiddleware;
