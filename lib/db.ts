import { Pool } from '@neondatabase/serverless';

// WARNING: In a real production app, never expose your connection string with password in the frontend code.
// This should be handled by a backend API or Edge Function.
// We are using it here for the specific requirement of a client-side CMS panel.
const connectionString = "postgresql://neondb_owner:npg_5LqOAac8NZlB@ep-hidden-shadow-adyjhdg7-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require";

export const pool = new Pool({ connectionString });

export interface DBProject {
  id: number;
  title: string;
  category: string;
  description: string;
  long_description: string;
  image: string;
  gallery: string[];
  year: string;
  link: string;
  tech_stack: string[];
  client: string;
  role: string;
  challenge: string;
  key_features: string;
}

export const initDB = async () => {
  const client = await pool.connect();
  try {
    // Create table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        long_description TEXT,
        image TEXT,
        gallery TEXT[],
        year TEXT,
        link TEXT,
        tech_stack TEXT[],
        client TEXT,
        role TEXT,
        challenge TEXT,
        key_features TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Migration Logic: Add columns if they don't exist (for existing tables)
    const columnsToAdd = [
      { name: 'role', type: 'TEXT' },
      { name: 'challenge', type: 'TEXT' },
      { name: 'key_features', type: 'TEXT' }
    ];

    for (const col of columnsToAdd) {
      try {
        await client.query(`ALTER TABLE projects ADD COLUMN IF NOT EXISTS ${col.name} ${col.type}`);
      } catch (e) {
        // Column likely exists or error irrelevant
        console.log(`Column ${col.name} check finished.`);
      }
    }

    console.log("Tables and schema initialized successfully");
    return true;
  } catch (err) {
    console.error("Error initializing DB:", err);
    return false;
  } finally {
    client.release();
  }
};

export const fetchProjects = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM projects ORDER BY id DESC');
    return result.rows.map(row => ({
      ...row,
      longDescription: row.long_description,
      techStack: row.tech_stack,
      keyFeatures: row.key_features // Map snake_case to camelCase
    }));
  } catch (err: any) {
    // Error code 42P01 is "undefined_table"
    if (err.code === '42P01') {
      console.warn("Table 'projects' does not exist. Auto-initializing database schema...");
      // Attempt to initialize the DB automatically
      await initDB();
      // Return empty array so the app falls back to static data smoothly
      return [];
    }
    console.error("Error fetching projects:", err);
    return [];
  } finally {
    client.release();
  }
};

export const createProject = async (project: any) => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO projects (title, category, description, long_description, image, gallery, year, link, tech_stack, client, role, challenge, key_features)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `;
    const values = [
      project.title,
      project.category,
      project.description,
      project.longDescription,
      project.image,
      project.gallery,
      project.year,
      project.link,
      project.techStack,
      project.client,
      project.role,
      project.challenge,
      project.keyFeatures
    ];
    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const updateProject = async (id: number, project: any) => {
  const client = await pool.connect();
  try {
    const query = `
      UPDATE projects 
      SET title = $1, category = $2, description = $3, long_description = $4, image = $5, gallery = $6, year = $7, link = $8, tech_stack = $9, client = $10, role = $11, challenge = $12, key_features = $13
      WHERE id = $14
      RETURNING *
    `;
    const values = [
      project.title,
      project.category,
      project.description,
      project.longDescription,
      project.image,
      project.gallery,
      project.year,
      project.link,
      project.techStack,
      project.client,
      project.role,
      project.challenge,
      project.keyFeatures,
      id
    ];
    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const deleteProject = async (id: number) => {
    const client = await pool.connect();
    try {
        await client.query('DELETE FROM projects WHERE id = $1', [id]);
        return true;
    } finally {
        client.release();
    }
}