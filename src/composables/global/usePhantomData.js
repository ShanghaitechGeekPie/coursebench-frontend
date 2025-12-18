// In memorize of some great piece of work used as phantom data

export const testUserProfile = {
  email: 'aReallyReallyReallyLongName@shanghaitech.edu.cn',
  year: 2022,
  grade: 1,
  nickname: '一个很长很长很长很长很长的名字叫做小明',
  realname: '阿仆杜拉-吴迪',
  avatar:
    'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
  show_email: true,
  show_year: true,
  show_grade: true,
  show_realname: true,
  is_admin: true,
  is_community_admin: true,
}; // Just for test

export const testCommentText = [
  {
    id: 1,
    title: '锐评孙伟',
    content: `### 我是陈克应\n\`\`\`js\nvar foo = function (bar) {
      return bar++;
    };
    
    console.log(foo(5));\n\`\`\`\n\- Lesson 1\n\- Lesson 2\n1. Lesson 1\n2. Lesson 2
    Ordered
    1. Lorem ipsum dolor sit amet
    2. Consectetur adipiscing elit
    3. Integer molestie lorem at massa`,
    course: {
      name: '数学分析I',
      code: 'GEMA1009',
      id: 1,
      institute: '其他学院',
    },
    group: {
      id: 1,
      code: 'GEMA1009.02',
      teachers: [{ name: '姚成建', id: 23 }],
    },
    post_time: '20211012', //unix时间戳 初次发表时间
    update_time: '20211023', //unix时间戳 最后更新时间
    semester: 202102,
    is_anonymous: false,
    user_nickname: '小明', // 匿名时这个没有
    user_id: 123, // 匿名时这个没有（例外：本人查询自己的评论时）
    avatar:
      'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
    grade: 1,
    score: [5, 4, 3, 2],
    user_score_ranking: 2,
  },
  {
    id: 2,
    title:
      '![跃进之罪](https://obohe.com/i/2022/01/31/x446zh.png)  \n 陈克应为什么是神?在谈论这个问题之前,我想先说说其他数分教授相较于陈克应究竟差在了哪里。首先是犯下跃进之罪的孙伟，曾经一天拉完三个课时, 课时进度稳居四个班之首,而且作业量所有题都做，总用-些复杂超前的讲法给出证明，孙伟像是嚼了炫迈一样根本停不下来，“你们都学过复数吧，那你们肯定知道欧拉公式.那我这题用欧拉公式，这样.这样...。” 这种过快而且超前的讲法在学生们看来,是极”左”且跃进的行为。事实也是如此，数分三班上课的人数一直在走下坡路,于是神降下了他的惩罚，来数分三班听课的人数只有个位数，最终泯然众人。与之相比神就很谦卑，大家听得懂，跟得上的速度讲课都是神留给凡人的慈悲，神不是不会那些很难的讲法，只是不想通过太难以理解的方法让同学们绝望所以故意不用，可笑有些人不理解神的良苦用心，竟然还用这些事来讥讽神，我劝你们好自为之。',
    content: '为什么说陈克应是神....?  \n',
    course: {
      name: '数学分析I',
      code: 'GEMA1009',
      id: 1,
      institute: '数学科学研究所',
    },
    group: {
      id: 1,
      code: 'GEMA1009.02',
      teachers: [
        {
          name: '高盛华',
          id: 23,
        },
        {
          name: '梁俊睿',
          id: 23,
        },
        {
          name: '陆林燕',
          id: 23,
        },
        {
          name: '娄鑫',
          id: 23,
        },
        {
          name: '刘闯',
          id: 23,
        },
        {
          name: '郑锐',
          id: 24,
        },
        {
          name: '邱越',
          id: 24,
        },
      ],
    },
    post_time: '20210604', //unix时间戳 初次发表时间
    update_time: '20210908', //unix时间戳 最后更新时间
    semester: 202102,
    is_anonymous: false,
    user_nickname: '小黑', // 匿名时这个没有
    user_id: 123, // 匿名时这个没有（例外：本人查询自己的评论时）
    avatar:
      'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
    grade: 1,
    score: [5, 4, 3, 2],
    user_score_ranking: 2,
  },
  {
    id: 6,
    title: '陈克应为什么是神 —— 孙伟与跃进之罪',
    content: ` ![跃进之罪](https://ims.shanghaitech.edu.cn/_upload/article/images/c8/d1/7ab02afd4938b2195937472f06cd/c83ead60-55c5-494b-b8bb-2d0b81be0d86_s.jpg)  \n 陈克应为什么是神?在谈论这个问题之前,我想先说说其他数分教授相较于陈克应究竟差在了哪里。首先是犯下跃进之罪的孙伟，曾经一天拉完三个课时, 课时进度稳居四个班之首,而且作业量所有题都做，总用-些复杂超前的讲法给出证明，孙伟像是嚼了炫迈一样根本停不下来，“你们都学过复数吧，那你们肯定知道欧拉公式.那我这题用欧拉公式，这样.这样...。” 这种过快而且超前的讲法在学生们看来,是极”左”且跃进的行为。事实也是如此，数分三班上课的人数一直在走下坡路,于是神降下了他的惩罚，来数分三班听课的人数只有个位数，最终泯然众人。与之相比神就很谦卑，大家听得懂，跟得上的速度讲课都是神留给凡人的慈悲，神不是不会那些很难的讲法，只是不想通过太难以理解的方法让同学们绝望所以故意不用，可笑有些人不理解神的良苦用心，竟然还用这些事来讥讽神，我劝你们好自为之。`,
    course: {
      name: '信息科学技术导论',
      code: 'SI100B',
      id: 1,
      institute: '信息科学与技术学院',
    },
    group: {
      id: 1,
      code: 'SI100B.01',
      teachers: [
        {
          name: '高盛华',
          id: 23,
        },
        {
          name: '梁俊睿',
          id: 23,
        },
        {
          name: '陆林燕',
          id: 23,
        },
        {
          name: '娄鑫',
          id: 23,
        },
        {
          name: '刘闯',
          id: 23,
        },
        {
          name: '郑锐',
          id: 24,
        },
        {
          name: '邱越',
          id: 24,
        },
      ],
    },
    post_time: '20200107', //unix时间戳 初次发表时间
    update_time: '20211223', //unix时间戳 最后更新时间
    semester: 202102,
    is_anonymous: false,
    user_nickname: '傻逼', // 匿名时这个没有
    user_id: 123, // 匿名时这个没有（例外：本人查询自己的评论时）
    avatar:
      'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
    grade: 1,
    score: [5, 4, 3, 2],
    user_score_ranking: 2,
  },
  {
    id: 3,
    title: '孙伟到底犯下了什么罪？',
    content: `## 孙伟到底犯下了什么罪？根据一般历史记载，有包括但不限于以下的罪行   \n1. 撞断不周山，造成洪水泛滥，使华夏大地沦为汪洋大海\n2. 建造酒池肉林，使纣王虚度光阴，最终丢了王朝\n3. 帮白起刨坑，坑杀了二十万俘虏\n4. 蛊惑嬴政，造成焚书坑儒的惨剧\n5. 创建司马家族，三代弑君夺权，中原民不聊生\n6. 筹备八王之乱，使得中原沦陷，五胡乱华\n7. 教唆李世民发动玄武门兵变，弑杀兄长夺取皇位\n8. 怂恿秦晖向皇帝进谗言，以莫须有之罪杀害岳飞\n9. 火烧圆明园，为英法联军引路\n10. 在滑铁卢偷袭拿破仑，造成其战败\n孙伟的恶行罄竹难书，是名副其实的带恶人。`,
    course: {
      name: '数学分析I',
      code: 'GEMA1009',
      id: 1,
      institute: '数学科学研究所',
    },
    group: {
      id: 1,
      code: 'GEMA1009.02',
      teachers: [{ name: '姚成建', id: 23 }],
    },
    post_time: '20190507', //unix时间戳 初次发表时间
    update_time: '20210604', //unix时间戳 最后更新时间
    semester: 202102,
    is_anonymous: false,
    user_nickname: '小明', // 匿名时这个没有
    user_id: 123, // 匿名时这个没有（例外：本人查询自己的评论时）
    avatar:
      'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
    grade: 1,
    score: [5, 4, 3, 1],
    user_score_ranking: -1,
  },
  {
    id: 4,
    title: '锐评邹羽',
    content: `邹羽是傻逼`,
    course: {
      name: '甘地和英帝国的衰落',
      code: 'GEHA1131',
      id: 88,
      institute: '人文科学研究院',
    },
    group: {
      id: 1,
      code: 'GEHA1131',
      teachers: [{ name: 'Ranjan Ritwik', id: 923 }],
    },
    post_time: '20210907', //unix时间戳 初次发表时间
    update_time: '20210907', //unix时间戳 最后更新时间
    semester: 202102,
    is_anonymous: false,
    user_nickname: '小紫', // 匿名时这个没有
    user_id: 123, // 匿名时这个没有（例外：本人查询自己的评论时）
    avatar:
      'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
    grade: 1,
    score: [5, 4, 3, 1],
    user_score_ranking: 2,
  },
  {
    id: 5,
    title: '免费的薯条',
    content: `**以下内容纯属虚构*  \n在写这篇评价之前，我在金拱门吃了一顿，柜台的那个姐姐问我：“你好呀，今天是不是过得很棒？”，不是那种 “今天过得怎么样？”，而是充满期待，“你今天是不是过得很棒？”。她问的非常矫情，好像我不同意就是我的责任，我今天没有过得很棒，我就成了负能量的中心。通常情况下人们会问：“你今天过的如何？”， 真实的回答是我过得很屎。但我不能这样说，因为我浑浑噩噩过了一天，连一个过得很屎的理由都没有。所以如果我说：“糟心透了！”，那么别人就会说：“为什么？出了什么事？”，而我只能说：“我不知道，一切都很糟。”因此取而代之，当别人问我今天过得怎么样时，我会回答说：“我过得好极了！”。但当金拱门的姐姐问我今天是不是过得很好时，我想，今天我可以过得很糟糕，因为我有合适的理由，于是我说：“我的数分挂了。”，然后她突然就开始哭了。我还得反过来安慰她，真是烦死了，何况后面还有一长队人等着。他们似乎都用批判的目光瞪着我，因为我把柜台的姐姐弄哭了。然后她放声大哭，嘴里说着：“对不起，对不起，真的非常对不起。”，而我只能说：“没事的，没事的，我是说，虽然不是很好，但就是没事。我想点一份安格斯MAX厚牛培根堡四件套，我还得去别的地方，所以能不能多给炸鸡加点油，少给我流点泪？”。然后她又道了一次歉，并在我取餐时送了我一份免费的薯条。在我走的时候，我想，“我获得了一份免费的薯条，因为我数分挂科了！”，可没人告诉过我，当你的数分挂科时，你能得到一份免费的薯条。  \n总而言之，我的数分挂科了。孙伟, 他是谁？他教数学分析I教得怎么样？首先他是数所的助理教授，于2018年加入上海科技大学。有一次，他用超前的知识评讲题目，让大量的同学都摸不着头脑。还有一次，在他周四的课上，到场的同学不足二十个，我亲眼看见的。真是一位不可思异的教授！这位教授带我走完了整个数学分析I的学习历程，直到我数分挂科，大概也就是现在吧。是不是很引人深思？这就是数学吧，变换莫测，难以理解，只能挂科。讲个故事吧，每到周末的时候，孙伟都会为同学们开小灶讲题，答疑解惑，我们都收益匪浅。或许课上他讲的很烂，但每到这个时候，我都能感觉到，他还是能讲好的。这才是关于孙伟的好故事，这不是真的，但是个好故事。我从数院同学那抄来的，孙伟给他们开小灶的故事，但我也不知道孙伟是否在那讲的很好。几乎所有的数分的知识点，都是我从网上学来的，但在数学分析中，但掌握知识点远远不够。你得从始至终的学习、刷题，无可置疑的努力，你不能只看看知识点就完事，再去写个镜像站，提供镜像服务；或是为做好信导project ，就连作业也不写。你必须时时刻刻都把数学分析放在心上，这真是太难了。入学之初，你对自己说，或许是自己课下复习不够，只要认真复习一下就能改善了，虽然也不一定就能听懂孙伟的下一堂课，甚至在孙伟一次又一次让你失望后，你依然坚信，存在那么一个时刻，孙伟是能够讲好的，让你真正学懂数学分析。我一直在等待这一刻，等某一刻，来证明，虽然孙伟平时讲的很烂，但在他内心深处，他是想讲好的，在特定的时间，他也是能讲好的；并且我也想让他知道，我的数学分析I的学习因为他而有了一丝光亮。就算是现在，我发现我还是在等，尽管我的数分以及挂科了。  \n某种程度上，我和孙伟是互相理解的。我听他讲课是坐牢，他给我讲课也一定是坐牢，因此确实是互相理解的。我非常清楚听孙伟的课就好像水慢慢没过头顶般溺水，但还是有一些稀少、短暂的瞬间，我似乎能听懂孙伟讲课；此时我突然记起，我是会游泳的。但是我再次强调，大多数时候不是，大多数时候都是溺水状态。他也应该明白这一点，他也应该知道我明白这一点。我们两人都淹在水里，我们不知道如何拯救对方，但我们都知道，我们要一起溺水而亡。虽然只有我会挂科，而他不会。  \n当你数分和线代都挂科时，你的概率论也多半无了。当然我并不是说挂科还有排队叫号的。任何时候，你们谁都有可能因为错过关键时间点而挂科。你们以为明白这一点会让自己更加努力学习，更加奋发向上。但这让我们变得更加迷茫，失去方向。  \n我的数分挂了，而我只有这包免费的薯条。你们知道最糟心的事情是什么吗？当柜台后那个陌生人给我免费薯条时，这小小的善意之举流露出的诚意，比孙伟一学期的数学分析I课程给予我的都要多。好好对别人能有多难！那个金拱门柜台的姐姐甚至都不认识我，而我是孙伟的学生！我只有你一个数学分析老师啊。  \n总之，我的数学分析I挂科了。我的线代挂科时，我曾说：“我的线代挂科了，一切都将变得更糟。“， 那时我为什么不去金拱门呢，说不定我也能得到一份免费的薯条。`,
    course: {
      name: '数学分析I',
      code: 'GEMA1009',
      id: 1,
      institute: '数学科学研究所',
    },
    group: {
      id: 19,
      code: 'GEMA1009.03',
      teachers: [{ name: '孙伟', id: 293 }],
    },
    post_time: '20210907', //unix时间戳 初次发表时间
    update_time: '20211023', //unix时间戳 最后更新时间
    semester: 202102,
    is_anonymous: false,
    user_nickname: '小白', // 匿名时这个没有
    user_id: 123, // 匿名时这个没有（例外：本人查询自己的评论时）
    avatar:
      'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
    grade: 1,
    score: [1, 3, 2, 4],
    user_score_ranking: 0,
  },
]; // Just for test


