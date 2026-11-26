export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  profilePhotoId: string | null;
  profilePhoto: ImageProfile | null
}

export interface RegisterData {
  name: string
  userName: string
  email: string
  password: string
  confirmPassword: string
}

export interface  LoginData {
  email: string
  password: string
}

interface ImageProfile {
  id: number
  imageUrl: string
  userId: string
}

