# xml-deep-merge

[![Node CI](https://github.com/sesamecare/xml-deep-merge/actions/workflows/pull_requests.yml/badge.svg)](https://github.com/sesamecare/xml-deep-merge/actions/workflows/pull_requests.yml)

Deeply merge multiple XML files into one file. Originally used to merge a GCP repo configuration into a generated pom.xml for OpenAPI Java projects.

## Usage

```bash
npx @sesamecare-oss/xml-deep-merge file1.xml file2.xml file3.xml -o merged.xml
```

In Maven, certain elements must only occur once. You can accomplish this via the `-s` argument (or `-singleChildPath`).

```bash
npx @sesamecare-oss/xml-deep-merge pom.xml deps.xml -o merged.xml -s project.dependencies -s project.build
```

This will combine the multiple instances of project.dependencies and project.build into a single node in the output.
