const pool = require('../config/db');

async function findCategory(name) {
  const [rows] = await pool.execute(
    'SELECT id FROM kategoriak WHERE kategoria = ?',
    [name]
  );
  return rows[0];
}

async function getOneTypeCategory(id) {
  const [rows] = await pool.execute(
    'SELECT id,kategoria FROM kategoriak WHERE kategoriak.fo_kategoriaId=? ORDER BY id',
    [id]
  );
  return rows;
}


async function getCategories() {
  const [rows] = await pool.execute(
    'SELECT id,kategoria FROM kategoriak ORDER BY id'
  );
  return rows;
}

async function getMainCategories() {
  const [rows] = await pool.execute(
    'SELECT * FROM foKategoriak ORDER BY id'
  );
  return rows;
}

async function deleteMainCategory(id) {
  const [rows] = await pool.execute(
    'DELETE FROM foKategoriak WHERE foKategoriak.id = ?',
    [id]
  );
  return rows.affectedRows;
}

async function deleteCategory(id) {
  const [rows] = await pool.execute(
    'DELETE FROM kategoriak WHERE kategoriak.id = ?',
    [id]
  );
  return rows.affectedRows;
}


async function updateMainCategory(data) {
  const {id,fo_kategoria} = data;
  const [rows] = await pool.execute(
    'UPDATE foKategoriak SET fo_kategoria = ? WHERE foKategoriak.id = ?',
    [fo_kategoria,id]
  );
  return rows.affectedRows;
}

async function updateCategory(data) {
  const {id,kategoria} = data;
  const [rows] = await pool.execute(
    'UPDATE kategoriak SET kategoria = ? WHERE kategoriak.id = ?',
    [kategoria,id]
  );
  return rows.affectedRows;
}


async function createCategory(data) {
  const {fo_kategoriaId,kategoria} = data;
  const [rows] = await pool.execute(
    'INSERT INTO kategoriak (fo_kategoriaId,kategoria) VALUES (?, ?)',
    [fo_kategoriaId,kategoria]
  );
  return rows.affectedRows;
}


async function createMainCategory(data) {
  const {fo_kategoria} = data;
  const [rows] = await pool.execute(
    'INSERT INTO foKategoriak (fo_kategoria) VALUES (?)',
    [fo_kategoria]
  );
  return rows.affectedRows;
}

module.exports = {findCategory,getOneTypeCategory,getMainCategories,getCategories,deleteCategory,deleteMainCategory,updateCategory,updateMainCategory,createCategory,createMainCategory};
