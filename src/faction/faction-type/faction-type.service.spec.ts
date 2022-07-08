import { Test, TestingModule } from '@nestjs/testing';
import { FactionTypeService } from './faction-type.service';

describe('FactionTypeService', () => {
  let service: FactionTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FactionTypeService],
    }).compile();

    service = module.get<FactionTypeService>(FactionTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
