import { articles, ArticleType, AlbumStatus, Album, Genre, Platform, Song } from "@prisma/client";

export type Article = articles;

export type _ArticleBluePrint = {
	id?: string;
	title: string;
	coverImage: string;
	summary: string;
	content: string;
	author: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
	type?: ArticleType;
};

export type User = {
	id: string;
	username: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
};

export type AlbumWithRelations = Album & {
    genre: Genre;
    platforms: Platform[];
    songs: Song[];
};

export type GenreType = Genre;
export type PlatformType = Platform;
export type SongType = Song;

export { ArticleType, AlbumStatus };
