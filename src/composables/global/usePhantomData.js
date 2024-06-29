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
}; // Just for test
