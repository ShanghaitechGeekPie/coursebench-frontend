import {provide, reactive} from "@vue/composition-api"

export default () => {

    const testCommentText = [
        {
            "id": "1234",
            "title": "锐评孙伟",
            "comment": `### 我是陈克应\n\n\- Lesson 1\n\- Lesson 2\n1. Lesson 1\n2. Lesson 2`,
            "course": "123",
            "teachers": [1, 2],
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
            "teachers": [2],
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
            "teachers": [3],
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
            "teachers": [4, 5],
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

    const testTeachers = [
        { name: '全部评价', id: 0},
        { name: '高盛华', id: 1},
        { name: '梁骏睿', id: 2 },
        { name: '娄鑫', id: 3 },
        { name: '刘闯', id: 4},
        { name: '野兽先辈', id: 5 },
        { name: '林弘扬', id: 6 },
        { name: '关云长', id: 7 },
    ]

    const getTeachers = () => {
        const teachers = testTeachers

        return teachers
    }

    const getCommentText = () => {
        const commentText = testCommentText

        return commentText
    }

    const teachers = reactive(getTeachers())

    const comments = reactive(getCommentText())


    const scoreDims = [ "课程质量", "工作量", "考核难度", "给分情况" ]

    provide('scoreDims', scoreDims);

    provide('teachers', teachers);

    return { teachers, comments}
}
