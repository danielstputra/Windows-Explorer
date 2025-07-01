export interface File {
  id: number;
  folder_id: number;
  name: string;
  size: number;
  mime_type: string;
  created_at: Date;
  updated_at: Date;
}
