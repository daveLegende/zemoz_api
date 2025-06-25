import { CategoryName } from "src/bet/domain";
export declare class DocBetOutputDto {
    id: string;
    category: CategoryName;
    odds: Record<string, any>;
    match: string;
}
