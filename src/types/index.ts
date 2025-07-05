export interface SpreadsheetRow {
  id: number;
  jobRequest?: string;
  submitted?: string;
  status?: string;
  submitter?: string;
  url?: string;
  assigned?: string;
  priority?: string;
  dueDate?: string;
  estValue?: string;
  [key: string]: any;
}
