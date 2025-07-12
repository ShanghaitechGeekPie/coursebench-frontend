import { testCommentText, testCommmentStatistic, testUserProfile } from '@/composables/global/usePhantomData';

export const mockService = {
  '/course/all': () => Promise.resolve({ data: { data: testCommentText } }),
  '/course/statistic': () => Promise.resolve({ data: { data: testCommmentStatistic } }),
  '/user/profile': () => Promise.resolve({ data: { data: testUserProfile } }),

};

export const useMockData = import.meta.env.MODE === 'development';