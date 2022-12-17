import { Controller, Get } from '@nestjs/common';

@Controller('track')
export class TrackController {
  create() {}

  @Get('get-all')
  getAll() {
    return 'Worked';
  }

  getOne() {}

  delete() {}
}
