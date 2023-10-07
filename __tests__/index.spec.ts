import { describe, expect, test } from 'vitest';

import { mergeXMLFiles } from '../src/index';

describe('Simple merge', () => {
  test('should generate expected result', async () => {
    const merged = await mergeXMLFiles(['./__tests__/pom.xml', './__tests__/gcp.xml']);
    expect(merged).toMatchFileSnapshot('./__snapshots__/merged.xml');
  });
});
