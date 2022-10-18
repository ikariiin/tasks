import { FunctionComponent, lazy } from "react";

export enum ModuleType {
  Component = "component",
  Service = "service",
  Feature = "feature",
}

export function importModule<T = FunctionComponent>(
  type: ModuleType,
  name: string,
) {
  return import(`../../${type}s/${name}`).then((module) => {
    const nameSplit = name.split("/");
    const componentName = nameSplit[nameSplit.length - 1];
    const key = componentName.charAt(0).toUpperCase() + componentName.slice(1);

    return {
      default: module[key] as T,
    };
  });
}

export function lazyImportModule(type: ModuleType, name: string) {
  return lazy(() => importModule(type, name));
}