export const testCourseData = [
  {
    id: 1,
    name: '数学分析I',
    code: 'GEMA1009',
    credit: 4,
    institute: '数学科学研究所',
    comment_num: 25,
    score: [4.2, 3.8, 4.0, 4.1],
    teachers: [
      { id: 1, name: '陈克应' },
      { id: 2, name: '孙伟' }
    ]
  },
  {
    id: 2,
    name: '信息科学技术导论',
    code: 'SI100B',
    credit: 3,
    institute: '信息科学与技术学院',
    comment_num: 18,
    score: [4.5, 4.2, 4.3, 4.0],
    teachers: [
      { id: 3, name: '张三' }
    ]
  },
  {
    id: 3,
    name: '线性代数',
    code: 'GEMA1011',
    credit: 4,
    institute: '数学科学研究所',
    comment_num: 32,
    score: [4.0, 3.9, 4.1, 3.8],
    teachers: [
      { id: 4, name: '李四' }
    ]
  },
  {
    id: 4,
    name: '普通物理学I',
    code: 'PHYS1001',
    credit: 4,
    institute: '物质科学与技术学院',
    comment_num: 15,
    score: [3.8, 4.0, 3.9, 4.2],
    teachers: [
      { id: 5, name: '王五' }
    ]
  },
  {
    id: 5,
    name: '程序设计思维与实践',
    code: 'CS100',
    credit: 3,
    institute: '信息科学与技术学院',
    comment_num: 42,
    score: [4.6, 3.5, 4.2, 4.3],
    teachers: [
      { id: 6, name: '刘教授' }
    ]
  },
  {
    id: 6,
    name: '有机化学',
    code: 'CHEM1002',
    credit: 4,
    institute: '物质科学与技术学院',
    comment_num: 28,
    score: [3.9, 4.1, 3.8, 3.7],
    teachers: [
      { id: 7, name: '化学老师' }
    ]
  },
  {
    id: 7,
    name: '分子生物学',
    code: 'BIOL2001',
    credit: 3,
    institute: '生命科学与技术学院',
    comment_num: 21,
    score: [4.3, 3.9, 4.0, 4.1],
    teachers: [
      { id: 8, name: '生物老师' }
    ]
  },
  {
    id: 8,
    name: '创业基础',
    code: 'ENTR1001',
    credit: 2,
    institute: '创业与管理学院',
    comment_num: 16,
    score: [4.1, 4.4, 3.6, 4.2],
    teachers: [
      { id: 9, name: '创业导师' }
    ]
  },
  {
    id: 9,
    name: '设计思维',
    code: 'ART1001',
    credit: 3,
    institute: '创意与艺术学院',
    comment_num: 19,
    score: [4.4, 3.8, 4.1, 4.0],
    teachers: [
      { id: 10, name: '艺术老师' }
    ]
  },
  {
    id: 10,
    name: '中国文化概论',
    code: 'GE1001',
    credit: 2,
    institute: '人文科学研究院',
    comment_num: 33,
    score: [4.2, 4.0, 3.9, 4.1],
    teachers: [
      { id: 11, name: '人文老师' }
    ]
  },
  {
    id: 11,
    name: '生物医学工程导论',
    code: 'BME1001',
    credit: 3,
    institute: '生物医学工程学院',
    comment_num: 14,
    score: [4.0, 3.7, 4.2, 3.9],
    teachers: [
      { id: 12, name: 'BME老师' }
    ]
  },
  {
    id: 12,
    name: '概率论与数理统计',
    code: 'GEMA2005',
    credit: 4,
    institute: '数学科学研究所',
    comment_num: 29,
    score: [3.7, 3.9, 4.0, 3.8],
    teachers: [
      { id: 13, name: '概率老师' }
    ]
  }
];

