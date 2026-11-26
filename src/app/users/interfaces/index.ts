export interface UserResponse {
  id:             string;
  username:       string;
  email:          string;
  name:           string;
  profilePhotoId: number;
  profilePhoto:   ProfilePhoto;
}

export interface ProfilePhoto {
  id:       number;
  imageUrl: string;
  userId:   string;
}

//content, files
export interface PostData {
  content: string;
}

export interface Follow {
  id: string
  followById: string
  followedId: string
}

export interface FollowResponse {
  pageNumber: number;
  pageSize:   number;
  totalPages: number;
  items:      Follow[];
}
