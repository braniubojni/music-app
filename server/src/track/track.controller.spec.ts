import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FileService } from '../file/file.service';
import { DataSource } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Track } from './entities/track.entity';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

describe('TrackController', () => {
  let trackController: TrackController;
  let trackService: TrackService;
  const prefix = '/track';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TrackController],
      providers: [
        TrackService,
        FileService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Comment), useValue: {} },
        { provide: getRepositoryToken(Track), useValue: {} },
      ],
    }).compile();

    trackService = moduleRef.get<TrackService>(TrackService);
    trackController = moduleRef.get<TrackController>(TrackController);
  });

  describe(`(GET) ${prefix}/getAll`, () => {
    it('should return an array of tracks', async () => {
      const result: Track[] = [
        {
          id: '9a955fa9-ba2e-4c64-bd08-ff6e4c5ea981',
          name: 'Track 1',
          artist: 'Artist 1',
          text: 'some text here',
          listens: 0,
          picture: 'image/a5972120-c812-433c-9aff-09d339b4cca8.jpg',
          audio: 'audio/dcffd57e-d2bd-4aea-acab-9938e0a10d84.mp3',
          comments: [],
        },
        {
          id: '812ecb4b-54e7-4e96-aa84-1591ddeb83b7',
          name: 'Track 2',
          artist: 'Artist 2',
          text: 'some text here 2',
          listens: 10,
          picture: 'image/ad09a65a-7764-4d96-884c-8a8ac575e67b.jpg',
          audio: 'audio/2f5f04df-1278-47f2-9e9a-f439e1a88d05.mp3',
          comments: [],
        },
        {
          id: '20c85c0c-9ce1-43a3-8e3a-f0fe05188532',
          name: 'Track 3',
          artist: 'Artist 3',
          text: 'some text here 3',
          listens: 5,
          picture: 'image/6eb131ab-c53d-4241-bee4-4dc056306ff2.jpg',
          audio: 'audio/db0097ee-e05f-4d3d-ae63-d78f43de7489.mp3',
          comments: [],
        },
      ];
      jest.spyOn(trackService, 'getAll').mockImplementation(async () => result);

      expect(await trackController.getAll({ offset: 0, count: 10 })).toBe(
        result,
      );
    });
  });
  // describe('(POST) ' + '/');

  describe(`(GET) ${prefix}/search`, () => {
    const result: Omit<Track, 'comments'>[] = [
      {
        id: '9a955fa9-ba2e-4c64-bd08-ff6e4c5ea981',
        name: 'Track 1',
        artist: 'Artist 1',
        text: 'some text here',
        listens: 0,
        picture: 'image/a5972120-c812-433c-9aff-09d339b4cca8.jpg',
        audio: 'audio/dcffd57e-d2bd-4aea-acab-9938e0a10d84.mp3',
      },
      {
        id: '812ecb4b-54e7-4e96-aa84-1591ddeb83b7',
        name: 'Track 2',
        artist: 'Artist 2',
        text: 'some text here 2',
        listens: 0,
        picture: 'image/ad09a65a-7764-4d96-884c-8a8ac575e67b.jpg',
        audio: 'audio/2f5f04df-1278-47f2-9e9a-f439e1a88d05.mp3',
      },
      {
        id: '20c85c0c-9ce1-43a3-8e3a-f0fe05188532',
        name: 'Track 3',
        artist: 'Artist 3',
        text: 'some text here 3',
        listens: 0,
        picture: 'image/6eb131ab-c53d-4241-bee4-4dc056306ff2.jpg',
        audio: 'audio/db0097ee-e05f-4d3d-ae63-d78f43de7489.mp3',
      },
    ];
    it('search track by provided search param', async () => {
      jest.spyOn(trackService, 'search').mockImplementation(async () => result);

      expect(await trackController.search({ query: 'Tr' })).toBe(result);
    });
  });

  describe(`(GET) ${prefix}:id`, () => {
    it('gets one track by id', async () => {
      const result: Track = {
        id: 'd2957b7d-5b29-43d0-95ab-e3989aa068c3',
        name: 'Brave Heart',
        artist: 'William Volas',
        text: 'La la la',
        listens: 0,
        picture: 'image/30781675-7a4b-4284-a62d-7f696ac04841.jpg',
        audio: 'audio/37fc7204-521e-4895-8735-18c6d2bf40e9.mp3',
        comments: [
          {
            id: 'd053f2ec-ba9d-453a-ba7a-76846b24fe10',
            username: 'Erik',
            text: 'Nice movie, soundtrack is FIRE',
          },
          {
            id: '1ad95faa-b610-4891-9df2-255347a507b8',
            username: '',
            text: '',
          },
        ],
      };
      jest.spyOn(trackService, 'getOne').mockImplementation(async () => result);

      expect(
        await trackService.getOne('d2957b7d-5b29-43d0-95ab-e3989aa068c3'),
      ).toBe(result);
    });
  });
  // describe('(DELETE) ' + ':id');
  // describe('(POST) ' + 'comment');
  // describe('(PUT) ' + 'listen/:id');
});