export const testTeacherData = [
  {
    id: 1,
    name: '陈克应',
    avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
    institute: '数学科学研究所',
    job: '教授',
    introduction: '数学分析专家，专注于实分析和复分析研究。在数学分析领域有着深厚的造诣，发表过多篇高质量论文。教学风格严谨，深受学生喜爱。',
    courses: [
      {
        id: 1,
        name: '数学分析I',
        code: 'GEMA1009',
        institute: '数学科学研究所',
        semester: 202102,
        score: [4.5, 4.2, 4.3, 4.1],
        comment_num: 15
      },
      {
        id: 13,
        name: '数学分析II',
        code: 'GEMA1010',
        institute: '数学科学研究所',
        semester: 202201,
        score: [4.3, 4.1, 4.2, 4.0],
        comment_num: 12
      }
    ],
    total_courses: 2,
    total_comments: 27,
    avg_score: [4.4, 4.15, 4.25, 4.05]
  },
  {
    id: 2,
    name: '孙伟',
    avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
    institute: '数学科学研究所',
    job: '助理教授',
    introduction: '年轻有为的数学教授，主要研究方向为数学分析和微分方程。课堂教学充满激情，善于用生动的例子解释抽象的数学概念。',
    courses: [
      {
        id: 1,
        name: '数学分析I',
        code: 'GEMA1009',
        institute: '数学科学研究所',
        semester: 202102,
        score: [3.8, 3.5, 3.9, 3.7],
        comment_num: 18
      }
    ],
    total_courses: 1,
    total_comments: 18,
    avg_score: [3.8, 3.5, 3.9, 3.7]
  },
  {
    id: 3,
    name: '张三',
    avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
    institute: '信息科学与技术学院',
    job: '副教授',
    introduction: '计算机科学博士，专注于人工智能和机器学习研究。有丰富的工业界经验，善于将理论与实践相结合。',
    courses: [
      {
        id: 2,
        name: '信息科学技术导论',
        code: 'SI100B',
        institute: '信息科学与技术学院',
        semester: 202102,
        score: [4.5, 4.2, 4.3, 4.0],
        comment_num: 25
      },
      {
        id: 14,
        name: '人工智能导论',
        code: 'CS201',
        institute: '信息科学与技术学院',
        semester: 202201,
        score: [4.2, 3.9, 4.1, 4.3],
        comment_num: 20
      }
    ],
    total_courses: 2,
    total_comments: 45,
    avg_score: [4.35, 4.05, 4.2, 4.15]
  },
  {
    id: 4,
    name: '李四',
    avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
    institute: '数学科学研究所',
    job: '教授',
    introduction: '线性代数和抽象代数专家，教学经验丰富。善于化繁为简，帮助学生理解抽象的数学概念。',
    courses: [
      {
        id: 3,
        name: '线性代数',
        code: 'GEMA1011',
        institute: '数学科学研究所',
        semester: 202102,
        score: [4.0, 3.9, 4.1, 3.8],
        comment_num: 22
      }
    ],
    total_courses: 1,
    total_comments: 22,
    avg_score: [4.0, 3.9, 4.1, 3.8]
  },
  {
    id: 5,
    name: '王五',
    avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
    institute: '物质科学与技术学院',
    job: '教授',
    introduction: '物理学教授，专注于理论物理和量子力学研究。课堂生动有趣，能够将复杂的物理概念用简单的语言解释清楚。',
    courses: [
      {
        id: 4,
        name: '普通物理学I',
        code: 'PHYS1001',
        institute: '物质科学与技术学院',
        semester: 202102,
        score: [3.8, 4.0, 3.9, 4.2],
        comment_num: 15
      }
    ],
    total_courses: 1,
    total_comments: 15,
    avg_score: [3.8, 4.0, 3.9, 4.2]
  }
];


