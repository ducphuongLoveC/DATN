export interface NoteProp {
  _id: string;
  resource_id: string;
  user_id: string;
  title: string;
  content: string;
  markAt: number;
}

export interface Notes {
  notes: NoteProp[];
}
