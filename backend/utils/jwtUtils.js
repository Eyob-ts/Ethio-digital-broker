// import jwt from "jsonwebtoken";

// export const jwtToken = (userId) => {
//   const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
 
//   return token;
// };

import jwt from "jsonwebtoken";

export const jwtToken = (userId, role) => {
  const token = jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
 