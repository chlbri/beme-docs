import * as v from 'valibot';

const valid = v.pipe(
  v.string(),
  v.transform(data => data.length),
);

console.log(v.safeParse(valid, 'hello')); // 5
console.log(v.safeParse(valid, 78)); // 5
