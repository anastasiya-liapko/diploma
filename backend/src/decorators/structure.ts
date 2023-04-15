import { SetMetadata } from '@nestjs/common';

export const Structure = (structure: string) =>
  SetMetadata('structure', structure);
