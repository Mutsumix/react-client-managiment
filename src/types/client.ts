export type Client = {
  id: number;
  company_name: string;
  importance: 1 | 2 | 3; // 1=★, 2=★★, 3=★★★
  contact_person: string;
  notes: string;
  created_at: string;
  updated_at: string;
};

export type ClientInput = Omit<Client, "id" | "created_at" | "updated_at">;
