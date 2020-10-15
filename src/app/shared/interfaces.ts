export interface User {
  email: string,
  password: string,
  returnSecureToken?: boolean
}

export interface Location {
  src: string
  codeName: string
  regionName: string
}

export interface NewItem {
  name: string
  mainImg: string
  thumbnail: string
  description: string
  date?: Date,
  id?: string
}

export interface fBAuthResponse {
  idToken: string
  expiresIn: string
  refreshToken: string
}

