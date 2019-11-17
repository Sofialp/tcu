const getAccountDetails = async (request, response, connection) => {
  const accountId = 1;
  if (accountId) {
    const account = await new Promise(async function(resolve, reject) {
      connection.query(
        `SELECT * FROM booking.account WHERE booking.account.id=${accountId}`,
        function(error, data) {
          if (error) {
            console.log(error);
            reject(error);
          }
          resolve(JSON.parse(JSON.stringify(data)));
        }
      );
    });
    response.json({
      terms: account[0].terms,
      name: account[0].name,
      id: account[0].id
    });
  } else {
    reject('No id provided');
  }
};

const saveModifyAccount = async (request, response, connection) => {
  const { account } = request.body;
  await updateAccount(account, connection);
  response.json({ status: 'ok' });
};

const updateAccount = async (account, connection) => {
  const savedAccount = await new Promise(async function(resolve, reject) {
    connection.query(
      `UPDATE booking.account SET name = '${account.name}', terms = '${account.terms}' WHERE id = '${account.id}'`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return savedAccount;
};

module.exports = {
  getAccountDetails,
  saveModifyAccount
};
