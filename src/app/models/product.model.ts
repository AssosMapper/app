export interface Product {
  id?: number;
  nom: string;
  description?: string;
  prix_ht: number;
  prix_ttc: number;
  quantite: number;
  image?: string;
  actif?: boolean;
  category_id?: number;

}
