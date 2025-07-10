export interface Order {
  orderNumber: string;
  storeReference: string | null;
  storeReference2: string | null;
  total: string;
  pcPn: string;
  pcQty: number;
  date: string;
  dealer: string;
  pdf: string | null;
  status: string;
}
