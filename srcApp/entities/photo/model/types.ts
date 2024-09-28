export type Photo = {
  id: number;
  link: string;
  sortId: number;
  createdAt: string;
  updatedAt: string;
  stats: PhotoStats;
};

export type PhotoStats = {
  id: number;
  created?: number;
  viewsCount?: number;
  deleted?: number | null;
  photoId: number;
};

export type CreateSignedUrlResponse = {
  data: {
    signedUrl: string;
    path: string;
    token: string;
  };
  error: null;
};

export type UploadFileResponse = {
  Key: string;
};

export type ImageUploadMod = "add" | "update";

export type ImageModificationMod = "added" | "updated" | "deleted";
