export interface PostResponse {
  pageNumber: number;
  pageSize:   number;
  totalPages: number;
  items:      Post[];
}

export interface Post {
  id:      string;
  userId:  string;
  content: string;
  images:  Image[];
}

//image-post
export interface Image {
  id:       number;
  postId:   string;
  imageUrl: string;
}

export interface UserHasLikedResponse {
  hasLiked: boolean
}

export interface UserHasSavedResponse {
  hasSaved: boolean
}

export interface Like {
  id:     number;
  postId: string;
  userId: string;
}

export interface Likes {
  pageNumber: number;
  pageSize:   number;
  totalPages: number;
  items:      Like[];
}

export interface SavedPostResponse {
  pageNumber: number;
  pageSize:   number;
  totalPages: number;
  items:      SavedPost[];
}

// export interface Post {
//   id:        string;
//   userId:    string;
//   content:   string;
//   images:    Item[];
//   createdAt: Date;
// }

export interface SavedPost {
  id:        number;
  postId:    string;
  userId:    string;
  post:      Post;
}

