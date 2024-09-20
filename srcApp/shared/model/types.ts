export type UpdateResult = {
  raw: any;
  affected?: number;
  generatedMaps: ObjectLiteral[];
};

interface ObjectLiteral {
  [key: string]: any;
}

export type ErrorData = {
  message?: string;
  statusCode?: number;
  [key: string]: any;
};
