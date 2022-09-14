import {inject, reactive} from "vue"
import {mdiChevronRight} from "@mdi/js"
import {judgeItems, gradeItems, gradingInfo, rawYearItems, termItems} from "@/composables/global/useStaticData"
import useMutation from "@/composables/global/useMutation";
import useDebounce from "@/composables/global/useDebounce";
import {isNetworkError} from "@/composables/global/useHttpError"

export default () => {

    const showSnackbar = inject("showSnackbar")

    const testUserProfile = {
        email: "1@shanghaitech.edu.cn",
        year: 2022,
        grade: 1,
        nickname: "小明",
        realname: "吴迪",
        avatar: "https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1",
        show_email: true,
        show_year: true,
        show_grade: true,
        show_realname: true,
    } // Just for test

    const teachers = inject("teachers")

    const getUserProfile = () => {
        const userProfile = testUserProfile
        userProfile.grade = gradeItems[userProfile.grade]
        return userProfile
    }

    const userProfile = reactive(getUserProfile())

    const statics = reactive({
        icons: {
            mdiChevronRight
        },
        grade: [
            gradingInfo.quality,
            gradingInfo.workload,
            gradingInfo.difficulty,
            gradingInfo.distribution
        ],
        yearItems: rawYearItems,
        judgeItems: judgeItems,
        termItems: termItems
    })

    const errorMsg = reactive({
        target: "",
        msg: "",
    })

    const formStatus = reactive({
        loading: false,
        isPostSuccess: false,
        isPostError: false,
        title: "",
        content: "",
        semester: "",
        is_anonymous: false,
        slider: [5, 5, 5, 5],
        commentTarget: 0,
    })

    const clearErrorMsg = () => {
        errorMsg.target = ""
        errorMsg.msg = ""
        formStatus.isPostError = false
    }

    const pushErrorMsg = (target, msg) => {
        errorMsg.target = target
        errorMsg.msg = msg
    }

    const commentMutation = useMutation("/comment/post", {
        onMutate: () => {
            formStatus.loading = true
        },
        onSuccess: (response) => {
            formStatus.loading = false
            formStatus.isPostSuccess = true
            showSnackbar("success", "发表成功")
        },
        onError: (error) => {
            formStatus.loading = false
            formStatus.isPostError = true
            if (isNetworkError(error.response)) {
                showSnackbar("error", error.response.data.code)
            }
            if (error.response.data.code === "CommentAlreadyExists") {
                showSnackbar("error", error.response.data.msg)
            }
        }
    })


    const doSubmit = useDebounce(() => {
        clearErrorMsg()
      if (formStatus.semester === "" || isNaN(parseInt(formStatus.semester))) {
          pushErrorMsg("semester","")
        return
      }
      if (formStatus.title === "") {
          pushErrorMsg("title", "标题不能为空")
          return
      }
      if (formStatus.content === "") {
          pushErrorMsg("content", "评论内容不能为空")
          return
      }
      if (formStatus.commentTarget === 0) {
          pushErrorMsg("commentTarget", "评论对象不能为空")
          return
      }
        commentMutation.mutate({
            "group": formStatus.commentTarget,
            "title": formStatus.title, // 1～200字节
            "content": formStatus.content, // 可以是markdown文本(暂定) 1～20000 字节
            "semester": parseInt(formStatus.semester), //学期，暂定格式为 4位年份+ 01:秋学期,02：春学期，03：暑学期
            "is_anonymous": formStatus.is_anonymous,
            "scores": formStatus.slider, // 评分，每项的值只能为1,2,3,4,5中的一个
            "student_score_ranking": 2,
        })
    })

    return {statics, userProfile, teachers, gradingInfo, doSubmit, formStatus, errorMsg }
}
