import rss from '@astrojs/rss';
import html from 'remark-html';
import sanitizeHtml from 'sanitize-html';
import { remark } from 'remark';
import { getCollection, render } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles');
  return rss({
    title: 'Buzz’s Blog',
    description: 'A humble Astronaut’s guide to the stars',
    site: context.site,
    items: await Promise.all(
        articles.map(async (article) => {
            const rendered = await remark().use(html).process(article.body);
            console.log(rendered)
            return {
                title: article.data.title,
                pubDate: article.data.date,
                description: article.data.abstract,
                link: `/blog/${article.slug}/`,
                content: sanitizeHtml(rendered.value)
                };
            })
        ),
    });
}