export class Unauth {
  refreshToken: string | null;

  constructor(dto: string | null) {
    this.refreshToken = dto;
  }
}