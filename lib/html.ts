export function injectHeadingIds(html: string): string {
  let idx = 0;
  return html.replace(/<(h[23])([^>]*)>/g, (match, tag, attrs) => {
    if (/id=/.test(attrs)) return match;
    return `<${tag}${attrs} id="heading-${idx++}">`;
  });
}
