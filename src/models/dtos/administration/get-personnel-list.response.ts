import { PersonnelDto } from "./personnel.dto";

export interface GetPersonnelListResponseDto {
    foundPersonnel: Array<PersonnelDto>;
}