export const testUserData = [
  {
    id: 123,
    nickname: '小明',
    realname: '张小明',
    email: 'xiaoming@shanghaitech.edu.cn',
    avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
    grade: 1,
    year: 2022,
    show_email: true,
    show_year: true,
    show_grade: true,
    show_realname: true,
    is_admin: false,
    is_community_admin: false,
    comment_count: 5,
    like_count: 25,
    reward_total: 50.5
  },
  {
    id: 124,
    nickname: '小白',
    realname: '李小白',
    email: 'xiaobai@shanghaitech.edu.cn',
    avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
    grade: 2,
    year: 2021,
    show_email: false,
    show_year: true,
    show_grade: true,
    show_realname: false,
    is_admin: false,
    is_community_admin: false,
    comment_count: 3,
    like_count: 15,
    reward_total: 25.0
  },
  {
    id: 125,
    nickname: '科技爱好者',
    realname: '王科技',
    email: 'tech@shanghaitech.edu.cn',
    avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
    grade: 3,
    year: 2020,
    show_email: true,
    show_year: true,
    show_grade: true,
    show_realname: true,
    is_admin: false,
    is_community_admin: true,
    comment_count: 8,
    like_count: 45,
    reward_total: 100.0
  },
  {
    id: 126,
    nickname: '数学达人',
    realname: '赵数学',
    email: 'math@shanghaitech.edu.cn',
    avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
    grade: 4,
    year: 2019,
    show_email: false,
    show_year: true,
    show_grade: true,
    show_realname: true,
    is_admin: true,
    is_community_admin: true,
    comment_count: 12,
    like_count: 80,
    reward_total: 200.0
  }
];

