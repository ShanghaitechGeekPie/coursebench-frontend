import { provide, reactive } from "@vue/composition-api"

export default () => {
  const testCommentText = [
    {
      "course": "123",
      "course_name": "数学分析I", 
      "title": "陈克应强力测试Markdown启用情况",
      "comment": `### 我是陈克应\n\`\`\`\nThis is code\n\`\`\`\n\- Lesson 1\n\- Lesson 2\n1. Lesson 1\n2. Lesson 2`,
      "group_id": "01",
      "time": "2021-05-14",
      "semester": 202102,
      "is_anonymous": false,
      "score": [2.1, 1.2, 2.3, 5.0],
      "user_score": 121,
      "user_score_ranking": 3,
    }, 
    {
      "course": "123",
      "course_name": "数学分析I", 
      "title": "锐评孙伟",
      "comment": "为什么说陈克应是神....?",
      "group_id": "01",
      "time": "2020-01-14",
      "semester": 202102,
      "is_anonymous": false,
      "score": [4.1, 4.2, 4.3, 4.2],
      "user_score": 123,
      "user_score_ranking": 2,
    },
    {
      "course": "123",
      "course_name": "数学分析I", 
      "title": "陈克应为什么是神 —— 孙伟与跃进之罪",
      "comment": ` ![跃进之罪](https://obohe.com/i/2022/01/31/x446zh.png)  \n 陈克应为什么是神?在谈论这个问题之前,我想先说说其他数分教授相较于陈克应究竟差在了哪里。首先是犯下跃进之罪的孙伟，曾经一天拉完三个课时, 课时进度稳居四个班之首,而且作业量所有题都做，总用-些复杂超前的讲法给出证明，孙伟像是嚼了炫迈一样根本停不下来，“你们都学过复数吧，那你们肯定知道欧拉公式.那我这题用欧拉公式，这样.这样...。” 这种过快而且超前的讲法在学生们看来,是极”左”且跃进的行为。事实也是如此，数分三班上课的人数一直在走下坡路,于是神降下了他的惩罚，来数分三班听课的人数只有个位数，最终泯然众人。与之相比神就很谦卑，大家听得懂，跟得上的速度讲课都是神留给凡人的慈悲，神不是不会那些很难的讲法，只是不想通过太难以理解的方法让同学们绝望所以故意不用，可笑有些人不理解神的良苦用心，竟然还用这些事来讥讽神，我劝你们好自为之。`,
      "group_id": "01",
      "time": "2021-05-14",
      "semester": 202102,
      "is_anonymous": false,
      "score": [2.1, 1.2, 2.3, 5.0],
      "user_score": 121,
      "user_score_ranking": 3,
    },
    {
      "course": "123",
      "course_name": "数学分析I", 
      "title": "孙伟到底犯下了什么罪？",
      "comment": `## 孙伟到底犯下了什么罪？根据一般历史记载，有包括但不限于以下的罪行   \n1. 撞断不周山，造成洪水泛滥，使华夏大地沦为汪洋大海\n2. 建造酒池肉林，使纣王虚度光阴，最终丢了王朝\n3. 帮白起刨坑，坑杀了二十万俘虏\n4. 蛊惑嬴政，造成焚书坑儒的惨剧\n5. 创建司马家族，三代弑君夺权，中原民不聊生\n6. 筹备八王之乱，使得中原沦陷，五胡乱华\n7. 教唆李世民发动玄武门兵变，弑杀兄长夺取皇位\n8. 怂恿秦晖向皇帝进谗言，以莫须有之罪杀害岳飞\n9. 火烧圆明园，为英法联军引路\n10. 在滑铁卢偷袭拿破仑，造成其战败\n孙伟的恶行罄竹难书，是名副其实的带恶人。`,
      "group_id": "01",
      "time": "2022-01-19",
      "semester": 202202,
      "is_anonymous": false,
      "score": [4.1, 4.2, 4.3, 4.2],
      "user_score": 1234,
      "user_score_ranking": 1,
    },
    {
      "course": "123",
      "course_name": "数学分析I", 
      "title": "锐评孙伟",
      "comment": "为什么说陈克应是神....?",
      "group_id": "01",
      "time": "2020-01-14",
      "semester": 202102,
      "is_anonymous": false,
      "score": [4.1, 4.2, 4.3, 4.2],
      "user_score": 123,
      "user_score_ranking": 2,
    },
    {
      "course": "123",
      "course_name": "数学分析I", 
      "title": "陈克应为什么是神 —— 孙伟与跃进之罪",
      "comment": `陈克应为什么是神?在谈论这个问题之前,我想先说说其他数分教授相较于陈克应究竟差在了哪里。首先是犯下跃进之罪的孙伟，曾经一天拉完三个课时, 课时进度稳居四个班之首,而且作业量所有题都做，总用-些复杂超前的讲法给出证明，孙伟像是嚼了炫迈一样根本停不下来，“你们都学过复数吧，那你们肯定知道欧拉公式.那我这题用欧拉公式，这样.这样...。” 这种过快而且超前的讲法在学生们看来,是极”左”且跃进的行为。事实也是如此，数分三班上课的人数一直在走下坡路,于是神降下了他的惩罚，来数分三班听课的人数只有个位数，最终泯然众人。与之相比神就很谦卑，大家听得懂，跟得上的速度讲课都是神留给凡人的慈悲，神不是不会那些很难的讲法，只是不想通过太难以理解的方法让同学们绝望所以故意不用，可笑有些人不理解神的良苦用心，竟然还用这些事来讥讽神，我劝你们好自为`,
      "group_id": "01",
      "time": "2021-05-14",
      "semester": 202102,
      "is_anonymous": false,
      "score": [2.1, 1.2, 2.3, 5.0],
      "user_score": 121,
      "user_score_ranking": 3,
    },
    {
      "course": "123",
      "course_name": "数学分析I", 
      "title": "孙伟到底犯下了什么罪？",
      "comment": `孙伟到底犯下了什么罪？\n根据一般历史记载，有包括但不限于以下的罪行\n1. 撞断不周山，造成洪水泛滥，使华夏大地沦为汪洋大海\n2. 建造酒池肉林，使纣王虚度光阴，最终丢了王朝\n3. 帮白起刨坑，坑杀了二十万俘虏\n4. 蛊惑嬴政，造成焚书坑儒的惨剧\n5. 创建司马家族，三代弑君夺权，中原民不聊生\n6. 筹备八王之乱，使得中原沦陷，五胡乱华\n7. 教唆李世民发动玄武门兵变，弑杀兄长夺取皇位\n8. 怂恿秦晖向皇帝进谗言，以莫须有之罪杀害岳飞\n9. 火烧圆明园，为英法联军引路\n10. 在滑铁卢偷袭拿破仑，造成其战败\n孙伟的恶行罄竹难书，是名副其实的带恶人。`,
      "group_id": "01",
      "time": "2022-01-19",
      "semester": 202202,
      "is_anonymous": false,
      "score": [4.1, 4.2, 4.3, 4.2],
      "user_score": 1234,
      "user_score_ranking": 1,
    },
  ] // Just for test
  const testCommmentStatistic = {
    total: 6,
    score: 2956,
  } // Just for test

  const getCommentText = () => {
    const commentText = testCommentText

    return commentText
  }

  const getCommentStatistic = () => {
    const commentStatistic = testCommmentStatistic;

    return commentStatistic;
  }

  const commentText = reactive(getCommentText())
  const commentStatistic = reactive(getCommentStatistic())

  const statics = {

  }

  const status = reactive({

  })

  provide("commentStatistic", commentStatistic)

  return { commentText, statics, status }
}