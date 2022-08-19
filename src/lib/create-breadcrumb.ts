export interface Breadcrumb {
  value: string;
  breadcrumb: string;
}

export function createBreadcrumb(
  [head, ...tail]: string[],
  acc: Breadcrumb[] = [],
  breadcrumb?: string
): Breadcrumb[] {
  const updatedBreadcrumb = `${breadcrumb ? `${breadcrumb}/` : ""}${head}`;
  const entry = { value: head, breadcrumb: updatedBreadcrumb };
  if (tail.length < 1) {
    return [...acc, entry];
  }
  return createBreadcrumb(tail, [...acc, entry], updatedBreadcrumb);
}
