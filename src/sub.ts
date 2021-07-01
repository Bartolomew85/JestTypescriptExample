// Copyright (c) 2014-present, Facebook, Inc. All rights reserved.

import { sumfunction } from './sum';

const sub = (a: number, b: number): number => sumfunction.sum(a, -b);

export const subfunction = { sub };
