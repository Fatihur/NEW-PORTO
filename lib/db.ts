import { Pool } from '@neondatabase/serverless';

// WARNING: In a real production app, never expose your connection string with password in the frontend code.
const connectionString = "postgresql://neondb_owner:npg_5LqOAac8NZlB@ep-hidden-shadow-adyjhdg7-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require";

export const pool = new Pool({ connectionString });

export const initDB = async () => {
  const client = await pool.connect();
  try {
    // Projects Table
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

    // Experience Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS experience (
        id SERIAL PRIMARY KEY,
        role TEXT NOT NULL,
        company TEXT NOT NULL,
        period TEXT NOT NULL,
        description TEXT NOT NULL,
        skills TEXT[],
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Messages Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Migration Logic for Projects (Keep existing logic)
    const columnsToAdd = [
      { name: 'role', type: 'TEXT' },
      { name: 'challenge', type: 'TEXT' },
      { name: 'key_features', type: 'TEXT' }
    ];

    for (const col of columnsToAdd) {
      try {
        await client.query(`ALTER TABLE projects ADD COLUMN IF NOT EXISTS ${col.name} ${col.type}`);
      } catch (e) {
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

// --- PROJECTS ---
export const fetchProjects = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM projects ORDER BY id DESC');
    return result.rows.map(row => ({
      ...row,
      longDescription: row.long_description,
      techStack: row.tech_stack,
      keyFeatures: row.key_features
    }));
  } catch (err: any) {
    if (err.code === '42P01') {
      await initDB();
      return [];
    }
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

// --- EXPERIENCE ---
export const fetchExperience = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM experience ORDER BY id DESC');
    return result.rows;
  } catch (err: any) {
    if (err.code === '42P01') return []; // Table doesn't exist yet
    return [];
  } finally {
    client.release();
  }
};

export const createExperience = async (exp: any) => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO experience (role, company, period, description, skills)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [exp.role, exp.company, exp.period, exp.description, exp.skills];
    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const updateExperience = async (id: number, exp: any) => {
  const client = await pool.connect();
  try {
    const query = `
      UPDATE experience
      SET role = $1, company = $2, period = $3, description = $4, skills = $5
      WHERE id = $6
      RETURNING *
    `;
    const values = [exp.role, exp.company, exp.period, exp.description, exp.skills, id];
    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const deleteExperience = async (id: number) => {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM experience WHERE id = $1', [id]);
    return true;
  } finally {
    client.release();
  }
};

// --- MESSAGES ---
export const sendMessage = async (msg: any) => {
  const client = await pool.connect();
  try {
    const query = `INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *`;
    const result = await client.query(query, [msg.name, msg.email, msg.message]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const fetchMessages = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM messages ORDER BY created_at DESC');
    return result.rows;
  } catch (err: any) {
    if (err.code === '42P01') return [];
    return [];
  } finally {
    client.release();
  }
};
