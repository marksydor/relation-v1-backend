import { Test, TestingModule } from '@nestjs/testing';
import { RelationTypeService } from './relation-type.service';

describe('RelationTypeService', () => {
  let service: RelationTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationTypeService],
    }).compile();

    service = module.get<RelationTypeService>(RelationTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
