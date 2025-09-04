import { _ArticleBluePrint, ArticleType } from "./definitions";

const commonDate = new Date("2024-08-22T00:00:00-12:00");
const commonSummary = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
			Aliquam in metus sed dolor.Lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Est alias nam saepe officia tenetur omnis provident aliquam eos molestias exercitationem asperiores consequuntur, ducimus repellendus nostrum voluptate tempora iure. 
			Voluptates, in.`;

const commonContent =
	'{"time":1742013942872,"blocks":[{"id":"qKTIb6-7-5","type":"paragraph","data":{"text":"Lorem ipsum odor amet, consectetuer adipiscing elit. Euismod venenatis turpis tellus libero pulvinar congue. Congue libero egestas ligula, metus consectetur dictum ornare. Malesuada rutrum magna nullam ut parturient cras. Scelerisque elementum duis fusce taciti tempor dictum porttitor. Odio dui efficitur ullamcorper proin torquent aliquet."}},{"id":"EQVhj77UlF","type":"paragraph","data":{"text":"Blandit porta parturient phasellus magnis sem dapibus. Donec nam tempor iaculis urna vulputate a aptent. Adipiscing etiam ac rhoncus est vel gravida parturient id. Inceptos at cursus nunc vulputate feugiat malesuada aliquam. Aenean pulvinar netus mauris auctor felis feugiat, molestie feugiat interdum. Proin aenean arcu fames justo dapibus laoreet id. Tellus tincidunt etiam ut placerat sodales mollis nascetur. Mauris molestie placerat penatibus lorem non."}},{"id":"qIYrZ1kcur","type":"paragraph","data":{"text":"Praesent convallis faucibus conubia praesent montes nascetur mus. Congue suscipit sociosqu viverra lacinia nisl neque tincidunt orci neque. Vivamus montes litora aenean aliquet consequat blandit massa natoque. Nunc pulvinar netus; vulputate ornare tempus blandit dui? Tortor rutrum litora facilisi tempor purus convallis commodo malesuada. Netus dictum luctus sapien, fames euismod blandit egestas orci. Nascetur vitae ut maecenas cubilia, quam mi eros nunc. Magna quisque porta ligula sem vehicula. Elementum etiam taciti magnis dui a ultrices vivamus."}},{"id":"7YVBQvdjcG","type":"paragraph","data":{"text":"Curae hendrerit dolor porttitor dui praesent iaculis. Maximus iaculis integer; dictum sodales semper metus lectus. Vulputate natoque dolor molestie magna eget tincidunt vel. Vehicula velit aptent magnis netus luctus aenean. Accumsan proin erat dictum varius dis, erat litora integer. Class nec cursus at sollicitudin dapibus pellentesque. Eget quisque mattis habitant dictum sit montes rutrum. Leo facilisi mattis per penatibus quisque ad etiam dictum. Nostra vivamus euismod luctus ipsum tincidunt ultricies quis cubilia duis."}},{"id":"MexwYKUvj7","type":"paragraph","data":{"text":"Finibus tristique nostra pulvinar nostra porttitor. Etiam tortor mauris lacus, ac et metus. Viverra vehicula sapien parturient blandit, urna suscipit ridiculus proin. Praesent aenean hendrerit nisi phasellus vivamus. Placerat platea phasellus eu risus dignissim auctor arcu. Elit platea senectus adipiscing non per."}}],"version":"2.31.0-rc.7"}';

const articles: _ArticleBluePrint[] = [
	{
		// main article
		coverImage: "/assets/estratonicos-bg-news.png",
		title: "El proceso detrás de “Título de Canción”",
		author: "Estratónico",
		summary: commonSummary,
		content: commonContent,
		createdAt: new Date(commonDate.getTime() - 60 * 60 * 1000),
		updatedAt: new Date(commonDate.getTime() - 60 * 60 * 1000),
		deletedAt: null,
		type: ArticleType.Main,
	},
	{
		// secondary article
		coverImage: "/assets/estratonico-card-news-9.png",
		title: "Estratónico lanza su nuevo video",
		author: "Estratónico",
		summary: commonSummary + "\n" + commonSummary + "\n" + commonSummary,
		content: commonContent,
		createdAt: new Date(commonDate.getTime() + 30 * 60 * 1000),
		updatedAt: new Date(commonDate.getTime() + 30 * 60 * 1000),
		deletedAt: null,
		type: ArticleType.Secondary,
	},
	{
		// home
		coverImage: "/assets/estratonico-card-news-13.png",
		title: "Título de Artículo",
		author: "Estratónico",
		summary: commonSummary,
		content: commonContent,
		createdAt: commonDate,
		updatedAt: commonDate,
		deletedAt: null,
	},
	{
		// home
		coverImage: "/assets/estratonico-card-news-14.png",
		title: "Título de Artículo",
		author: "Estratónico",
		summary: commonSummary,
		content: commonContent,
		createdAt: commonDate,
		updatedAt: commonDate,
		deletedAt: null,
	},
];

// Push 12 articles for the news section
for (let i = 1; i <= 12; i++) {
	articles.push({
		coverImage: `/assets/estratonico-card-news-${i}.png`,
		title: "Título de Artículo",
		author: "Estratónico",
		summary: commonSummary,
		content: commonContent,
		createdAt: commonDate,
		updatedAt: commonDate,
		deletedAt: null,
	});
}

// Push latest article created with admin tool
articles.push({
	title: "Título de Artículo",
	coverImage:
		"https://z2pxzs1xdaiebjy2.public.blob.vercel-storage.com/articles/estratonico-article-new-maJouNhNt7X34xB4s9ckgndp0QgOcW.png",
	summary:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in metus sed dolor viverra commodo. Nam pellentesque porta lacus, et sollicitudin felis efficitur at.",
	content:
		'{"time":1741866468317,"blocks":[{"id":"R_VVoMbV4S","type":"paragraph","data":{"text":"Suspendisse ac nisi purus. Nullam quis venenatis ante. Nullam faucibus euismod quam in dapibus. Nunc id sagittis elit. Praesent finibus sed tortor facilisis tristique. Praesent nisi libero, efficitur ac felis eget, blandit interdum leo.&nbsp;"}},{"id":"GfwkfKrVx0","type":"paragraph","data":{"text":"Suspendisse facilisis neque at elit hendrerit placerat. Maecenas aliquam vestibulum nunc, a interdum ligula tempus eu. Sed fringilla mi metus, vitae porttitor urna tempus ac. Sed blandit lectus vitae mi sagittis sagittis. Praesent mollis ante ac ipsum vehicula, vitae hendrerit elit placerat. Nam a vehicula metus."}},{"id":"3zRya9qdVu","type":"paragraph","data":{"text":"Morbi egestas dignissim turpis quis consequat. Suspendisse potenti. Vivamus sed purus euismod, rhoncus risus bibendum, gravida nisi. Donec dapibus nisi sollicitudin mi venenatis, quis elementum neque commodo.&nbsp;"}},{"id":"zooJq0lsPW","type":"image","data":{"caption":"","withBorder":false,"withBackground":false,"stretched":false,"file":{"url":"https://z2pxzs1xdaiebjy2.public.blob.vercel-storage.com/articles/estratonico-article-new-content-lXtuTpjPvFvkdXxzVcUtQgJBtvvN6G.png"}}},{"id":"B9utbNSlNU","type":"paragraph","data":{"text":"Aliquam facilisis justo in tempor sagittis. Mauris massa velit, egestas imperdiet massa sed, tincidunt imperdiet nibh. Integer molestie odio augue, eget accumsan nibh sodales sed. Fusce sit amet lectus mauris."}},{"id":"hyh43cuEoK","type":"paragraph","data":{"text":"Duis rutrum, arcu id ornare dignissim, ante ante consequat mauris, eget aliquet justo tortor a ante. Fusce vel risus in quam varius elementum. Fusce et est leo. Vestibulum non pretium dui, at imperdiet lacus. Donec dui odio, accumsan ac cursus nec, mattis et mauris. Nam tortor nisl, tempor eu dignissim eu, mollis at odio."}},{"id":"4cafXIfJoJ","type":"paragraph","data":{"text":"Etiam nec mi nec est vulputate sodales non id dolor. Fusce molestie egestas cursus. Sed facilisis et tellus nec blandit. Aenean ut commodo nunc. Sed nec ligula porta, feugiat turpis fermentum, pharetra dolor.&nbsp;"}},{"id":"XKXLKKO1rB","type":"paragraph","data":{"text":"Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer ultrices ligula ut iaculis luctus. Sed tortor nunc, lobortis sed elementum imperdiet, congue a ipsum. Nullam ac facilisis odio, ut tempor nibh. Integer eget metus vel sapien congue iaculis."}}],"version":"2.31.0-rc.7"}',
	author: "Estratónico",
	createdAt: new Date(commonDate.getTime() + 15 * 60 * 1000),
	updatedAt: new Date(commonDate.getTime() + 15 * 60 * 1000),
	deletedAt: null,
});

export default articles;
