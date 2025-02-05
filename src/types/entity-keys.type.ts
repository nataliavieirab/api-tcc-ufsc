type EntityExactKeys<BaseEntity> = {
  [key in keyof BaseEntity]: BaseEntity[key];
};

type EntitySearchKeys<BaseEntity> =
  | {
      [key in keyof BaseEntity]?:
        | (BaseEntity[key] | undefined)[]
        | BaseEntity[key]
        | BaseEntity[key][]
        | ({ id: string } | undefined)
        | ({ id: string }[] | undefined)
        | ({ id: string } | undefined)[]
        | ({ id: string }[] | undefined)[]
        | ({ generic_entity: boolean } | undefined)
        | ({ generic_entity: boolean } | undefined)[];
    }
  | Record<string, never>
  | EntityKeysWithSulfix<BaseEntity, 'Id'>;

type EntityKeysWithPrefix<BaseEntity, Prefix extends string> = {
  [key in
    | keyof BaseEntity
    | `${Prefix}${string & keyof BaseEntity}`]?: key extends keyof BaseEntity
    ? BaseEntity[key]
    : number | Date | string | { id: string } | { id: string }[];
};

type EntityKeysWithSulfix<BaseEntity, Sulfix extends string> = {
  [key in
    | keyof BaseEntity
    | `${string & keyof BaseEntity}${Sulfix}`]?: key extends keyof BaseEntity
    ? BaseEntity[key]
    : number | string | { id: string } | { id: string }[];
};

type EntityKeysWithForcedType<BaseEntity, ForcedFieldsType> =
  | {
      [key in keyof BaseEntity]?: BaseEntity[key] extends ForcedFieldsType
        ? BaseEntity[key]
        : never;
    }
  | Record<string, never>;
