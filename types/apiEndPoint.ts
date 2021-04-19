export type ApiEndPoint<TResource = any, TResult = any> = {
  getById: (id: string) => Promise<TResource>;
  deleteById: (id: string) => Promise<TResult>;
};
