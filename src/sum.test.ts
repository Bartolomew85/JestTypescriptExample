// Copyright (c) 2014-present, Facebook, Inc. All rights reserved.

import { sumfunction } from './sum';
import { TestSource } from "jasmine-data-provider-ts";

it('adds 1 + 2 to equal 3 in TScript', () => {
  expect(sumfunction.sum(1, 2)).toBe(3);
});

describe("parameterised test using a function as source", function() {
  function provider() {
    return [
      { a: 2, b: 3, expected: 5 },
      { a: 14, b: 15, expected: 29 },
    ];
  }
  
  TestSource<any>(provider, function(data) {
    it("should return value using operator +", function() {
      const result = sumfunction.sum(data.a, data.b);
      expect(result).toEqual(data.expected);
    });
  });
});