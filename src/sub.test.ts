// Copyright (c) 2014-present, Facebook, Inc. All rights reserved.

import { subfunction } from './sub';

it('subtracts 5 - 1 to equal 4 in TypeScript', () => {
  expect(subfunction.sub(5, 1)).toBe(4);
});
