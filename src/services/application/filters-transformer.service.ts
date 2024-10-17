import removePrefix from 'src/utils/remove-prefix';

export type TransformedFilters<BaseEntity> = {
  simpleFilters: EntityExactKeys<BaseEntity>;
  notFilters: EntityExactKeys<BaseEntity>;
  afterFilters: EntityExactKeys<BaseEntity>;
  beforeFilters: EntityExactKeys<BaseEntity>;
  likeFilters: EntityKeysWithForcedType<BaseEntity, string>;
  additionalFilters: any;
};

export class FiltersTransformer {
  static async transformDecoratedFilters<BaseEntity>(
    filters: any,
    entityKeys: string[],
  ): Promise<TransformedFilters<BaseEntity>> {
    const afterFilters: any = {};
    const beforeFilters: any = {};
    const likeFilters = {};
    const notFilters: any = {};
    const simpleFilters: any = {};
    const additionalFilters: any = {};

    const separateByPrefix = (
      key: string,
      recipient: any,
      prefix: string,
    ): boolean => {
      const [hasPrefix, statement] = removePrefix(key, prefix);

      if (!hasPrefix || !statement) return false;

      if (entityKeys.includes(statement)) {
        recipient[statement] = filters[key];
      } else {
        additionalFilters[key] = filters[key];
      }

      return true;
    };

    Object.keys(filters).forEach((key) => {
      if (separateByPrefix(key, likeFilters, 'like_')) return;
      if (separateByPrefix(key, notFilters, 'not_')) return;
      if (separateByPrefix(key, afterFilters, 'after_')) return;
      if (separateByPrefix(key, beforeFilters, 'before_')) return;

      if (entityKeys.includes(key)) {
        simpleFilters[key] = filters[key];
      } else {
        additionalFilters[key] = filters[key];
      }
    });

    return {
      likeFilters,
      afterFilters,
      beforeFilters,
      notFilters,
      simpleFilters,
      additionalFilters,
    };
  }
}
