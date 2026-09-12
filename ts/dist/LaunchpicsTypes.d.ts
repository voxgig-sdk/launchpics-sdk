export interface AiProcessing {
    imageId: string;
    instruction: string;
    processedImageId?: string;
    success?: boolean;
    url?: string;
}
export interface AiProcessingCreateData {
    imageId: string;
    instruction: string;
    processedImageId?: string;
    success?: boolean;
    url?: string;
}
export interface Health {
    status?: string;
    timestamp?: string;
}
export interface HealthLoadMatch {
    status?: string;
    timestamp?: string;
}
export interface Image {
    id?: string;
    success?: boolean;
    url?: string;
}
export interface ImageLoadMatch {
    id: string;
    format?: string;
    height?: number;
    width?: number;
}
export interface ImageCreateData {
    id?: string;
    success?: boolean;
    url?: string;
}
export interface ImageRemoveMatch {
    id: string;
}
