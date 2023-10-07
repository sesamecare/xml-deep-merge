import fs from 'fs/promises';

import { Builder, Parser } from 'xml2js';

const xmlParser = new Parser();

type XmlObject = ReturnType<typeof JSON.parse>;

// Function to merge two XML objects deeply
function deepMergeXML(obj1: XmlObject, obj2: XmlObject, singleChildPaths: string[], path: string) {
  for (const key in obj2) {
    const newPath = path ? `${path}.${key}` : key;
    if (obj1[key] && Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
      if (singleChildPaths.includes(newPath)) {
        deepMergeXML(obj1[key], obj2[key], singleChildPaths, newPath);
      } else {
        obj1[key] = obj1[key].concat(obj2[key]);
      }
    } else if (obj1[key] && typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      // If both are objects, recursively merge
      deepMergeXML(obj1[key], obj2[key], singleChildPaths, newPath);
    } else {
      // Otherwise, assign values from obj2 to obj1
      obj1[key] = obj2[key];
    }
  }
}

// Function to read and parse XML file
async function readAndParseXML(file: string) {
  try {
    const data = await fs.readFile(file, 'utf-8');
    return xmlParser.parseStringPromise(data) as XmlObject;
  } catch (err) {
    throw new Error(`Error reading/parsing ${file}: ${err}`);
  }
}

// Function to merge XML files
export async function mergeXMLFiles(xmlFiles: string[], singleChildPaths: string[]) {
  const xmlBuilder = new Builder();
  const mergedResult: XmlObject = {};

  for (const file of xmlFiles) {
    try {
      const result = await readAndParseXML(file);
      // Merge the XML object deeply into the mergedResult
      deepMergeXML(mergedResult, result, singleChildPaths, '');
    } catch (err) {
      console.error(err);
    }
  }

  // Convert the merged object back to XML
  return xmlBuilder.buildObject(mergedResult);
}
