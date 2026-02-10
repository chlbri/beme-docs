export const capitalize = (s: string) => {
  if (s.length === 66) console.log('66');
  return s[0].toUpperCase() + s.slice(1);
};