// 添加教师详情数据
export const testTeacherDetailData = {
  1: {
    teacher: {
      id: 1,
      name: '陈克应',
      avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
      institute: '数学科学研究所',
      job: '教授',
      introduction: '数学分析专家，专注于实分析和复分析研究。在数学分析领域有着深厚的造诣，发表过多篇高质量论文。教学风格严谨，深受学生喜爱。',
      total_courses: 2,
      total_comments: 27,
      avg_score: [4.4, 4.15, 4.25, 4.05]
    },
    courses: [
      {
        id: 1,
        name: '数学分析I',
        code: 'GEMA1009',
        institute: '数学科学研究所',
        semester: 202102,
        score: [4.5, 4.2, 4.3, 4.1],
        comment_num: 15,
        groups: [
          {
            id: 1,
            code: 'GEMA1009.01',
            teachers: [{ id: 1, name: '陈克应' }]
          }
        ]
      },
      {
        id: 13,
        name: '数学分析II',
        code: 'GEMA1010',
        institute: '数学科学研究所',
        semester: 202201,
        score: [4.3, 4.1, 4.2, 4.0],
        comment_num: 12,
        groups: [
          {
            id: 15,
            code: 'GEMA1010.01',
            teachers: [{ id: 1, name: '陈克应' }]
          }
        ]
      }
    ],
    comments: [
      {
        id: 101,
        title: '陈教授的数分课真的很棒',
        content: '陈教授讲课非常清晰，逻辑性强，能够帮助我们理解复杂的数学概念。',
        course: {
          name: '数学分析I',
          code: 'GEMA1009',
          id: 1
        },
        group: {
          id: 1,
          code: 'GEMA1009.01',
          teachers: [{ name: '陈克应', id: 1 }]
        },
        user: {
          id: 123,
          nickname: '小明',
          avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
          grade: 1
        },
        post_time: '20211015',
        update_time: '20211015',
        semester: 202102,
        is_anonymous: false,
        score: [5, 4, 4, 4],
        like: 20,
        dislike: 1,
        like_status: 0,
        is_fold: false,
        is_covered: false
      }
    ]
  },
  2: {
    teacher: {
      id: 2,
      name: '孙伟',
      avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
      institute: '数学科学研究所',
      job: '助理教授',
      introduction: '年轻有为的数学教授，主要研究方向为数学分析和微分方程。课堂教学充满激情，善于用生动的例子解释抽象的数学概念。',
      total_courses: 1,
      total_comments: 18,
      avg_score: [3.8, 3.5, 3.9, 3.7]
    },
    courses: [
      {
        id: 1,
        name: '数学分析I',
        code: 'GEMA1009',
        institute: '数学科学研究所',
        semester: 202102,
        score: [3.8, 3.5, 3.9, 3.7],
        comment_num: 18,
        groups: [
          {
            id: 2,
            code: 'GEMA1009.02',
            teachers: [{ id: 2, name: '孙伟' }]
          }
        ]
      }
    ],
    comments: [
      {
        id: 102,
        title: '孙老师的课程有挑战性',
        content: '孙老师的课程内容很有深度，虽然有些难度，但收获很大。',
        course: {
          name: '数学分析I',
          code: 'GEMA1009',
          id: 1
        },
        group: {
          id: 2,
          code: 'GEMA1009.02',
          teachers: [{ name: '孙伟', id: 2 }]
        },
        user: {
          id: 124,
          nickname: '小白',
          avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
          grade: 2
        },
        post_time: '20211020',
        update_time: '20211020',
        semester: 202102,
        is_anonymous: false,
        score: [4, 3, 4, 4],
        like: 12,
        dislike: 3,
        like_status: 0,
        is_fold: false,
        is_covered: false
      }
    ]
  }
};

