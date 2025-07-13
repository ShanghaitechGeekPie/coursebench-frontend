import { 
  testCommentText, 
  testCommmentStatistic, 
  testUserProfile,
  testCourseData,
  testTeacherData,
  testTeacherDetailData,
  testCourseDetailData,
  testUserData,
  testUserStatistic,
  testActiveData,
  testRewardRankData
} from '@/composables/global/usePhantomData';
import { USE_MOCK_DATA} from '@/config/environment';


// Mock 服务映射
export const mockService = {
  // 评论相关
  '/comment/recent': () => Promise.resolve({ data: { data: testCommentText } }),
  '/comment/user/(.+)': (url) => {
    const userId = parseInt(url.match(/\/comment\/user\/(\d+)/)?.[1]);
    const userComments = testCommentText.filter(comment => 
      comment.user_id === userId || comment.user?.id === userId
    );
    return Promise.resolve({ data: { data: userComments } });
  },
  '/comment/course/(.+)': (url) => {
    const courseId = parseInt(url.match(/\/comment\/course\/(\d+)/)?.[1]);
    const courseDetailData = testCourseDetailData[courseId];
    // 确保返回的评论数据包含所有必要字段
    const comments = courseDetailData?.comments || [];
    const enrichedComments = comments.map(comment => ({
      ...comment,
      like: comment.like || 0,
      dislike: comment.dislike || 0,
      like_status: comment.like_status || 0,
      reply_count: comment.reply_count || 0,
      replies: comment.replies || []
    }));
    return Promise.resolve({ data: { data: enrichedComments } });
  },
  
  // 课程相关
  '/course/all': () => Promise.resolve({ data: { data: testCourseData } }),
  '/course/statistic': () => Promise.resolve({ data: { data: testCommmentStatistic } }),
  '/course/(.+)': (url) => {
    const courseId = parseInt(url.match(/\/course\/(\d+)/)?.[1]);
    const courseDetailData = testCourseDetailData[courseId];
    if (courseDetailData) {
      // 确保课程数据包含groups信息
      const courseData = {
        ...courseDetailData.course,
        groups: courseDetailData.groups || []
      };
      return Promise.resolve({ data: { data: courseData } });
    }
    return Promise.resolve({ data: { data: null } });
  },
  
  // 教师相关
  '/teacher/all': () => Promise.resolve({ data: { data: testTeacherData } }),
  '/teacher/(.+)': (url) => {
    const teacherId = parseInt(url.match(/\/teacher\/(\d+)/)?.[1]);
    const teacherDetail = testTeacherDetailData[teacherId];
    return Promise.resolve({ data: { data: teacherDetail?.teacher || null } });
  },
  
  // 用户相关
  '/user/profile/(.+)': (url) => {
    const userId = parseInt(url.match(/\/user\/profile\/(\d+)/)?.[1]);
    const user = testUserData.find(u => u.id === userId) || testUserProfile;
    return Promise.resolve({ data: { data: user } });
  },
  '/user/login': () => Promise.resolve({ data: { data: testUserProfile } }),
  '/user/register': () => Promise.resolve({ data: { data: { message: '注册成功' } } }),
  '/user/register_active': () => Promise.resolve({ data: { data: testActiveData } }),
  '/user/reset_password': () => Promise.resolve({ data: { data: { message: '重置邮件已发送' } } }),
  '/user/reset_password_active': () => Promise.resolve({ data: { data: { message: '密码重置成功' } } }),
  '/user/upload_avatar': () => Promise.resolve({ data: { data: { avatar: 'new_avatar_url' } } }),
  '/user/get_captcha': () => Promise.resolve({ data: { data: { img: 'base64_captcha_image' } } }),
  
  // 其他接口
  '/reward/rank': () => Promise.resolve({ data: { data: testRewardRankData } })
};

// 检查是否使用 mock 数据
export const shouldUseMock = () => USE_MOCK_DATA;

// 执行 mock 请求
export const executeMockRequest = async (url, method = 'get', data = null) => {
  if (!shouldUseMock()) {
    return null;
  }

  // 查找匹配的 mock 服务
  for (const [pattern, handler] of Object.entries(mockService)) {
    const regex = new RegExp(`^${pattern}$`);
    if (regex.test(url)) {
      try {
        return await handler(url, method, data);
      } catch (error) {
        throw new Error(`Mock service error for ${url}: ${error.message}`);
      }
    }
  }
  
  // 如果没有匹配的 mock 服务，返回默认响应
  console.warn(`No mock service found for: ${url}`);
  return Promise.resolve({ data: { data: null } });
};