#!/usr/bin/env node
import fs from 'fs/promises';

import minimist from 'minimist';

import { mergeXMLFiles } from '../index';

function argAsArray(v: string | string[] | undefined) {
  if (!v) {
    return [];
  }
  if (Array.isArray(v)) {
    return v;
  }
  return [v];
}

const argv = minimist(process.argv.slice(2), {
  alias: {
    output: 'o',
    singleChildPaths: 's',
  },
});

mergeXMLFiles(argv._, argAsArray(argv.singleChildPaths))
  .then(async (mergedXML) => {
    // Write the merged XML to a new file
    await fs.writeFile(argv.o, mergedXML);
  })
  .catch((error) => {
    console.error(`Error writing merged.xml: ${error}`);
  });
