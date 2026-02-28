export interface SuccessStory {
  id: number;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  slug: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  testimonialAr: string;
  testimonialEn: string;
  testimonialAuthor: string;
  roiAchieved: number;
  areaTransformed: number;
  featuredImageUrl: string;
  publishDate: string;
  isFeatured: boolean;
  projectId: number;
}

export interface SuccessStorySummary {
  id: number;
  titleAr: string;
  titleEn: string;
  slug: string;
  testimonialAr: string;
  testimonialEn: string;
  roiAchieved: number;
  areaTransformed: number;
  featuredImageUrl: string;
  publishDate: string;
}
