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
    const courseDetail = testCourseDetailData[courseId];
    const comments = courseDetail?.comments || [];
    return Promise.resolve({ data: { data: comments } });
  },
  
  // 课程相关 - 修复URL模式匹配
  '/course/all': () => Promise.resolve({ data: { data: testCourseData } }),
  '/course/statistic': () => Promise.resolve({ data: { data: testCommmentStatistic } }),
  '/course/(.+)': (url) => {
    const courseId = parseInt(url.match(/\/course\/(\d+)/)?.[1]);
    const courseDetail = testCourseDetailData[courseId];
    if (courseDetail) {
      // 返回课程详情和分组信息
      return Promise.resolve({ 
        data: { 
          data: {
            ...courseDetail.course,
            groups: courseDetail.groups || []
          }
        } 
      });
    }
    return Promise.resolve({ data: { data: null } });
  },
  
  // 教师相关
  '/teacher/all': () => Promise.resolve({ data: { data: testTeacherData } }),
  '/teacher/(.+)': (url) => {
    const teacherId = parseInt(url.match(/\/teacher\/(\d+)/)?.[1]);
    const teacherDetail = testTeacherDetailData[teacherId];
    if (teacherDetail) {
      // 返回完整的教师信息，包括课程
      return Promise.resolve({ 
        data: { 
          data: {
            ...teacherDetail.teacher,
            courses: teacherDetail.courses || []
          }
        } 
      });
    }
    return Promise.resolve({ data: { data: null } });
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
  
  // 评论操作相关
  '/comment/post': () => Promise.resolve({ data: { data: { id: Date.now(), message: '评论发表成功' } } }),
  '/comment/update': () => Promise.resolve({ data: { data: { message: '评论更新成功' } } }),
  '/comment/delete': () => Promise.resolve({ data: { data: { message: '评论删除成功' } } }),
  '/comment/like': () => Promise.resolve({ data: { data: { message: '点赞成功' } } }),
  '/comment/fold': () => Promise.resolve({ data: { data: { message: '折叠成功' } } }),
  '/comment/cover': () => Promise.resolve({ data: { data: { message: '遮盖成功' } } }),
  '/comment/reply': () => Promise.resolve({ data: { data: { message: '回复成功' } } }),
  '/comment/reply/post': () => Promise.resolve({ data: { data: { message: '回复发表成功' } } }),
  '/comment/reply/like': () => Promise.resolve({ data: { data: { message: '回复点赞成功' } } }),
  '/comment/reply/undo': () => Promise.resolve({ data: { data: { message: '回复操作撤销成功' } } }),
  
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

  // 添加模拟延迟
  await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));

  // 查找匹配的 mock 服务
  for (const [pattern, handler] of Object.entries(mockService)) {
    const regex = new RegExp(`^${pattern}$`);
    if (regex.test(url)) {
      try {
        console.log(`Mock request: ${method.toUpperCase()} ${url}`);
        return await handler(url, method, data);
      } catch (error) {
        console.error(`Mock service error for ${url}:`, error);
        throw new Error(`Mock service error for ${url}: ${error.message}`);
      }
    }
  }
  
  // 如果没有匹配的 mock 服务，返回默认响应
  console.warn(`No mock service found for: ${url}`);
  return Promise.resolve({ data: { data: null } });
};