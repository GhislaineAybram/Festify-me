import client from './db'

const saltRounds = 10
export interface User {
  id: number
  firstname: string
  lastname: string
  email: string
  password: string
  added_datetime: string
}

export interface Celebration {
  id: number
  name: string
  description: string
  location: string
  date: string
  hour: string
  author: string
}

export const getUsers = async () => {
  const result = await client.query(`
      SELECT * 
      FROM postgres.public.user
      `)
  return result.rows
}

export const getUserById = async (id: number): Promise<User> => {
  const result = await client.query(`
      SELECT * 
      FROM public.user 
      WHERE id = $1
      `, [id])
  return result.rows[0]
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const result = await client.query(`
    SELECT * 
    FROM public.user 
    WHERE email = $1
    `, [email])
  if (result.rows.length === 0) {
    return null // Retourner null si aucun utilisateur n'est trouvé
  }
  return result.rows[0] as User
}

const formatName = (name: string) => {
  if (!name) return ''
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}

export const createUser = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
): Promise<User> => {
  // hashing password
  const bcrypt = require('bcrypt');
  const hashedPassword: string = await bcrypt.hash(password, saltRounds);

  // firtsname formatting
  const formattedFirstname = formatName(lastname);

  // lastname formatting
  const formattedLastname = firstname.toUpperCase();

  const result = await client.query(`
    INSERT INTO public.user (firstname, lastname, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
  [formattedFirstname, formattedLastname, email, hashedPassword],
  )
  return result.rows[0] // Retourne l'utilisateur nouvellement créé
}

export const getCelebrations = async () => {
  const result = await client.query(`
    SELECT * 
    FROM postgres.public.event
    `)
  return result.rows
}

export const getCelebrationById = async (id: number): Promise<Celebration> => {
  const result = await client.query(`
    SELECT * 
    FROM public.event
    WHERE id = $1
    `, [id])
  return result.rows[0]
}
