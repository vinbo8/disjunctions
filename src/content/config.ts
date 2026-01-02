import { z, reference, defineCollection } from 'astro:content';

const articleCollection = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({
		title: z.string(),
		genre: z.string().optional(),
		authors: z.array(reference('authors')),
		abstract: z.string(),
		date: z.date(),
		image: image(),
		caption: z.string().optional(),
		issue: z.number().optional(),
		block: z.number().optional(),
		draft: z.boolean(),
	})
})

const groupCollection = defineCollection({
	type: 'content',
	schema: z.object({
		name: z.string(),
		location: z.string(),
	})
})

const issueCollection = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({
		title: z.string(),
		draft: z.boolean(),
		image: image(),
		date: z.date(),
		colour: z.string(),
		mode: z.string(),
	})
})

const authorCollection = defineCollection({
	type: 'content',
	schema: z.object({
		name: z.string(),
	})
})

export const collections = {
	// set this to 'articles' to apply it to the articles/ subfolder
	'authors': authorCollection,
	'articles': articleCollection,
	'issues': issueCollection,
	'groups': groupCollection,
}

/*
export function single(post: MarkdownInstance): Post {
	const slug = post.file.split('/').reverse()[0].replace('.md', '');
	return {
		...post.frontmatter,
		Content: post.Content,
		slug: slug,
		draft: post.file.split('/').reverse()[1] === 'drafts',
		timestamp: (new Date(post.frontmatter.date)).valueOf()
	}
}

export function published(posts: MarkdownInstance[]): Post[] {
	return posts
		.filter(post => post.frontmatter.title )
		.map(post => single(post))
		.filter(post => MODE === 'development' || !post.draft)
		.sort((a, b) => b.timestamp - a.timestamp)
}

export function getRSS(posts: MarkdownInstance[]) {
	return {
		title: 'Simple Blog RSS',
		description: 'Simple Blog RSS Feed',
		stylesheet: true,
		customData: `<language>en-us</language>`,
		items: published(posts).map((post: Post) => ({
			title: post.title,
			description: post.preview,
			link: post.slug,
			pubDate: post.date,
		})),
	}
}

*/