// 添加用户统计数据
export const testUserStatistic = {
  total: 15,
  score: 1250,
  count: {
    信息科学与技术学院: 3,
    物质科学与技术学院: 2,
    生命科学与技术学院: 1,
    创意与艺术学院: 0,
    创业与管理学院: 1,
    人文科学研究院: 2,
    生物医学工程学院: 1,
    数学科学研究所: 4,
    其他学院: 1,
  },
};

// 添加活跃用户数据
export const testActiveData = {
  loading: false,
  errorMessage: '',
  success: true,
  message: '账号激活成功！欢迎使用本系统。'
};

// 添加奖励排行榜数据
export const testRewardRankData = [
  {
    id: 1,
    nick_name: '小明',
    reward: 15.50,
    is_anonymous: false,
    index: 0
  },
  {
    id: 2,
    nick_name: '小红',
    reward: 12.30,
    is_anonymous: false,
    index: 1
  },
  {
    id: 3,
    nick_name: '匿名用户',
    reward: 10.80,
    is_anonymous: true,
    index: 2
  }
];

// 添加课程详情数据（包含课程信息和对应的评论）
export const testCourseDetailData = {
  1: { // 数学分析I
    course: {
      id: 1,
      name: '数学分析I',
      code: 'GEMA1009',
      credit: 4,
      institute: '数学科学研究所',
      comment_num: 25,
      score: [4.2, 3.8, 4.0, 4.1],
      description: '数学分析是数学专业的核心基础课程，主要讲授极限、导数、积分等基本概念。'
    },
    groups: [
      {
        id: 1,
        code: 'GEMA1009.01',
        semester: 202102,
        teachers: [
          { id: 1, name: '陈克应' }
        ]
      },
      {
        id: 2,
        code: 'GEMA1009.02',
        semester: 202102,
        teachers: [
          { id: 2, name: '孙伟' }
        ]
      }
    ],
    comments: [
      {
        id: 1,
        title: '锐评孙伟',
        content: `### 我是陈克应\n\`\`\`js\nvar foo = function (bar) {
          return bar++;
        };\n\`\`\`\n这门课程非常有挑战性，需要大量的练习。`,
        course: {
          name: '数学分析I',
          code: 'GEMA1009',
          id: 1,
          institute: '数学科学研究所',
        },
        group: {
          id: 2,
          code: 'GEMA1009.02',
          teachers: [{ name: '孙伟', id: 2 }],
        },
        post_time: '20211012',
        update_time: '20211023',
        semester: 202102,
        is_anonymous: false,
        user_nickname: '小明',
        user_id: 123,
        avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
        grade: 1,
        score: [5, 4, 3, 2],
        user_score_ranking: 2,
        like: 15,
        dislike: 2,
        like_status: 0,
        is_fold: false,
        is_covered: false,
        user: {
          id: 123,
          nickname: '小明',
          avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
          grade: 1
        },
        replies: [
          {
            id: 101,
            content: '同意！我也觉得这门课很棒，特别是老师的讲解方式很生动。',
            user: {
              id: 2,
              nickname: '学习达人',
              avatar: '',
              is_anonymous: false
            },
            created_at: '2024-01-15T10:30:00Z',
            like: 5,
            dislike: 0,
            parent_reply_id: null, // 直接回复评论
            parent_user: null
          },
          {
            id: 101,
            content: '同意！我也觉得这门课很棒，特别是老师的讲解方式很生动。',
            user: {
              id: 2,
              nickname: '学习达人',
              avatar: '',
              is_anonymous: false
            },
            created_at: '2024-01-15T10:30:00Z',
            like: 5,
            dislike: 0,
            parent_reply_id: null, // 直接回复评论
            parent_user: null
          },
          {
            id: 102,
            content: '请问作业难度怎么样？我比较担心跟不上进度。',
            user: {
              id: 3,
              nickname: '新手小白',
              avatar: '',
              is_anonymous: false
            },
            created_at: '2024-01-15T11:15:00Z',
            like: 2,
            dislike: 0,
            parent_reply_id: null,
            parent_user: null
          },
          {
            id: 103,
            content: '作业难度还好，主要是理解概念，多练习就行。',
            user: {
              id: 1,
              nickname: '课程体验者',
              avatar: '',
              is_anonymous: false
            },
            created_at: '2024-01-15T12:00:00Z',
            like: 3,
            dislike: 0,
            parent_reply_id: 102, // 回复特定用户
            parent_user: {
              id: 3,
              nickname: '新手小白'
            }
          }
        ],
        reply_count: 3
      },
      {
        id: 5,
        title: '免费的薯条',
        content: `**以下内容纯属虚构**\n\n孙伟老师的课程确实很有挑战性，但是通过努力还是能够掌握的。建议大家多做练习题。`,
        course: {
          name: '数学分析I',
          code: 'GEMA1009',
          id: 1,
          institute: '数学科学研究所',
        },
        group: {
          id: 2,
          code: 'GEMA1009.02',
          teachers: [{ name: '孙伟', id: 2 }],
        },
        post_time: '20210907',
        update_time: '20211023',
        semester: 202102,
        is_anonymous: false,
        user_nickname: '小白',
        user_id: 124,
        avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
        grade: 1,
        score: [1, 3, 2, 4],
        user_score_ranking: 0,
        like: 8,
        dislike: 1,
        like_status: 0,
        is_fold: false,
        is_covered: false,
        user: {
          id: 124,
          nickname: '小白',
          avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
          grade: 1
        }
      }
    ]
  },
  2: { // 信息科学技术导论
    course: {
      id: 2,
      name: '信息科学技术导论',
      code: 'SI100B',
      credit: 3,
      institute: '信息科学与技术学院',
      comment_num: 18,
      score: [4.5, 4.2, 4.3, 4.0],
      description: '介绍信息科学与技术的基本概念和发展历程。'
    },
    groups: [
      {
        id: 3,
        code: 'SI100B.01',
        semester: 202102,
        teachers: [
          { id: 3, name: '梁俊瑞' }
        ]
      }
    ],
    comments: [
      {
        id: 6,
        title: '信息技术入门很好的课程',
        content: `这门课程对于初学者来说非常友好，老师讲解清晰，内容丰富。推荐给所有对信息技术感兴趣的同学。`,
        course: {
          name: '信息科学技术导论',
          code: 'SI100B',
          id: 2,
          institute: '信息科学与技术学院',
        },
        group: {
          id: 3,
          code: 'SI100B.01',
          teachers: [{ name: '张三', id: 3 }],
        },
        post_time: '20200107',
        update_time: '20211223',
        semester: 202102,
        is_anonymous: false,
        user_nickname: '科技爱好者',
        user_id: 125,
        avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
        grade: 1,
        score: [5, 4, 3, 2],
        user_score_ranking: 2,
        like: 12,
        dislike: 0,
        like_status: 0,
        is_fold: false,
        is_covered: false,
        user: {
          id: 125,
          nickname: '123123',
          avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
          grade: 1
        },
        replies: [
          {
            id: 201,
            content: '非常同意！张老师的课程确实很棒，作为计算机小白，我在这门课上学到了很多基础知识。',
            user: {
              id: 127,
              nickname: '编程新手',
              avatar: '',
              is_anonymous: false
            },
            created_at: '2024-01-16T14:20:00Z',
            like: 8,
            dislike: 0,
            parent_reply_id: null,
            parent_user: null
          },
          {
            id: 202,
            content: '请问这门课的作业量大吗？我担心跟不上进度。',
            user: {
              id: 128,
              nickname: '新生小白',
              avatar: '',
              is_anonymous: false
            },
            created_at: '2024-01-16T15:30:00Z',
            like: 3,
            dislike: 0,
            parent_reply_id: null,
            parent_user: null
          },
          {
            id: 203,
            content: '作业量还好，主要是理论作业和小练习，跟着老师的节奏走就没问题的！',
            user: {
              id: 125,
              nickname: '科技爱好者',
              avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
              is_anonymous: false
            },
            created_at: '2024-01-16T16:00:00Z',
            like: 5,
            dislike: 0,
            parent_reply_id: 202,
            parent_user: {
              id: 128,
              nickname: '新生小白'
            }
          },
          {
            id: 204,
            content: '张老师上课会结合很多实际案例，特别有意思！',
            user: {
              id: 129,
              nickname: 'IT达人',
              avatar: '',
              is_anonymous: false
            },
            created_at: '2024-01-16T17:45:00Z',
            like: 6,
            dislike: 0,
            parent_reply_id: null,
            parent_user: null
          },
          {
            id: 205,
            content: '确实！特别是讲到人工智能那部分，老师举的例子都很生动易懂。',
            user: {
              id: 130,
              nickname: 'AI学习者',
              avatar: '',
              is_anonymous: false
            },
            created_at: '2024-01-16T18:20:00Z',
            like: 4,
            dislike: 0,
            parent_reply_id: 204,
            parent_user: {
              id: 129,
              nickname: 'IT达人'
            }
          }
        ],
        reply_count: 5
      }
    ]
  },
  3: { // 线性代数
    course: {
      id: 3,
      name: '线性代数',
      code: 'GEMA1011',
      credit: 4,
      institute: '数学科学研究所',
      comment_num: 32,
      score: [4.0, 3.9, 4.1, 3.8],
      description: '线性代数是数学的一个重要分支，研究向量、向量空间、线性映射等。'
    },
    groups: [
      {
        id: 4,
        code: 'GEMA1011.01',
        semester: 202102,
        teachers: [
          { id: 4, name: '李四' }
        ]
      }
    ],
    comments: [
      {
        id: 7,
        title: '线代学习心得',
        content: `线性代数虽然抽象，但是应用很广泛。建议结合几何直观来理解概念，多做计算练习。`,
        course: {
          name: '线性代数',
          code: 'GEMA1011',
          id: 3,
          institute: '数学科学研究所',
        },
        group: {
          id: 4,
          code: 'GEMA1011.01',
          teachers: [{ name: '李四', id: 4 }],
        },
        post_time: '20210505',
        update_time: '20210505',
        semester: 202102,
        is_anonymous: false,
        user_nickname: '数学达人',
        user_id: 126,
        avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
        grade: 1,
        score: [4, 3, 4, 4],
        user_score_ranking: 1,
        like: 20,
        dislike: 3,
        like_status: 0,
        is_fold: false,
        is_covered: false,
        user: {
          id: 126,
          nickname: '数学达人',
          avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
          grade: 1
        }
      }
    ]
  },
  4: {
    course: {
      id: 4,
      name: '普通物理学I',
      code: 'PHYS1001',
      credit: 4,
      institute: '物质科学与技术学院',
      comment_num: 15,
      score: [3.8, 4.0, 3.9, 4.2]
    },
    groups: [
      {
        id: 5,
        code: 'PHYS1001.01',
        semester: 202102,
        teachers: [{ id: 5, name: '王五' }]
      }
    ],
    comments: []
  },
  5: {
    course: {
      id: 5,
      name: '程序设计思维与实践',
      code: 'CS100',
      credit: 3,
      institute: '信息科学与技术学院',
      comment_num: 42,
      score: [4.6, 3.5, 4.2, 4.3]
    },
    groups: [
      {
        id: 6,
        code: 'CS100.01',
        semester: 202102,
        teachers: [{ id: 6, name: '刘教授' }]
      }
    ],
    comments: []
  }
};

