export interface UseMovieSeriesReturn {
    mS: MovieSeriesGrouped;
    nextToWatch: MovieSeriesItem | null;
    loadingInitial: boolean;
    loading: boolean;
    msDetails: MovieSeriesDetails | null;
    collections: Collection[];
    counts: Counts | null;
    aboutUs: AboutUsType | null;
    hasMore: boolean;
    handleGetMS: (append?: boolean, skipOverride?: number) => Promise<void>;
    handleGetDetailsMS: (id: string) => Promise<void>;
    handleCollectionsMS: () => Promise<void>;
    handleAboutUs: () => Promise<void>;
};

export interface MovieSeriesItem {
    msName: string;
    msAbout?: string;
    msPoster: string;
    msGenre?: string[];
    msSeason: string;
    msReleaseDate?: string;
    msRating?: number;
    msWatched?: boolean;
    hashedId: string;
};

export interface Section {
    label: string;
    movies: MovieSeriesItem[];
};

export interface MovieSeriesGrouped {
    [label: string]: MovieSeriesItem[];
};

export interface GetMovieSeriesResponse {
    data: Section[];
    hasMore: boolean;
    counts: Counts;
    message: string;
};

export interface MovieCardListProps {
    mS: MovieSeriesGrouped;
    loadingInitial: boolean;
    loading: boolean;
    loadMore: (append?: boolean) => Promise<void>;
    hasMore: boolean;
};

export interface MovieCardProps {
    msE: MovieSeriesItem;
};

export interface MovieCardFooterProps {
    msE: MovieSeriesItem;
};

export interface GenreBadgeProps {
    genres?: string[];
};

export interface Counts {
    total: number;
    industry: {
        hollywood: number;
        bollywood: number;
        others: number;
    };
    format: {
        movie?: number;
        series?: number;
    };
    watched: {
        watched: number;
        unwatched: number;
    };
};

export interface MovieSeriesDetails {
    msName: string;
    msAbout?: string;
    msPoster: string;
    msLink?: string;
    msGenre?: string[];
    msFormat?: string;
    msIndustry?: string;
    msSeason?: string;
    msReleaseDate?: string;
    msRating?: number;
    msWatched?: boolean;
};

export interface MovieSeriesDetailsResponse {
    data: MovieSeriesDetails,
    message: string;
};

export interface Collection {
    name: string;
    icon: string;
};

export interface CollectionsResponse {
    data: Collection[];
};

export interface Filters {
    w?: string;
    s?: string;
    f?: string;
    i?: string;
    g?: string;
    c?: string;
};

export interface NextWatchs {
    nextToWatch: MovieSeriesItem | null;
};

interface Project {
    type: string;
    description: string;
    features: string[];
    github: string;
};

export interface AboutUsType {
    tagline: string;
    name: string;
    description: string;
    projects: Record<string, Project>;
    techStack: Record<string, string[]>;
    roles: Record<string, string>;
    dataHandling?: Record<string, string>;
    contact: Record<string, string>;
};

export interface AboutUsTypeResponse {
    data: AboutUsType,
    message: string;
};

export interface ContactFormData {
    name: string;
    email: string;
    mobile: string;
    message: string;
};

export interface ApiResponse {
    status: number;
    data: {
        message: string;
    };
};