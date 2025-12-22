import rss from '@astrojs/rss';
import html from 'remark-html';
import sanitizeHtml from 'sanitize-html';
import { remark } from 'remark';
import { getCollection, render } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles');
  return rss({
    title: 'Disjunctions Magazine',
    description: 'A new magazine dedicated to the analysis and critique of contemporary technoscience.',
    site: context.site,
    trailingSlash: false,
    format: "atom",
    stylesheet: "/pretty-feed-v3.xsl",
    items: await Promise.all(
        articles.map(async (article) => {
            const rendered = await remark().use(html).process(article.body);
            return {
                title: article.data.title,
                pubDate: article.data.date,
                description: article.data.abstract,
                link: `/${article.slug}/`,
                content: sanitizeHtml(rendered.value)
                };
            })
        ),
    });
}