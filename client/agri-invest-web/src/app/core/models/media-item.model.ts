export enum MediaType {
  News = 0,
  PressRelease = 1,
  Photo = 2,
  Video = 3
}

export interface MediaItem {
  id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  type: MediaType;
  typeName: string;
  url: string;
  thumbnailUrl: string;
  externalLink: string;
  publishDate: string;
  isFeatured: boolean;
  tags: string;
}
