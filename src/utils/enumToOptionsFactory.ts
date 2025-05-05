import { BaseMeta } from '@/types/basicInfo';

export const defineEnumMap = <T extends string, V extends BaseMeta = BaseMeta>(mapDef: Record<T, V>): Record<T, V> =>
  mapDef;

export const createEnumOptions = <EnumString extends string[], V extends BaseMeta = BaseMeta>(
  enumList: EnumString,
  labelMap: Record<EnumString[number], V>,
): Array<{ value: EnumString[number] } & V> =>
  enumList.map((enumValue) => ({
    value: enumValue,
    ...labelMap[enumValue as EnumString[number]],
  }));
