export interface BreadcrumbEntry {
  value: string;
  breadcrumb: string;
}

export function createBreadcrumb(
  [head, ...tail]: string[],
  acc: BreadcrumbEntry[] = [],
  breadcrumb?: string
): BreadcrumbEntry[] {
  const updatedBreadcrumb = `${breadcrumb ? `${breadcrumb}/` : ""}${head}`;
  const entry = { value: head, breadcrumb: updatedBreadcrumb };
  if (!head) {
    return [];
  }
  if (tail.length < 1) {
    return [...acc, entry];
  }
  return createBreadcrumb(tail, [...acc, entry], updatedBreadcrumb);
}
