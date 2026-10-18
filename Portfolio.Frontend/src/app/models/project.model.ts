export interface ProjectDto {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  thumbnailUrl: string;
  technologies: string[];
  githubLink: string;
  liveDemoLink: string;
  isFeatured: boolean;
  displayOrder: number;
}

export interface ContactMessageDto {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
}
