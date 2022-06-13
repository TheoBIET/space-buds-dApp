export interface Attributes {
    trait_type: string;
    value: string;
  }
  
  export interface MetadataNFT {
    symbol: string;
    name: string;
    image: string;
    attributes: Attributes[];
    external_url: string;
  }
  
  export interface Collections {
    [key: string]: MetadataNFT[];
  }