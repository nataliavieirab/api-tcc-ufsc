export default function removePrefix(
  str: string,
  prefix: string,
): [boolean, string | null] {
  const splited = String(str).split(prefix);

  if (splited.length == 2 && splited[0] == '') return [true, splited[1]];
  return [false, null];
}
