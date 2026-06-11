import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../data');

/**
 * Ensure data directory exists
 */
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Failed to create data directory:', error);
  }
}

/**
 * Read JSON file from data directory
 * @param {string} filename - Filename (e.g., 'users.json')
 * @returns {Promise<any>} - Parsed JSON data
 */
export async function readJSON(filename) {
  try {
    await ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, return empty array
      return [];
    }
    throw error;
  }
}

/**
 * Write JSON file to data directory
 * @param {string} filename - Filename (e.g., 'users.json')
 * @param {any} data - Data to write
 * @returns {Promise<void>}
 */
export async function writeJSON(filename, data) {
  try {
    await ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Failed to write to ${filename}:`, error);
    throw error;
  }
}

/**
 * Append a record to a JSON file (for arrays)
 * @param {string} filename - Filename
 * @param {any} record - Record to append
 * @returns {Promise<any>} - The appended record with ID
 */
export async function appendJSON(filename, record) {
  const data = await readJSON(filename);
  const id = Date.now().toString();
  const newRecord = { id, ...record, createdAt: new Date().toISOString() };
  data.push(newRecord);
  await writeJSON(filename, data);
  return newRecord;
}

/**
 * Find a record by ID
 * @param {string} filename - Filename
 * @param {string} id - Record ID
 * @returns {Promise<any|null>} - The found record or null
 */
export async function findById(filename, id) {
  const data = await readJSON(filename);
  if (!Array.isArray(data)) return null;
  return data.find(record => record.id === id) || null;
}

/**
 * Update a record by ID
 * @param {string} filename - Filename
 * @param {string} id - Record ID
 * @param {any} updates - Fields to update
 * @returns {Promise<any|null>} - The updated record or null if not found
 */
export async function updateById(filename, id, updates) {
  const data = await readJSON(filename);
  if (!Array.isArray(data)) return null;
  
  const index = data.findIndex(record => record.id === id);
  if (index === -1) return null;
  
  data[index] = { ...data[index], ...updates, updatedAt: new Date().toISOString() };
  await writeJSON(filename, data);
  return data[index];
}

/**
 * Delete a record by ID
 * @param {string} filename - Filename
 * @param {string} id - Record ID
 * @returns {Promise<boolean>} - True if deleted, false if not found
 */
export async function deleteById(filename, id) {
  const data = await readJSON(filename);
  if (!Array.isArray(data)) return false;
  
  const index = data.findIndex(record => record.id === id);
  if (index === -1) return false;
  
  data.splice(index, 1);
  await writeJSON(filename, data);
  return true;
}

/**
 * Get all records from a file
 * @param {string} filename - Filename
 * @returns {Promise<any[]>} - Array of records
 */
export async function getAll(filename) {
  return readJSON(filename);
}
