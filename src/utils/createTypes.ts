import { generateNamespace } from "@gql2ts/from-schema";
import * as fs from "fs";
import * as path from "path";
import { genSchema } from "./genSchema";

const typescriptTypes = generateNamespace("GQL", genSchema());

// generateNamespace outputs a file with "declare module" which doesn't work for ts
// So we replace "declare" with "export" to be able to load the file in other files
// Works with @gql2ts/from-schema: 1.8.2

const writeFile = (file: any) => {
  const fixedFile = file.replace(/declare/g, "export");

  fs.writeFile(path.join(__dirname, "../types/schema.d.ts"), fixedFile, err => {
    console.error(err);
  });

  console.log("Successfully exported types!");
};

writeFile(typescriptTypes);
