import { Doc } from "yjs";

export function parse(json: any, doc: Doc) {
  if (Array.isArray(json)) {
    const yArray = doc.getArray("json");
    return yArray;
  } else if (isObject(json)) {
    const yJson = doc.getMap("json");
    return yJson;
  } else if (typeof json === "string") {
    doc.getText("text");
  }
  return null;
}

function isObject(value: any) {
  return value !== null && typeof value === "object";
}
