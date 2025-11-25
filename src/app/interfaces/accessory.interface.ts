export interface AccessoryResponse {
  success: boolean;
  related: AccessoryCategory[];
}

export interface AccessoryCategory {
  name: string;
  icon: string | null;
  varname: string;
  subcategories: AccessorySubcategory[];
}

export interface AccessorySubcategory {
  name: string;
  icon: string;
  varname: string;
  brands: AccessoryBrand[];
  isVisible: boolean;
}

export interface AccessoryBrand {
  code: string;
  name: string;
  logo: string;
  svgLabel: string;
  products: AccessoryProduct[];
}

export interface AccessoryProduct {
  pn: string;
  name: string;
  description: string;
  mainImage: string;
  isVisible: boolean;
}
