import { reactive } from "@vue/composition-api"

export default () => {
  const testCommentText = [
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
  ] // Just for test

  const getCommentText = () => {
    const commentText = testCommentText

    return commentText
  }

  const commentText = reactive(getCommentText())

  const status = reactive({

  })

  return { commentText, status }
}
