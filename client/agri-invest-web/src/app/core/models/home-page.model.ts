import { ProjectSummary } from './project.model';
import { SuccessStorySummary } from './success-story.model';
import { PageContent } from './page-content.model';

export interface HomePage {
  heroContent: PageContent[];
  featuredProjects: ProjectSummary[];
  featuredStories: SuccessStorySummary[];
}
