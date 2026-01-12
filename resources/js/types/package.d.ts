export interface HistoryType {
    id: number;
    step: string;
    mode: string;
    created_at: string;
}

export interface PackageType {
    id: number;
    code: string;
    width: number;
    height: number;
    depth: number;
    weight: number;
    formatted_address: string;
    status: string;
    step: string;
    histories: HistoryType[];
    unit_title: string;
    created_at: string;
    updated_at: string;
}