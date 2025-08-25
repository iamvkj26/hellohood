export interface UseMovieSeriesReturn {
    mS: MovieSeriesGrouped;
    nextToWatch: MovieSeriesItem | null;
    loadingInitial: boolean;
    loading: boolean;
    msDetails: MovieSeriesDetails | null;
    collections: Collection[];
    aboutUs: AboutUsType | null;
    hasMore: boolean;
    handleGetMS: (append?: boolean, skipOverride?: number) => Promise<void>;
    handleGetDetailsMS: (id: string) => Promise<void>;
    handleCollectionsMS: () => Promise<void>;
    handleAboutUs: () => Promise<void>;
};

export interface MovieSeriesItem {
    hashedId: string;
    msPoster: string;
    msName: string;
    msSeason: string;
    msAbout?: string;
    msRating?: number;
    msGenre?: string[];
    msReleaseDate?: string;
    msWatched?: boolean;
    msLink?: string;
    msFormat?: string;
    msIndustry?: string;
    msUploadedBy?: string;
    msWatchedAt?: string | null;
};

export interface MovieSeriesGrouped {
    [year: string]: MovieSeriesItem[];
};

export interface MovieSeriesGroupedResponse {
    data: MovieSeriesGrouped,
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

export interface MovieSeriesDetails extends MovieSeriesItem {
    msLink: string;
    msFormat: string;
    msIndustry: string;
    msUploadedBy: string;
    msWatchedAt?: string | null;
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