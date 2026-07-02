export interface ProdutoSpec {
  label: string;
  value: string;
}

export interface ProdutoCatalogItem {
  title: string;
  image: string;
  actions: {
    label: string;
    href: string;
    icon: "download" | "view" | "external";
  }[];
}

export interface ProdutoTechnicalSpec {
  tabLabel: string;
  specs: ProdutoSpec[];
}

export interface ProdutoApplication {
  image: string;
  label?: string;
}

export interface ProdutoI18n {
  title: string;
  description: string;
  idealFor: string[];
  applications: { label: string }[];
  technicalSpecs?: ProdutoTechnicalSpec[];
  catalog?: ProdutoCatalogItem[];
  relatedCategoryLabel?: string;
}

export interface ProdutoItem {
  id: string;
  image: string;
  model: string;
  href: string;
  slug: string;
  i18n: Record<string, ProdutoI18n>;
  applications?: ProdutoApplication[];
  relatedCategoryHref?: string;
}
