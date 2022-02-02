import {provide, reactive} from "@vue/composition-api"
import {mdiThumbUp} from "@mdi/js";

export default () => {
  const testCommentText = [
    {
      "id": "1234",
      "title": "锐评孙伟",
      "comment": `### 我是陈克应\n\n\- Lesson 1\n\- Lesson 2\n1. Lesson 1\n2. Lesson 2`,
      "course": "123",
      "teachers": [11, 22],
      "time": "2020-01-14",
      "semester": 202102,
      "is_anonymous": false,
      "user_nickname": "小明",
      "user_id": 123,
      "score": [4.1, 4.2, 4.3, 4.2],
      "user_score": 123,
      "user_score_ranking": 2,
    },
    {
      "id": "1234",
      "title": "锐评孙伟",
      "comment": "为什么说陈克应是神....?",
      "course": "123",
      "teachers": [11, 22],
      "time": "2020-01-14",
      "semester": 202102,
      "is_anonymous": false,
      "user_nickname": "小明",
      "user_id": 123,
      "score": [4.1, 4.2, 4.3, 4.2],
      "user_score": 123,
      "user_score_ranking": 2,
    },
    {
      "id": "1234",
      "title": "锐评孙伟",
      "comment": "为什么说陈克应是神....?",
      "course": "123",
      "teachers": [11, 22],
      "time": "2020-01-14",
      "semester": 202102,
      "is_anonymous": false,
      "user_nickname": "小明",
      "user_id": 123,
      "score": [4.1, 4.2, 4.3, 4.2],
      "user_score": 123,
      "user_score_ranking": 2,
    },
    {
      "id": "1234",
      "title": "锐评孙伟",
      "comment": "为什么说陈克应是神....?",
      "course": "123",
      "teachers": [11, 22],
      "time": "2020-01-14",
      "semester": 202102,
      "is_anonymous": false,
      "user_nickname": "小明",
      "user_id": 123,
      "score": [4.1, 4.2, 4.3, 4.2],
      "user_score": 123,
      "user_score_ranking": 2,
    },
  ] // Just for test

  const getCommentText = () => {
    const commentText = testCommentText

    return commentText
  }

  const scoreDims = [ "课程质量", "课业负担", "考核难度", "给分情况" ]

  const commentText = reactive(getCommentText())

  const status = reactive({

  })

  provide('scoreDims', scoreDims);

  return { commentText, status }
}
