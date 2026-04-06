export type Book = {
    id: number;
    title: string;
    slug: string;
    description: string;
    authors: string[];
    coverURL: string;
    featuredSeriesName: string;
    featuredSeriesPos:number;
    featuredSeriesSlug: string;
    featuredSeriesId: number;
    genres: string[];
    isbn: string[];
    seriesNames: string[];
    contentWarnings: string[];
    shelf: string;
}