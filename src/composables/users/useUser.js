import { onMounted, provide, reactive, ref, inject, watch } from "vue"
import { instituteInfo, gradeItems } from "@/composables/global/useStaticData"
import useDebounce from "@/composables/global/useDebounce"
import useWatching from "@/composables/global/useWatching"
import useRefCopy from "@/composables/global/useRefCopy"
import useFetching from "@/composables/global/useFetching"
import useUserName from "@/composables/global/useUserName"
import { sortCmp, notEqual } from "@/composables/global/useArrayUtils"
import { sortPolicy, sortStatics} from "@/composables/global/useCommentSort"
import { useRouter, useRoute } from "@/router/migrateRouter"
import { isNetworkError, isValidErrorMessage } from "@/composables/global/useHttpError"
import { setPreset, getPreset } from "@/composables/global/useCookie"


export default () => {

  const router = useRouter()
  const route = useRoute()
  const showSnackbar = inject("showSnackbar")
  const global = inject('global')

  const isSelf = ref(route.params.id == global.userProfile.id)


  const userProfile = reactive({
    email: "", 
    year: 0, 
    grade: "", 
    nickname: "", 
    realname: "", 
    avatar: "", 
    is_anonymous: true, 
  })

  const commentRawText = ref([])
  const commentText = ref([])

  const commentStatistic = reactive({
    total: 0,
    score: 0,
    count: (() => {
      let ret = {}
      Object.keys(instituteInfo).filter(key => key !== '').forEach(key => {
        ret[key] = 0
      })
      return ret
    })(), 
  })


  
  const status = reactive({
    profileLoading: true,
    commentLoading: true,
  })
  const commentFilterStatus = reactive({
    selected: [],
    sortKey: '发布时间',
    order: '从后往前',    
  })



  const getUserProfile = () => {
    const id = route.params.id
    const { status: fetchStatus, data, error } = useFetching(["user_profile", id], "/user/profile/" + id)
    useWatching(fetchStatus, () => {
      if (fetchStatus.value === "success") {
        status.profileLoading = false
      } else if (fetchStatus.value === "error") {
        if (isNetworkError(error.value.response)) {
          showSnackbar("error", "网络连接错误", 3000)
        } else if (isValidErrorMessage(error.value.response.data.msg)) {
          showSnackbar("error", error.value.response.data.msg, 3000)
        } else {
          showSnackbar("error", "服务器发生错误", 3000)
        }
        setTimeout(() => router.push("/"), 3000)
      }
    })
    useWatching(data, () => {
      if (data.value) {
        useRefCopy(data.value.data, userProfile)
        if (isSelf.value) {
          // if we see our own profile, we should not be anonymous    
          setPreset(data.value.data)
          global.userProfile = getPreset()
        }
        userProfile.nickname = useUserName(userProfile)
        userProfile.grade = gradeItems[userProfile.grade]
        userProfile.year = userProfile.year === 0 ? "暂不透露" : userProfile.year
      }
    })
  }

  const getCommentText = () => {
    const id = route.params.id
    const { status: fetchStatus, data, error } = useFetching(["comment_text", id], "/comment/user/" + id)
    useWatching(fetchStatus, () => {
      if (fetchStatus.value === "success") {
        status.commentLoading = false
      } else if (fetchStatus.value === "error") {
        if (isNetworkError(error.value.response)) {
          showSnackbar("error", "网络连接错误", 3000)
        } else if (isValidErrorMessage(error.value.response.data.msg)) {
          showSnackbar("error", error.value.response.data.msg, 3000)
        } else {
          showSnackbar("error", "服务器发生错误", 3000)
        }
        setTimeout(() => router.push("/"), 3000)         
      }
    })
    useWatching(data, () => {
      if (data.value) {
        commentRawText.value = data.value.data ? data.value.data : []
        commentText.value = [...commentRawText.value].filter((comment) => !(comment.is_anonymous && !isSelf.value))
        getCommentStatistic()
        commentFilterStatus.selected = (() => {
          let ret = []
          for (let key in commentStatistic.count) {
            if (commentStatistic.count[key]) {
              ret.push(key)
            }
          } return ret
        })()
        commentText.value.sort(commentSortFunc)
      }
    })
  }

  const getCommentStatistic = () => {
    commentStatistic.total = commentRawText.value.filter(
      (comment) => !(comment.is_anonymous && !isSelf.value)).length
    commentStatistic.score = 0
    for (let [key, _] of Object.entries(commentStatistic.count)) {
      commentStatistic.count[key] = 0
    }
    const schools = Object.getOwnPropertyNames(commentStatistic.count).filter((key) => {
      return key !== "__ob__" && key !== "其他学院"
    })
    for (let comment of commentRawText.value) {
      if (!(comment.is_anonymous && !isSelf.value)) {
        if (schools.indexOf(comment.course.institute) >= 0) {
          commentStatistic.count[comment.course.institute]++
        } else {
          commentStatistic.count["其他学院"]++
          comment.course.institute = "其他学院"
        }
        commentStatistic.score += comment.like
      }
    }
  }




  const commentSortFunc = (x, y) => {
    // by default, [0] is descending, [1] is ascending
    return (commentFilterStatus.order === sortStatics.orderItem[commentFilterStatus.sortKey][0] ? 1 : -1) *
      sortCmp(
        sortPolicy[commentFilterStatus.sortKey](x), sortPolicy[commentFilterStatus.sortKey](y)
      )
  }

  // A notice for future developers: The if statement justifying if to and from are equal is not necessary
  //  if you dont change the watch target in the watch function, otherwise you must use it to avoid infinite loop  
  watch(() => commentFilterStatus.order, useDebounce(() => {
    commentText.value.sort(commentSortFunc)
  }))

  watch(() => commentFilterStatus.sortKey, useDebounce(() => {
    commentFilterStatus.order = sortStatics.orderItem[commentFilterStatus.sortKey][0] 
    commentText.value.sort(commentSortFunc)
  }))

  watch(() => commentFilterStatus.selected, useDebounce((to, from) => {
    if (notEqual(to, from)) {
      const temp = commentRawText.value.filter((comment) => {
        return (!(comment.is_anonymous && !isSelf.value)) && 
          commentFilterStatus.selected.some((school) => comment.course.institute == school)
      })
      temp.sort(commentSortFunc)
      commentText.value = temp
    }
  }))        


  // Abandoned @since 2022-10-03: this is buggy and is based on a bug    
  // Fixed: use an inefficient way to make work temporarily
  // useRecordWatch(commentFilterStatus, useDebounce((lastStatus) => {
  //   if (lastStatus.order !== commentFilterStatus.order) {
  //     commentText.value.sort(commentSortFunc) // I dont know how js sort works in the vm
  //     // but dont feel strange if it dont work for the values that are the same
  //   } else if (lastStatus.sortKey !== commentFilterStatus.sortKey) {
  //     commentFilterStatus.order = sortStatics.orderItem[commentFilterStatus.sortKey][0] 
  //     commentText.value.sort(commentSortFunc) // I sort it here because some sort keys have the same order item
  //     // in that case the first if statement will not be triggered
  //   } else if (lastStatus.selected != commentFilterStatus.selected) {
  //     commentText.value = commentRawText.value.filter((comment) => {
  //       return (!(comment.is_anonymous && !isSelf.value)) && commentFilterStatus.selected.some((school) => comment.course.institute == school)
  //     })
  //     commentText.value.sort(commentSortFunc)
  //   }
  // }))



  provide("commentStatistic", commentStatistic)
  provide("commentFilterStatus", commentFilterStatus)
  provide("userProfile", userProfile)
  provide("isSelf", isSelf)


  if (isSelf) {
    watch(() => global.userProfile, () => {
      if (!global.isLogin) {
        isSelf.value = false
      }
      useRefCopy(global.userProfile, userProfile)
      userProfile.nickname = useUserName(userProfile)
      userProfile.grade = gradeItems[userProfile.grade]
      userProfile.year = userProfile.year === 0 ? "暂不透露" : userProfile.year
      const temp = commentRawText.value.filter((comment) => {
        return (!(comment.is_anonymous && !isSelf.value)) && 
          commentFilterStatus.selected.some((school) => comment.course.institute == school)
      })
      temp.sort(commentSortFunc)
      commentText.value = temp      
    })
  }



  onMounted(() => {
    getUserProfile()
    getCommentText()    
  })


  return { commentText, commentFilterStatus, status, userProfile }
  
}