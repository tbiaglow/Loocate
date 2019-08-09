module.exports = {
  "development": {
    "username": "root",
    "password": process.env.PASSWORD,
    "database": "loocate_db",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.PASSWORD,
    "database": "database_test",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.PASSWORD,
    "database": process.env.JAWSDB_URL,
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  }
};
