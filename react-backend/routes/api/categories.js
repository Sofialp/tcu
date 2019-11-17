const { getCategoriesOfAccount } = require('./venues');

const getCategories = async (request, response, connection) => {
  const categories = await getCategoriesOfAccount(connection);
  response.json({ categories: categories });
};

const saveModifyCategory = async (request, response, connection) => {
  const { category } = request.body;
  await updateCategory(category, connection);
  response.json({ status: 'ok' });
};

const deleteCategory = async (request, response, connection) => {
  const { categoryId } = request.query;
  await deleteOneCategory(categoryId, connection);
  response.json({ status: 'ok' });
};

const updateCategory = async (category, connection) => {
  const savedCategory = await new Promise(async function(resolve, reject) {
    connection.query(
      `UPDATE booking.category SET name = '${category.name}', description = '${category.description}' WHERE id = '${category.id}'`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return savedCategory;
};

const addCategory = async (request, response, connection) => {
  const { category } = request.body;
  await saveCategory(category, connection);
  response.json({ status: 'ok' });
};

const saveCategory = async (category, connection) => {
  const savedCategory = await new Promise(async function(resolve, reject) {
    connection.query(
      `INSERT INTO booking.category (name, description, deleted) VALUES ('${category.name}', '${category.description}', '0')`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return savedCategory;
};

const deleteOneCategory = async (categoryId, connection) => {
  const deletedCategory = await new Promise(async function(resolve, reject) {
    connection.query(
      `UPDATE booking.category SET deleted = 1 WHERE id = '${categoryId}'`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return deletedCategory;
};

module.exports = {
  getCategories,
  saveModifyCategory,
  addCategory,
  deleteCategory
};
