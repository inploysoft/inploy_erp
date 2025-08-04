export type Nullable<T> = T | null;

export type OmitId<T> = Omit<T, 'id'>;

export type CustomField = string | number | boolean | object | null;

export type InployModule = 'memberManagement' | 'workforce' | 'scheduler';
