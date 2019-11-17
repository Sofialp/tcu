const passwordHash = require('password-hash');

const getUserByCredentials = async (request, response, connection) => {
  const { password, email } = request.body;
  if (password && email) {
    const result = await getUserByEmail(email, connection);
    if (result.error) {
      response.send({
        error: 'Correo electrónico o contraseña inválida',
        isValid: false
      });
    }
    const isValid = passwordHash.verify(password, result.password);
    if (isValid && result.role === 1) {
      const user = getUserStructure(result);
      response.json({ isValid, user });
    } else {
      response.send({
        error: 'Correo electrónico o contraseña inválida',
        isValid: false
      });
    }
  }
};

const getUserByEmail = async (email, connection) => {
  const user = await new Promise(async function(resolve, reject) {
    connection.query(
      `SELECT * FROM booking.user WHERE email='${email}'`,
      function(error, data) {
        if (error || data.length === 0) {
          resolve({
            error: 'Correo electrónico o contraseña inválida',
            isValid: false
          });
        } else {
          const user = data[0];
          resolve(JSON.parse(JSON.stringify(user)));
        }
      }
    );
  });
  return user;
};

const getUserStructure = user => {
  return {
    email: user.email,
    id: user.id,
    identification: user.identification,
    name: `${user.name} ${user.lastName}`
  };
};

module.exports = {
  getUserByCredentials
};
