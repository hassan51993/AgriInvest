export enum ProjectType {
  Crops = 0,
  Livestock = 1,
  LandReclamation = 2,
  OrganicFarming = 3,
  Mixed = 4
}

export enum ProjectStatus {
  Planned = 0,
  Active = 1,
  Harvesting = 2,
  Completed = 3
}

export interface Project {
  id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  slug: string;
  type: ProjectType;
  typeName: string;
  status: ProjectStatus;
  statusName: string;
  areaInHectares: number;
  locationLatitude: number;
  locationLongitude: number;
  locationAddressAr: string;
  locationAddressEn: string;
  targetInvestmentAmount: number;
  targetInvestmentCurrency: string;
  currentInvestmentAmount: number;
  currentInvestmentCurrency: string;
  expectedROI: number;
  durationStartDate: string;
  durationEndDate: string;
  featuredImageUrl: string;
  sortOrder: number;
  images: ProjectImage[];
}

export interface ProjectSummary {
  id: number;
  titleAr: string;
  titleEn: string;
  slug: string;
  type: ProjectType;
  typeName: string;
  status: ProjectStatus;
  statusName: string;
  areaInHectares: number;
  locationAddressAr: string;
  locationAddressEn: string;
  targetInvestmentAmount: number;
  currentInvestmentAmount: number;
  expectedROI: number;
  featuredImageUrl: string;
}

export interface ProjectImage {
  id: number;
  imageUrl: string;
  caption: string;
  sortOrder: number;
}