// Mock 数据管理器
export const mockDataManager = {
  // 检查是否启用 mock
  isEnabled: () => USE_MOCK_DATA,
  
  // 获取指定类型的 mock 数据
  getData: (type, id) => {
    const dataMap = {
      'comments': testCommentText,
      'courses': testCourseData,
      'teachers': testTeacherData,
      'teacherDetail': testTeacherDetailData[id] || null,
      'teacherComments': testTeacherDetailData[id]?.comments || [],
      'teacherCourses': testTeacherDetailData[id]?.courses || [],
      'users': testUserData,
      'userProfile': testUserProfile,
      'userStatistic': testUserStatistic,
      'commentStatistic': testCommmentStatistic,
      'activeData': testActiveData,
      'rewardRank': testRewardRankData,
      'courseDetail': testCourseDetailData[id] || null,
      'courseComments': testCourseDetailData[id]?.comments || []
    };
    return dataMap[type] || [];
  },
  
  // 模拟错误响应
  mockError: async (message = '模拟网络错误', delay = 500) => {
    if (!USE_MOCK_DATA) return null;
    await mockDataManager.delay(delay);
    throw new Error(message);
  }
};

export const testCommmentStatistic = {
  total: 6,
  score: 2956,
  count: {
    信息科学与技术学院: 1,
    物质科学与技术学院: 0,
    生命科学与技术学院: 0,
    创意与艺术学院: 0,
    创业与管理学院: 0,
    人文科学研究院: 1,
    生物医学工程学院: 0,
    数学科学研究所: 3,
    其他学院: 1,
  },
};
