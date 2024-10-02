export function convertPathToTitle(path: string): string {
  const segments = path.split("/").filter((segment) => segment !== "");

  const titleSegments = segments.map((segment) => {
    return segment
      .split("-") 
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  });

  return titleSegments.join(" / ");
}
