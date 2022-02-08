import {provide, reactive} from "@vue/composition-api"

export default () => {


    const testTeachers = [
        { name: '全部评价'},
        { name: '高盛华' },
        { name: '梁骏睿' },
        { name: '娄鑫' },
        { name: '刘闯' },
        { name: '野兽先辈' },
        { name: '林弘扬' },
        { name: '关云长' },
    ]

    const getTeachers = () => {
        const teachers = testTeachers

        return teachers
    }


    const teachers = reactive(getTeachers())

    provide('teachers', teachers);

    return { teachers }
}
