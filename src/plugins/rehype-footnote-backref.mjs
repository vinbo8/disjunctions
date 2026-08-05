import { visit } from 'unist-util-visit';

export default function rehypeFootnoteBackrefOnNumber() {
  return (tree) => {
    visit(tree, 'element', (section) => {
      if (section.tagName !== 'section' || section.properties?.dataFootnotes === undefined) return;

      visit(section, 'element', (li) => {
        if (li.tagName !== 'li' || !li.properties?.id?.includes('fn-')) return;

        let backref = null;

        visit(li, 'element', (node, index, parent) => {
          if (node.tagName === 'a' && node.properties?.dataFootnoteBackref !== undefined) {
            backref = node;
            parent.children.splice(index, 1);
            return [visit.SKIP, index];
          }
        });

        if (!backref) return;

        const num = li.properties.id.split('fn-').pop();
        backref.children = [{ type: 'text', value: num + '.'}];
        backref.properties.className = ['footnote-num-backref'];

        // find the first <p> inside the li and prepend the backref there
        const firstParagraph = li.children.find((child) => child.tagName === 'p');

        if (firstParagraph) {
  // Insert the backref at the beginning.
          firstParagraph.children.unshift(backref, { type: 'text', value: ' ' });

          // Wrap everything after the <a> in a <span>.
          firstParagraph.children = [
            firstParagraph.children[0], // <a>
            {
              type: 'element',
              tagName: 'span',
              properties: {
                className: ['footnote-text'],
              },
              children: firstParagraph.children.slice(1),
            },
          ];
        } else {
          // fallback: no <p> wrapper
          li.children.unshift(backref, { type: 'text', value: ' ' });

          li.children = [
            li.children[0], // <a>
            {
              type: 'element',
              tagName: 'span',
              properties: {
                className: ['footnote-text'],
              },
              children: li.children.slice(1),
            },
          ];
        }
        
        li.properties.style = 'list-style: none;';
      });
    });
  };
}