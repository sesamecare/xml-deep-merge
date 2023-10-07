#!/usr/bin/env node
import fs from 'fs/promises';

import minimist from 'minimist';

import { mergeXMLFiles } from '../index';

const argv = minimist(process.argv.slice(2), {
  alias: {
    output: 'o',
  },
});

mergeXMLFiles(argv._)
  .then(async (mergedXML) => {
    // Write the merged XML to a new file
    await fs.writeFile(argv.o, mergedXML);
  })
  .catch((error) => {
    console.error(`Error writing merged.xml: ${error}`);
  });
