export interface UseMovieSeriesReturn {
    mS: MovieSeriesGrouped;
    nextToWatch: MovieSeriesItem | null;
    loadingInitial: boolean;
    loading: boolean;
    msDetails: MovieSeriesDetails | null;
    collections: Collection[];
    counts: Counts | null;
    aboutUs: AboutUsType | null;
    contactUs: ContactUsType[];
    hasMore: boolean;
    handleGetMS: (append?: boolean, skipOverride?: number) => Promise<void>;
    handleGetDetailsMS: (id: string) => Promise<void>;
    handleCollectionsMS: () => Promise<void>;
    handleAboutUs: () => Promise<void>;
    handleContactUs: () => Promise<void>;
};

export interface MovieSeriesItem {
    msName: string;
    msAbout?: string;
    msPoster: string;
    msGenre?: string[];
    msReleaseDate?: string;
    msRating?: number;
    msWatched?: boolean;
    hashedId: string;
    sStatus: string;
    sTSeasons: number;
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

export interface CastBadgeProps {
    casts?: string[];
};

export interface GenreBadgeProps {
    genres?: string[];
};

export interface Counts {
    total: number;
    format: Record<string, number>;
    industry: Record<string, number>;
    watched: Record<string, number>;
    genre: Record<string, number>;
    collection: Record<string, number>;
    ott: Record<string, number>;
};

export interface MovieSeriesDetails {
    msName: string;
    msAbout?: string;
    msPoster: string;
    msLink?: string;
    msCast?: string[];
    msGenre?: string[];
    msFormat?: string;
    msIndustry?: string;
    msReleaseDate?: string;
    msRating?: number;
    msWatched?: boolean;
    msOTT?: string;
    sStatus?: string;
    sTSeasons?: number;
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
    f?: string;
    i?: string;
    w?: string;
    s?: string;
    g?: string;
    c?: string;
    o?: string;
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
    message: string;
};

export interface ApiResponse {
    status: number;
    data: {
        message: string;
    };
};

export interface ContactUsType {
    _id: string;
    name: string;
    message: string;
    createdAt: Date;
    status: string;
    updatedAt: Date;
};

export interface ContactUsTypeResponse {
    data: ContactUsType[],
    message: string;
};