export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type AppMode = 'crisis' | 'practice' | 'learning';
